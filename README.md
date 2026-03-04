# SIF-CCA Research Portal

This repository packages the second research artifact in the Serverless Intelligent Firewall series:

**Towards a Serverless Intelligent Firewall: Integrating Cross-Cloud Adaptation, AI-Driven Security, and Zero-Trust Architectures**

The artifact is structured as a static GitHub Pages portal that mirrors the first project’s layout, but updates it for the new conference-submission state and encrypted artifact policy.

## Status

- Submission target: IEEE SmartCloud 2026
- State: under review as of March 4, 2026
- Expected Pages URL after push: `https://anis151993.github.io/Serverless-Intelligent-Firewall-Research-2/`

## What is included

- `docs/index.html`: main research portal
- `docs/report.html`: public HTML report
- `docs/poster.html`: poster-style overview page
- `docs/styles.css`, `docs/script.js`: shared UI and interaction logic
- `docs/assets/images/`: publishable result figures
- `docs/assets/papers/`: encrypted download archives for the PDF and LaTeX sources
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow

## Protected documents

The raw manuscript files remain in the local workspace for editing, but they are ignored by Git so they are not published in plaintext.

Public distribution happens through encrypted zip archives inside `docs/assets/papers/`. The site exposes only:

- a first-page HTML preview of the paper
- an access gate requiring:
  - GitHub follow
  - YouTube subscription
  - password request email
  - password entry before download links appear

## Deployment

Push the repository to GitHub, then:

1. Ensure the default branch is `main` or `master`.
2. In GitHub repository settings, allow Pages deployments from GitHub Actions.
3. Push a new commit; the included workflow will publish the `docs/` directory.

## Notes

- The public website is designed as a static artifact, so the “test lab” is a browser-based simulation rather than a live backend inference service.
- The password itself should continue to be shared only through the author’s manual approval flow.
