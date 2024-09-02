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

## Authentication

Autentisering er implementert med [Auth JS](https://authjs.dev/getting-started/migrating-to-v5) (tidligere Next Auth). Støtter OAuth providers (Google per nå) og innlogging med email & passord. Bruker [Resend](https://resend.com/docs/send-with-nextjs) for email-verification og tilbakestilling av glemt passord.

For å hente brukerinformasjon i en client component kan man bruke: `useCurrentUser()` hooken i `@/hooks/use-current-user.ts`
Samme kan gjøres for å hente info om bruker er Admin med: `useCurrentRole()`.

Info:

- _I **Production** er ikke Google konfigurert ferdig, dvs at man nektes innlogging i \_Production_ (emilntnu.vercel.app). Trenger DNS-domenet og litt config for å få dette ferdig.\_
- _I **Dev** funker innlogging med Google som normalt._

## UI

Vi bruker for det meste [shadcn-ui](https://ui.shadcn.com/docs/components/accordion) for de mest primitive UI-komponentene og endrer disse til vår smak.

- Konvensjon: Alle shadcn-ui komponenter havner i `@/components/ui`

For å innstallere en komponent brukes kommandoen: `npx shadcn-ui@latest add "component"` her kan man også legge til flere komponenter i samme kommando.

Anbefaler å lese [docs](https://ui.shadcn.com/docs)

## Color palette

- Main dark `#001D21`
- Main secondary `#003A42`
- Highlight `#9DDBAD`

## Icons

Vi bruker for det meste `lucide-react` ikoner. Link [her](https://lucide.dev/icons/) men er ikke begrenset til kun disse. Finnes masse bra der ute.
