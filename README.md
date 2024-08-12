# Webapp

Nettsiden for energi og miljø-studentenes linjeforening



## API
Alle endpoints som treffes av applikasjonen er definert som API Routes, gjennom Next.js dynamisk routing; gjennom mappestruktur.

f. eks vil en mappestruktur:
```
app
└── api
    └── arrangementer
```
gi et endpoint:
```
https://localhost:3000/api/arrangementer
```

For RestAPI manipulasjon bruker vi følgende måte å transportere informasjon avhengig av http metode:
- POST: request.body
- GET: Ingen informasjon sendes
- DELETE: URL parameter
- PUT/PATCH: request.body


## UI
Vi bruker for det meste [shadcn-ui](https://ui.shadcn.com/docs) for de mest primitive UI-komponentene og endrer disse til vår smak.
- Konvensjon: Alle shadcn-ui komponenter havner i ```@/components/ui```

For å innstallere en komponent brukes kommandoen: ```npx shadcn-ui@latest add "component"```
