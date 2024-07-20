# Webapp

Nettsiden for energi og miljø-studentenes linjeforening



For restAPI manipulasjon bruker vi følgende måte å transportere informasjon avhengig av http metode:
- POST: request.body
- Get: Ingen informasjon sendes
- Delete: URL parameter
- Patch: request.body