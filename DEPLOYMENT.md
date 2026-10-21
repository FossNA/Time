# Deployment and release checklist

## Current hosting

Cloudflare Pages project: `foss-time`
- Production URL: https://foss-time.pages.dev
- GitHub source: `FossNA/Time`
- Production branch: `main`
- Rebuild branch: `timecard-rebuild` (preview deployment)

The project is configured to deploy all branches as preview deployments. Commits to `timecard-rebuild` should create a preview URL; they do not change the production `main` deployment.

## Before promoting a build

1. Open the preview URL and hard-refresh.
2. Test clock in, lunch out/in, clock out, and invalid punch order.
3. Verify daily paid time, weekly schedule, recovery suggestions, and settings.
4. Export an Excel workbook; verify the workbook opens and formulas render.
5. Import a CSV/Excel template with at least two dates; preview first and confirm the records.
6. Test JSON backup and restore using non-production sample records.
7. Print the timesheet and verify landscape letter layout without clipped columns.
8. Confirm FOSS logo, favicon, navy `#09266f`, blue `#2458c6`, and Purista/Segoe UI/Arial font stack.
9. Run `npm test` locally or review the GitHub Actions smoke-check workflow.
10. Merge to `main` only after the checks above pass.

## Data and privacy notes

Time entries are stored in the current browser's local storage unless the app is explicitly connected to a configured external service. Export a JSON backup before clearing browser data. Do not treat this helper as a payroll system or source of record.
