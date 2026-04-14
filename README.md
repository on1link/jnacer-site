# Jorge — Personal Website

Built with [Pelican](https://getpelican.com/) + custom dark theme. Auto-deployed to GitHub Pages.

## Local Development

```bash
pip install "pelican[markdown]"
pelican content -s pelicanconf.py --listen --autoreload
# Open http://localhost:8000
```

## Deploy

Push to `main` → GitHub Actions builds and deploys automatically.

## Custom Domain Setup

1. In your domain registrar (where you bought `*.xyz`), set DNS:
   - **A records** (apex domain):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME** `www` → `YOUR_GH_USERNAME.github.io`
2. In GitHub repo → Settings → Pages → Custom domain → enter `yourdomain.xyz`
3. Check "Enforce HTTPS"
4. The `CNAME` file in `content/extra/` is deployed automatically

## Adding Content

- **Pages:** Add `.md` files to `content/pages/`
- **Blog posts:** Add `.md` files to `content/`
- Set `Status: published` in frontmatter to make content live

## Project Structure

```
├── content/
│   ├── pages/         # Static pages (about, projects, contact)
│   ├── images/        # Static assets
│   ├── extra/CNAME    # Custom domain file
│   └── *.md           # Blog posts
├── theme/
│   ├── templates/     # Jinja2 templates
│   └── static/        # CSS + JS
├── pelicanconf.py     # Dev config
├── publishconf.py     # Prod config
└── .github/workflows/ # CI/CD
```
