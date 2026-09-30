# Effective Staff Management

A responsive prototype for Effective's internal staff operations.

## Prototype features

- Phone number + password sign-in
- Separate Admin and Employee experiences
- Admin employee directory and staff creation
- Daily task assignment and recurring-task flag
- Employee task completion with completion timestamps
- Monthly salary statement, additions, deductions and deduction reasons
- Monthly manager review
- Dashboard metrics and task progress
- Responsive mobile-first employee UI
- Effective purple/white brand theme
- Browser localStorage persistence for demo data

## Demo accounts

**Owner/Admin**
- Phone: `0500000000`
- Password: `admin123`

**Employee**
- Phone: `0551234567`
- Password: `123456`

A second seeded employee is also included for the admin dashboard.

## Run locally

This is a static prototype. Open `index.html` directly or serve the folder with any static server.

For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

The repository is ready to deploy on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## Important production note

This repository is currently a **UI/UX prototype**, not a production payroll system. Demo authentication and data are stored in the browser. Before using real employee, salary, or deduction data, replace the prototype storage/authentication with a secured backend, database, password hashing, server-side authorization, audit logging, backups, monitoring, HTTPS, rate limiting, and privacy controls appropriate for Saudi business use.
