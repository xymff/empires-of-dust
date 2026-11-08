# Empires of Dust

A public home for **Taluma**, a fictional prehistoric civilization simulation, plus portable game resources you can bring into an AI of your choice.

- **Dashboard:** https://xymff.github.io/empires-of-dust/
- **Play your own:** https://xymff.github.io/empires-of-dust/play.html
- **Download complete Taluma game state:** [docs/data/taluma.json](docs/data/taluma.json)
- **Start a new civilization:** [docs/downloads/new-civilization-starter.json](docs/downloads/new-civilization-starter.json)
- **Continue Taluma in another AI:** [docs/downloads/resume-taluma-in-your-ai.txt](docs/downloads/resume-taluma-in-your-ai.txt)
- **Quick-start AI prompt:** [docs/downloads/quick-start-prompt.txt](docs/downloads/quick-start-prompt.txt)
- **Sharing guide and save template:** [docs/downloads/sharing-guide.md](docs/downloads/sharing-guide.md) · [docs/downloads/save-state-template.json](docs/downloads/save-state-template.json)
- **New-civilization game-master instructions:** [docs/downloads/game-master-instructions.txt](docs/downloads/game-master-instructions.txt)

## Publish

This repository serves a static GitHub Pages site from `main` branch, `/docs` folder. If Pages is not enabled, go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, `main`, `/docs`, and **Save**.

## Updating after a turn

1. Update `docs/data/taluma.json` with the new canonical JSON game save.
2. Commit to `main`. Visitors reload the same dashboard URL to see the new state.
3. The dashboard itself never advances game time. Its downloadable JSON represents the latest published Taluma snapshot. Independent players can clone this save or choose their own civilization.

The shared save is a fictional game artifact. Do not commit real-person private details, API keys or other secrets to the public repository. Keep private working saves separate from public snapshots.