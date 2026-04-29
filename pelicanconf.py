import os
from pathlib import Path
from zoneinfo import ZoneInfo

# Load .env if present
env_path = Path(__file__).parent / ".env"
if env_path.exists():
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, val = line.split("=", 1)
            os.environ.setdefault(key.strip(), val.strip())

# Personal Information
AUTHOR = os.getenv("AUTHOR_NAME", "Jorge Nacer")
SITENAME = os.getenv("SITE_NAME", "Jorge Nacer — ML Engineer & Data Scientist")
SITEURL = os.getenv("SITE_URL", "http://localhost:8000")

# Site Configuration
THEME = "theme"
PATH = "content"
TIMEZONE = "Europe/Berlin"
DEFAULT_LANG = "en"

# URL settings
ARTICLE_URL = "blog/{slug}/"
ARTICLE_SAVE_AS = "blog/{slug}/index.html"
PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"
INDEX_SAVE_AS = False

# Create a blog listing at /blog/index.html
TEMPLATE_PAGES = {}
DIRECT_TEMPLATES = ['index', 'blog']
BLOG_SAVE_AS = "blog/index.html"

# Static files
STATIC_PATHS = ["images", "extra"]
EXTRA_PATH_METADATA = {
    "extra/CNAME": {"path": "CNAME"},
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/favicon.png": {"path": "favicon.png"},
    "extra/Nacer-Jorge-CV.pdf": {"path": "Nacer-Jorge-CV.pdf"},
}

# Disable feeds for dev
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Navigation
MENUITEMS = [
    ("Projects", "/projects/"),
    ("Stack", "/stack/"),
    ("Blog", "/blog/"),
]
DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

# Meta
DEFAULT_METADATA = {
    "status": "draft",
}

# Enable Jinja2 in Markdown content via plugin
PLUGINS = ['plugins.context_processor', 'plugins.jinja2_content']
PLUGIN_PATHS = ['.']

# Context for templates (passed to Jinja2)
# These variables are available in ALL templates
EXTRA_CONTEXT = {
    "profile_email": os.getenv("PROFILE_EMAIL", "your.email@example.com"),
    "profile_location": os.getenv("PROFILE_LOCATION", "Hamburg, Germany"),
    "timezone": ZoneInfo(TIMEZONE),
    "profile_status": os.getenv("PROFILE_STATUS", "Open to Opportunities"),
    # Social media links and usernames (for footer icons)
    "gh_username": os.getenv("GH_USERNAME", ""),
    "gh_url": os.getenv("GH_URL", ""),
    "gl_username": os.getenv("GL_USERNAME", ""),
    "gl_url": os.getenv("GL_URL", ""),
    "linkedin_username": os.getenv("LINKEDIN_USERNAME", ""),
    "linkedin_url": os.getenv("LINKEDIN_URL", ""),
    "discord_username": os.getenv("DISCORD_USERNAME", ""),
    "discord_url": os.getenv("DISCORD_URL", ""),
    "calendly_url": os.getenv("CALENDLY_URL", ""),
}

# Ensure all Pelican variables are also in EXTRA_CONTEXT for consistent access
EXTRA_CONTEXT.update({
    "AUTHOR": AUTHOR,
    "SITENAME": SITENAME,
    "SITEURL": SITEURL,
})

# Plugin to inject EXTRA_CONTEXT
PLUGINS = ['plugins.context_processor', 'plugins.projects_data']
PLUGIN_PATHS = ['.']
