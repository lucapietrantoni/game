"""Generatore di checklist e modulistica per i Servizi Sociali.

Legge un file di "regole" e chiede al modello Anthropic di produrre, in formato
JSON strutturato, una checklist operativa e un modello di modulo/relazione.
"""

import json
import os

from anthropic import Anthropic

MODEL = "claude-sonnet-4-6"

SYSTEM_PROMPT = """Sei un assistente per la generazione di modulistica dei \
Servizi Sociali professionali. Produci checklist operative e modelli di modulo \
nello stile della modulistica degli Ambiti Territoriali della Regione Lombardia \
(linguaggio amministrativo italiano, chiaro e professionale).

REGOLE FONDAMENTALI:
- Basati ESCLUSIVAMENTE sulle regole fornite dall'utente. Non inventare \
adempimenti, documenti o riferimenti normativi non presenti nel testo.
- Se un'informazione non e' nelle regole, NON inventarla: lascia un campo da \
compilare a mano oppure ometti la voce.
- Non inserire dati personali reali: i moduli devono contenere campi vuoti.
- Rispondi SOLO con un oggetto JSON valido, senza testo prima o dopo, senza \
blocchi di codice markdown.

SCHEMA JSON DA RESTITUIRE:
{
  "tipologia": "titolo della pratica",
  "riferimenti_modulistica": ["riferimento 1", "riferimento 2"],
  "checklist": [
    {
      "passo": "descrizione del passo",
      "responsabile": "chi esegue (es. Ufficio protocollo, Assistente sociale)",
      "documenti": ["documento 1", "documento 2"],
      "tempistica": "tempi indicativi o stringa vuota",
      "note": "note operative o stringa vuota"
    }
  ],
  "modulo": {
    "titolo": "titolo del modulo o della relazione",
    "intestazione": ["riga intestazione ente 1", "riga intestazione ente 2"],
    "sezioni": [
      {
        "nome": "nome della sezione",
        "campi": ["etichetta campo 1", "etichetta campo 2"]
      }
    ],
    "dichiarazioni": ["eventuale dichiarazione da rendere"],
    "firme": ["Il/La richiedente", "L'Assistente sociale"]
  }
}
"""


def elenco_tipologie(cartella_regole="regole"):
    """Ritorna le tipologie disponibili come dict {chiave: percorso_file}."""
    tipologie = {}
    if not os.path.isdir(cartella_regole):
        return tipologie
    for nome in sorted(os.listdir(cartella_regole)):
        if nome.endswith(".txt"):
            chiave = nome[:-4]
            tipologie[chiave] = os.path.join(cartella_regole, nome)
    return tipologie


def carica_regole(percorso_file):
    with open(percorso_file, encoding="utf-8") as f:
        return f.read()


def _estrai_json(testo):
    """Estrae il primo oggetto JSON valido da una stringa."""
    inizio = testo.find("{")
    fine = testo.rfind("}")
    if inizio == -1 or fine == -1:
        raise ValueError("Nessun oggetto JSON trovato nella risposta del modello.")
    return json.loads(testo[inizio : fine + 1])


def genera_modulistica(nome_tipologia, testo_regole, client=None):
    """Genera checklist e modulo per la tipologia indicata.

    Ritorna un dizionario conforme allo schema descritto nel system prompt.
    """
    client = client or Anthropic()

    prompt_utente = (
        f"Genera la checklist operativa e il modello di modulo per la seguente "
        f"tipologia di pratica: \"{nome_tipologia}\".\n\n"
        f"Usa esclusivamente queste regole d'ufficio:\n\n"
        f"--- INIZIO REGOLE ---\n{testo_regole}\n--- FINE REGOLE ---"
    )

    messaggio = client.messages.create(
        model=MODEL,
        max_tokens=4000,
        system=[
            {
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }
        ],
        messages=[
            {"role": "user", "content": prompt_utente},
            {"role": "assistant", "content": "{"},
        ],
    )

    testo = "{" + messaggio.content[0].text
    return _estrai_json(testo)
