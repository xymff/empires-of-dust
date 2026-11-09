# Empires of Dust

A public home for **Taluma**, a fictional prehistoric civilization simulation, plus portable game resources you can bring into an AI of your choice.

- **Dashboard:** https://xymff.github.io/empires-of-dust/
- **Living stories (readable chapter archive):** https://xymff.github.io/empires-of-dust/stories.html
- **Story data for the dashboard:** [docs/data/stories.json](docs/data/stories.json)
- **Individual GitHub-readable chapter files:** [docs/stories/](docs/stories/)
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

## Story publishing

Each advancing turn produces a new narrated chapter. Publish its **full chapter** as `docs/stories/y<year>-d<day>.md` and append the corresponding structured entry to `docs/data/stories.json` (newest first). The Stories view and reading room load directly from that index. Older chapters stay published and linkable; never replace a prior chapter with a new turn.

**Publishing rhythm:** publish each completed story when it is ready; continue updating the canonical `docs/data/taluma.json` snapshot every third advancing turn. Story posts may therefore lead the latest public save, and the dashboard always labels the game state by the JSON's published date. Story publication alone does not advance game time. Every push runs validation and redeploys Pages.

Backfilled stories currently begin at Year 16, Day 25. Earlier game history remains in the full JSON chronicle rather than being represented as invented narrative chapters.

## Updating after a turn

1. Update `docs/data/taluma.json` with the new canonical JSON game save.
2. Commit to `main`. The workflow verifies and publishes the snapshot; visitors reload the same dashboard URL to see the new state.
3. The dashboard itself never advances game time. Its downloadable JSON represents the latest published Taluma snapshot. Independent players can clone this save or choose their own civilization.

The shared save is a fictional game artifact. Do not commit real-person private details, API keys or other secrets to the public repository. Keep private working saves separate from public snapshots.