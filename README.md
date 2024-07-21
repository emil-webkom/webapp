# Webapp

Nettsiden for energi og miljø-studentenes linjeforening



##API
Alle endpoints som treffes av applikasjonen er definert gjennom Next.js dynamisk routing; gjennom mappestruktur.
For restAPI manipulasjon bruker vi følgende måte å transportere informasjon avhengig av http metode:
- POST: request.body
- Get: Ingen informasjon sendes
- Delete: URL parameter
- Patch: request.body