<p align="center">
  <img src="assets/images/logo.png" alt="Telkom Labs logo" width="160">
</p>

# Telkom Labs

Applied AI for Internet infrastructure.

**Live site:** https://telkom-labs.github.io/homepage/

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

Then open http://localhost:4000/homepage/.

## Custom domain

1. Add the domain under **Settings → Pages**.
2. Point the domain's DNS at GitHub Pages.
3. In `_config.yml`, set `url` to the domain and `baseurl` to `""`.
