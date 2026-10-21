# myTIME by FOSS — rebuild workspace

This isolated branch starts from the supplied reference commit:
[Fix print clipping and format timesheets for landscape letter paper](https://github.com/FossNA/Time/commit/ac1286f6f9e163659c544e18aa39b74538718665).

## Brand system
- FOSS navy: `#09266f`
- FOSS blue: `#2458c6`
- Font stack: Purista, Segoe UI, Arial, sans-serif
- Official FOSS logo: `https://www.fossanalytics.com/Design/static/foss-logo.png`
- Official favicon: `https://www.fossanalytics.com/favicon.ico`

## Run locally
The app is a static single-page web app. Open `index.html` in a browser or serve it with any static web server. There are no build dependencies.

## Quality checks
Run `npm test` to check core branding and print layout. GitHub Actions runs the smoke check on pushes and pull requests.

## Deployment status
This branch is a safe workspace and does not change `main`. It is not yet connected to a new Cloudflare Pages project. The available GitHub connection can create branches and commit files, but does not expose a create-repository action. To create a separate repository, GitHub must grant repository-creation access or an empty repository must first be created in the GitHub UI.
