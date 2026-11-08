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

The dashboard and Play page are published from the `docs/` folder by the [Verify and deploy Taluma dashboard](.github/workflows/verify-and-deploy-pages.yml) workflow. Every push to `main` validates the Taluma JSON, local site links, and dashboard rendering before deployment. Pull requests are checked without deploying.

**One-time Pages setup:** Open **Settings → Pages → Build and deployment** in this repository. Select **GitHub Actions** as the source. The repository owner must enable this setting before deployment can succeed. If necessary, use **Actions → Verify and deploy Taluma dashboard → Run workflow** afterward. The public dashboard URL is https://xymff.github.io/empires-of-dust/ and the Play page is https://xymff.github.io/empires-of-dust/play.html.

The dashboard is read-only. It shows the latest committed Taluma snapshot, not unsaved conversation turns.

## Updating after a turn

1. Update `docs/data/taluma.json` with the new canonical JSON game save.
2. Commit to `main`. The workflow verifies and publishes the snapshot; visitors reload the same dashboard URL to see the new state.
3. The dashboard itself never advances game time. Its downloadable JSON represents the latest published Taluma snapshot. Independent players can clone this save or choose their own civilization.

The shared save is a fictional game artifact. Do not commit real-person private details, API keys or other secrets to the public repository. Keep private working saves separate from public snapshots.