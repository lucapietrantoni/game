"""Interfaccia web del Generatore di checklist e modulistica.

Avvio:  python app.py
Poi aprire il browser su http://127.0.0.1:5000
Richiede la variabile d'ambiente ANTHROPIC_API_KEY.
"""

import datetime
import os
import re

from flask import Flask, render_template, request, send_from_directory

from docx_export import crea_docx
from generatore import (
    carica_esempio,
    carica_regole,
    elenco_tipologie,
    genera_modulistica,
)

app = Flask(__name__)

CARTELLA_REGOLE = "regole"
CARTELLA_OUTPUT = "output"
os.makedirs(CARTELLA_OUTPUT, exist_ok=True)


def _nome_leggibile(chiave):
    return chiave.replace("_", " ").capitalize()


def _nome_file_sicuro(testo):
    pulito = re.sub(r"[^a-zA-Z0-9]+", "_", testo).strip("_").lower()
    return pulito or "modulistica"


@app.route("/")
def home():
    tipologie = {
        chiave: _nome_leggibile(chiave) for chiave in elenco_tipologie(CARTELLA_REGOLE)
    }
    return render_template("index.html", tipologie=tipologie)


@app.route("/genera", methods=["POST"])
def genera():
    tipologie = elenco_tipologie(CARTELLA_REGOLE)
    chiave = request.form.get("tipologia", "")
    tipologie_leggibili = {c: _nome_leggibile(c) for c in tipologie}

    offline = request.form.get("offline") == "on"

    if not chiave or chiave not in tipologie:
        return render_template(
            "index.html",
            tipologie=tipologie_leggibili,
            errore="Seleziona una tipologia di pratica valida.",
        )

    nome_tipologia = _nome_leggibile(chiave)

    if offline:
        dati = carica_esempio(chiave)
        if dati is None:
            return render_template(
                "index.html",
                tipologie=tipologie_leggibili,
                errore=(
                    "Nessun esempio offline disponibile per questa tipologia. "
                    "Aggiungi un file JSON nella cartella 'esempi/'."
                ),
            )
    else:
        if not os.environ.get("ANTHROPIC_API_KEY"):
            return render_template(
                "index.html",
                tipologie=tipologie_leggibili,
                errore=(
                    "Variabile d'ambiente ANTHROPIC_API_KEY non impostata. "
                    "Imposta la chiave oppure attiva la modalita' offline."
                ),
            )
        try:
            testo_regole = carica_regole(tipologie[chiave])
            dati = genera_modulistica(nome_tipologia, testo_regole)
        except Exception as exc:  # noqa: BLE001 - mostra l'errore nell'interfaccia
            return render_template(
                "index.html",
                tipologie=tipologie_leggibili,
                errore=f"Errore durante la generazione: {exc}",
            )

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    nome_file = f"{_nome_file_sicuro(nome_tipologia)}_{timestamp}.docx"
    crea_docx(dati, os.path.join(CARTELLA_OUTPUT, nome_file))

    return render_template(
        "index.html",
        tipologie=tipologie_leggibili,
        dati=dati,
        nome_file=nome_file,
        selezione=chiave,
        offline=offline,
    )


@app.route("/download/<path:nome_file>")
def download(nome_file):
    return send_from_directory(CARTELLA_OUTPUT, nome_file, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
