<p align="left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/images/logo-dark.png">
    <img src="assets/images/logo.png" alt="Telkom Labs logo" width="160">
  </picture>
</p>

# Telkom Labs

Applied Research for Internet infrastructure.

**Live site:** https://telkomlabs.org

A static Jekyll site, built and hosted by GitHub Pages from the `main` branch. The design follows Microsoft's Metro style, after the Zune desktop software, set in [Selawik](https://github.com/microsoft/Selawik) (SIL Open Font License). No JavaScript is needed to read it; the one script adds page transitions, the publication filters and BibTeX copying.

## Edit content

| What | Where |
|---|---|
| Publications | `_publications/`, one Markdown file per paper |
| Products | `_projects/`, one Markdown file per product, listed on the Projects page; a product with a `link` links to it, a `Retired` one is greyed out |
| Books | `_data/books.yml`, shown first on the Projects page |
| Collaborators | `_data/collaborators.yml` |
| Standards and research areas | `_data/standards.yml`, `_data/areas.yml` |
| Styles and script | `assets/css/main.css`, `assets/js/main.js` |

Push to `main` and GitHub Pages rebuilds the site in about a minute.

## Run locally

```sh
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000/.

## Domain

The site is served at `telkomlabs.org`, set under **Settings → Pages** and stored in `CNAME`. DNS for the domain is managed in Cloudflare and points at GitHub Pages.
