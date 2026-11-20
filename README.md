# Site EmDash de départ (Kubengine)

Site EmDash 1.5 vide : le starter officiel d'EmDash (`emdash-cms/templates`, licence MIT) sans pages ni contenu de démo,
installé comme EmDash le crée (`data.db`, `uploads/`), avec deux ajouts dans `astro.config.mjs` :

- **médias sur R2** quand la plateforme pose `EMDASH_MEDIA_STORAGE=s3` (`s3()` lit les variables `S3_*`) ;
- **adresse publique** prise dans `EMDASH_SITE_URL` derrière le proxy (`scripts/public-origin.mjs`).

Recette Kubengine : `emdash` version 1, réglages par défaut sauf `{ "media": "r2" }`. La plateforme lance le site avec
son dossier de travail sur le disque de données de l'environnement : base, médias et sessions y sont écrits et sauvegardés.

En local : `pnpm install`, puis `pnpm dev` ; l'admin est sur `http://localhost:4321/_emdash/admin`.
