import os
import sys

sys.path.append(os.curdir)
from pelicanconf import *

# Production configuration - use environment variables
SITEURL = os.getenv("PRODUCTION_DOMAIN", "https://jnacer.dev")
RELATIVE_URLS = False

# Feed configuration
FEED_ALL_ATOM = "feeds/all.atom.xml"
DELETE_OUTPUT_DIRECTORY = True

# Production settings
EXTRA_CONTEXT.update({
    "is_production": True,
})
