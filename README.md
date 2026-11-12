<p align="left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/images/logo-dark.png">
    <img src="assets/images/logo.png" alt="Telkom Labs logo" width="160">
  </picture>
</p>

# Telkom Labs

Applied Research for Internet infrastructure.

**Live site:** https://telkomlabs.org

A static Jekyll site, built and hosted by GitHub Pages from the `main` branch. No JavaScript is needed to read it; the only script is an optional filter on the publications list.

## Edit content

| What | Where |
|---|---|
| Publications | `_publications/`, one Markdown file per paper |
| Projects | `_projects/`, one Markdown file per project |
| Collaborators | `_data/collaborators.yml` |
| Standards and research areas | `_data/standards.yml`, `_data/areas.yml` |
| Styles | `assets/css/main.css` |

Push to `main` and GitHub Pages rebuilds the site in about a minute.

## Run locally

```sh
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/.

## Domain

The site is served at `telkomlabs.org`, set under **Settings → Pages** and stored in `CNAME`. DNS for the domain is managed in Cloudflare and points at GitHub Pages.
