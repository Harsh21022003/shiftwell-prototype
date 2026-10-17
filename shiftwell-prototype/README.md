# Shiftwell swap rules simulator

A no-backend prototype of the swap-rules engine recommended in the case study.

## Run it
1. Open this folder in VS Code.
2. Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".
   (Or just double-click `index.html`; no build step or dependencies.)

## Files
- `index.html`: page structure (rules panel, results table, estimate panel)
- `style.css`: styling, light and dark themes
- `app.js`: sample swap queue (`Q`), the rule logic (`judge`), and rendering (`render`)

## Rule order in `judge()`
1. Required certificate missing or expired on the shift date: **Blocked**
2. Not trained for the role or station: **Location Manager**
3. Hours after the swap above the cap: **Regional approver**
4. Otherwise: **Auto-approved** (or Location Manager if auto-approve is off)

Exactly 48 hours is allowed; only hours over the cap escalate.
