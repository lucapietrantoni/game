// Scenarios based on organizational psychology theories
export const SCENARIOS = [
    // FORMING STAGE - Initial team formation
    {
        text: "FORMING STAGE: Your new band just had its first rehearsal in a basement near Via Zamboni. Nobody knows each other well. Marco wants to play thrash metal, Giulia prefers doom metal. Do you establish clear roles now or let it develop organically? (Tuckman's Group Development Theory)",
        theory: "Tuckman's Forming Stage: Members are polite, uncertain about roles and norms. Clear structure vs. organic development trade-offs.",
        choices: [
            {
                text: "Autocratic Leadership: YOU decide - we're playing thrash metal, period!",
                effect: { money: 20, happiness: -15, reputation: 5, stage: 0 },
                message: "Strong direction! But Giulia feels unheard. (Autocratic leadership can create initial clarity but reduce buy-in)"
            },
            {
                text: "Democratic Leadership: Hold a band meeting and vote on the style",
                effect: { money: 0, happiness: 15, reputation: 10, stage: 1 },
                message: "Everyone feels heard! The 3-hour debate about subgenres was exhausting but built trust. (Democratic leadership increases commitment)"
            },
            {
                text: "Laissez-faire: 'Play whatever feels right, man' - no structure",
                effect: { money: -10, happiness: -5, reputation: -10, stage: 0 },
                message: "Chaotic jam session! Sounded terrible but was... liberating? Bologna's punk scene noticed the 'experimental noise'."
            }
        ]
    },

    // STORMING STAGE - Conflict emerges
    {
        text: "STORMING STAGE: Marco and Giulia are having a massive fight about who gets center stage at your first gig at Link Bologna. Marco says vocalists always lead, Giulia says guitarists are the real stars. The gig is tomorrow! (Conflict Resolution)",
        theory: "Tuckman's Storming Stage: Conflicts emerge as members compete for status. How you handle conflict shapes team culture.",
        choices: [
            {
                text: "Compete: 'Fight it out, winner takes center stage!'",
                effect: { money: -20, happiness: -25, reputation: -15, stage: 1 },
                message: "They literally fought on stage! The crowd thought it was performance art. Local newspaper: 'Authentic aggression or just chaos?'"
            },
            {
                text: "Collaborate: Design staging where both shine in different songs",
                effect: { money: 30, happiness: 20, reputation: 25, stage: 2 },
                message: "Brilliant compromise! Dynamic stage presence! You've moved to NORMING stage. The Link crowd went wild!"
            },
            {
                text: "Avoid: Cancel the gig to 'work on band dynamics'",
                effect: { money: -30, happiness: -10, reputation: -20, stage: 1 },
                message: "Avoidance strategy backfired. Link Bologna blacklisted you. Sometimes you need to push through conflict."
            }
        ]
    },

    // NORMING STAGE - Building cohesion
    {
        text: "NORMING STAGE: Your band is gelling! You've developed inside jokes and a shared identity. But a famous Milanese metal band wants to recruit Giulia for triple her salary. How do you strengthen team cohesion? (Social Identity Theory)",
        theory: "Social Identity Theory: People derive identity from group membership. Strong in-group identity increases commitment.",
        choices: [
            {
                text: "Match the salary offer - throw money at the problem",
                effect: { money: -100, happiness: 10, reputation: 0, stage: 2 },
                message: "Expensive! Now everyone wants raises. Financial motivation alone doesn't build loyalty. (Herzberg's Hygiene Factor)"
            },
            {
                text: "Emphasize shared Bologna identity: 'We're not sellouts to Milano!'",
                effect: { money: 20, happiness: 30, reputation: 20, stage: 3 },
                message: "Bologna pride! Social identity strengthened! Giulia stays - 'We're building something real here.' PERFORMING STAGE achieved!"
            },
            {
                text: "Let her choose freely without pressure",
                effect: { money: -50, happiness: -20, reputation: 5, stage: 1 },
                message: "She left. Respect for autonomy didn't create attachment. Sometimes you need to actively build team identity. Back to STORMING."
            }
        ]
    },

    // PERFORMING STAGE - High performance
    {
        text: "PERFORMING STAGE: Your band is crushing it! But success brings new challenges. You've been offered a spot at Bologna's prestigious 'Zona Roveri Metal Fest' - but only if you add synth to your sound. Your purist fans might hate it. (Innovation vs. Tradition)",
        theory: "High-performing teams can innovate or stagnate. Psychological safety enables risk-taking.",
        choices: [
            {
                text: "Stay pure metal - reject the synth idea completely",
                effect: { money: -40, happiness: 5, reputation: 10, stage: 3 },
                message: "Metal purity preserved! Hardcore fans respect the integrity. But you missed a big opportunity. Sometimes tradition limits growth."
            },
            {
                text: "Experiment with synth - create psychological safety for innovation",
                effect: { money: 60, happiness: 15, reputation: 30, stage: 3 },
                message: "Innovation within identity! The symphonic-metal fusion blew minds at Zona Roveri! Psychological safety breeds creativity!"
            },
            {
                text: "Split the band - let half go traditional, half experimental",
                effect: { money: -80, happiness: -40, reputation: -25, stage: 1 },
                message: "Division destroyed team cohesion! Two weak bands instead of one strong one. Back to STORMING. Unity fractured."
            }
        ]
    },

    // MASLOW'S HIERARCHY
    {
        text: "HIERARCHY OF NEEDS: Your drummer Matteo is struggling - he's sleeping in his van because Bologna rent is insane, can barely eat, and keeps missing practice. But he's incredibly talented. (Maslow's Hierarchy of Needs)",
        theory: "Maslow's Hierarchy: Basic physiological and safety needs must be met before higher-level motivation works.",
        choices: [
            {
                text: "Give him motivational speeches about 'the dream' and 'exposure'",
                effect: { money: 0, happiness: -30, reputation: -15, stage: -1 },
                message: "He quit! 'I can't eat exposure!' You can't motivate with self-actualization when survival needs aren't met. Critical error!"
            },
            {
                text: "Band fund: Cover his rent collectively until gigs pay more",
                effect: { money: -60, happiness: 40, reputation: 15, stage: 1 },
                message: "True solidarity! Matteo is incredibly grateful and loyal. Meeting basic needs enabled him to focus on music. Team bonds strengthened!"
            },
            {
                text: "Help him find a day job, adjust practice schedule",
                effect: { money: 10, happiness: 20, reputation: 5, stage: 0 },
                message: "Practical solution! Less practice time but Matteo is stable and focused when present. Sometimes support means flexibility."
            }
        ]
    },

    // LEADERSHIP STYLES
    {
        text: "LEADERSHIP CRISIS: You need to make a quick decision - a last-minute gig opportunity at Locomotiv Club (major venue!) but your bassist is sick. Do you play shorthanded, cancel, or find a replacement? The band is looking to YOU. (Leadership Under Pressure)",
        theory: "Situational Leadership: Different situations require different leadership approaches - directive, supportive, participative, or delegative.",
        choices: [
            {
                text: "Directive: 'I've decided - we play without bass, I'll cover on synth'",
                effect: { money: 40, happiness: -5, reputation: 20, stage: 0 },
                message: "Decisive action! The show went on! Sometimes teams need directive leadership in crises. Locomotiv was impressed!"
            },
            {
                text: "Participative: Emergency band meeting in 30 minutes to decide together",
                effect: { money: -20, happiness: 15, reputation: -5, stage: 0 },
                message: "Ran out of time deciding! Missed the slot. Participative leadership is great, but not always when time-critical. Lesson learned."
            },
            {
                text: "Delegative: 'Giulia, you handle this - your call'",
                effect: { money: 30, happiness: 25, reputation: 15, stage: 1 },
                message: "Empowerment! Giulia found a fill-in bassist from her network. Delegative leadership built her confidence and showed trust!"
            }
        ]
    },

    // MOTIVATION THEORY - HERZBERG
    {
        text: "MOTIVATION DILEMMA: Your sound tech wants a raise. He says 'I'm underpaid and underappreciated.' You can afford \u20AC10 more per week. But is money the real issue? (Herzberg's Two-Factor Theory)",
        theory: "Herzberg's Theory: Hygiene factors (salary) prevent dissatisfaction. Motivators (recognition, growth) create satisfaction. Both needed!",
        choices: [
            {
                text: "Give the raise and nothing else - pure financial motivation",
                effect: { money: -15, happiness: 5, reputation: 0, stage: 0 },
                message: "Temporarily satisfied but still disconnected. Money is a hygiene factor - prevents discontent but doesn't motivate. (Herzberg)"
            },
            {
                text: "Public recognition + small raise: 'Sound Tech Appreciation Night!'",
                effect: { money: -10, happiness: 30, reputation: 15, stage: 1 },
                message: "He's glowing! Recognition (motivator) + fair pay (hygiene) = true satisfaction! He's now creative and suggests sound innovations!"
            },
            {
                text: "Just give recognition, no raise - 'We appreciate you but we're broke'",
                effect: { money: 0, happiness: -15, reputation: -10, stage: 0 },
                message: "'Nice words don't pay my rent.' Recognition without fair compensation feels patronizing. Need both hygiene AND motivators."
            }
        ]
    },

    // GROUPTHINK
    {
        text: "GROUPTHINK DANGER: The band unanimously agrees your new album should be all 15-minute prog-metal epics. Everyone is hyped! But you secretly think this might be commercial suicide. Nobody wants to be 'that person' who kills the vibe. (Irving Janis - Groupthink)",
        theory: "Groupthink: Desire for harmony leads to irrational decisions. Devil's advocates and dissent improve outcomes.",
        choices: [
            {
                text: "Stay silent to maintain harmony - go with the flow",
                effect: { money: -100, happiness: -20, reputation: -30, stage: -1 },
                message: "Album bombed! 3 people bought it (all your relatives). Groupthink suppressed critical thinking. Bologna scene mocked the 'pretentious epic failure.'"
            },
            {
                text: "Play Devil's Advocate: 'What if we balance epics with shorter tracks?'",
                effect: { money: 50, happiness: 10, reputation: 40, stage: 1 },
                message: "Healthy dissent! After debate, you made a balanced album that's actually good! Critical thinking prevented groupthink disaster!"
            },
            {
                text: "Aggressively shut down the idea - 'This is stupid, trust me'",
                effect: { money: -20, happiness: -25, reputation: 5, stage: -1 },
                message: "You were right but damaged morale. Aggressive dissent creates defensiveness. Could've framed it better. Back to STORMING."
            }
        ]
    },

    // ORGANIZATIONAL CULTURE
    {
        text: "CULTURE CLASH: You need to decide on band culture. Do you become a 'professional' band (strict schedules, contracts) or keep the 'underground family' vibe (loose, passion-driven)? Bologna's scene is watching. (Organizational Culture)",
        theory: "Organizational Culture: Shared values, beliefs, and norms shape behavior. Culture must align with goals and identity.",
        choices: [
            {
                text: "Professionalize: Contracts, punctuality rules, business mindset",
                effect: { money: 60, happiness: -15, reputation: 20, stage: 0 },
                message: "More efficient but less soul. Some say you 'sold out to corporate thinking.' Gained promoters but lost street cred among punks."
            },
            {
                text: "Stay underground: Passion over profit, flexibility, family vibe",
                effect: { money: -20, happiness: 25, reputation: 15, stage: 1 },
                message: "Authentic! Bologna's underground scene embraced you. Lower income but strong identity. Culture reflects values - you chose passion!"
            },
            {
                text: "Hybrid: 'Professional on business, family at heart'",
                effect: { money: 40, happiness: 20, reputation: 30, stage: 1 },
                message: "Best of both! Professional external image, authentic internal culture. Balanced approach attracted both venues and loyal fans!"
            }
        ]
    },

    // ROLE THEORY - BELBIN
    {
        text: "TEAM ROLES: Your band has grown to 5 people. Everyone wants to be the 'creative leader.' Nobody wants to do admin (booking, accounting). (Belbin's Team Roles Theory)",
        theory: "Belbin's Team Roles: Effective teams need diverse roles - Shapers, Implementers, Coordinators, etc. All roles are valuable.",
        choices: [
            {
                text: "Rotate admin duties monthly - everyone does their share",
                effect: { money: -10, happiness: -10, reputation: 0, stage: 0 },
                message: "Everyone hates it when it's their turn. Forcing people into unsuited roles reduces efficiency. Square pegs, round holes."
            },
            {
                text: "Hire external manager to handle all non-creative work",
                effect: { money: -50, happiness: 20, reputation: 10, stage: 1 },
                message: "Expensive but effective! Let people focus on their strengths. Sometimes specialized roles (Coordinator) need dedicated people."
            },
            {
                text: "Identify who's actually good at admin - let them specialize",
                effect: { money: 20, happiness: 30, reputation: 20, stage: 1 },
                message: "Francesca turned out to be an organizational wizard! She loves it! Playing to natural strengths (Belbin roles) optimizes team performance!"
            }
        ]
    },

    // PSYCHOLOGICAL CONTRACT
    {
        text: "BROKEN PROMISES: When forming the band, you promised 'equal split of all earnings.' Now you're doing 80% of the work. Do you renegotiate or honor the original psychological contract? (Psychological Contract Theory)",
        theory: "Psychological Contract: Unwritten expectations and beliefs about mutual obligations. Breaking them destroys trust.",
        choices: [
            {
                text: "Unilaterally change splits - 'I do more, I should get more'",
                effect: { money: 40, happiness: -40, reputation: -20, stage: -1 },
                message: "Trust shattered! Perceived breach of psychological contract. 'You changed the deal!' Two members quit. Back to FORMING with new people."
            },
            {
                text: "Discuss openly: 'Let's renegotiate based on contribution'",
                effect: { money: 20, happiness: 10, reputation: 10, stage: 0 },
                message: "Honest conversation! Harder upfront but preserved trust. New agreement feels fair to all. Psychological contracts can evolve if done transparently."
            },
            {
                text: "Honor original deal despite unfairness - build resentment",
                effect: { money: -10, happiness: -20, reputation: 5, stage: 0 },
                message: "You're quietly bitter and it shows. Unexpressed resentment poisons culture. Sometimes contracts need explicit renegotiation."
            }
        ]
    },

    // SOCIAL LOAFING
    {
        text: "SOCIAL LOAFING: You notice your keyboardist Lorenzo barely practices, showing up unprepared. 'The band will carry me anyway,' he seems to think. Others are getting frustrated. (Ringelmann Effect - Social Loafing)",
        theory: "Social Loafing: Individuals exert less effort in groups when individual contributions aren't identified. Visibility reduces loafing.",
        choices: [
            {
                text: "Ignore it - confrontation is uncomfortable",
                effect: { money: -30, happiness: -25, reputation: -15, stage: -1 },
                message: "Others started slacking too! 'If Lorenzo can coast, why not me?' Social loafing spreads. Performance tanked. Accountability matters!"
            },
            {
                text: "Make individual contributions visible - record practice sessions",
                effect: { money: 10, happiness: 15, reputation: 20, stage: 1 },
                message: "When efforts became visible, Lorenzo stepped up! Social loafing decreases when individual performance is identifiable. Smart design!"
            },
            {
                text: "Publicly shame him - 'Lorenzo is dragging us down!'",
                effect: { money: 0, happiness: -30, reputation: -10, stage: -1 },
                message: "He quit! Public shaming destroyed psychological safety. Could've addressed the behavior without attacking the person. Toxic approach."
            }
        ]
    },

    // ATTRIBUTION ERROR
    {
        text: "FUNDAMENTAL ATTRIBUTION ERROR: Giulia played terribly at your last gig. Band members say 'She's losing her edge' (dispositional). But you know her mother is seriously ill (situational). How do you handle it?",
        theory: "Fundamental Attribution Error: We attribute others' failures to character while ignoring situational factors. Cognitive bias in judgment.",
        choices: [
            {
                text: "Join the criticism - 'Yeah, Giulia needs to practice more'",
                effect: { money: 0, happiness: -30, reputation: -5, stage: -1 },
                message: "Giulia felt abandoned when she needed support. Fundamental attribution error led to injustice. She quit: 'You never understood.'"
            },
            {
                text: "Share context (with permission): Explain her situation to band",
                effect: { money: 0, happiness: 25, reputation: 15, stage: 1 },
                message: "Understanding! Band rallied to support her. Situational awareness prevented attribution error. Empathy strengthened bonds!"
            },
            {
                text: "Replace her - 'We need reliability, whatever the reason'",
                effect: { money: 20, happiness: -20, reputation: -25, stage: -1 },
                message: "Short-term gain, long-term loss. Lost a talented member during crisis. Bologna scene judged you as 'heartless.' Reputation damaged."
            }
        ]
    }
];
