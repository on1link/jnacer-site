# Configuration Guide

This project uses environment variables to manage sensitive and personal information. All configuration should be done through a `.env` file to avoid committing sensitive data to the repository.

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Create `.env` File

Copy the `.env.example` file to `.env` and fill in your personal information:

```bash
cp .env.example .env
```

### 3. Edit `.env` with Your Information

Open `.env` and update all placeholders:

```env
# Site Configuration
AUTHOR_NAME=Your Name
SITE_NAME=Your Name — Your Title
SITE_URL=http://localhost:8000

# Personal Information
PROFILE_EMAIL=your.email@example.com
PROFILE_LOCATION=Your City, Your Country
PROFILE_STATUS=Open to Opportunities

# Social Links
GITHUB_URL=https://github.com/yourusername
LINKEDIN_URL=https://linkedin.com/in/yourprofile
TWITTER_URL=https://twitter.com/yourhandle

# Contact Information
CONTACT_EMAIL=contact@example.com

# Legal
BUSINESS_NAME=Your Name
BUSINESS_ADDRESS=Your City, Your Country
BUSINESS_EMAIL=legal@example.com

# CV/Resume
CV_DOWNLOAD_PATH=/cv.pdf

# Production (for deployment)
PRODUCTION_DOMAIN=yourdomain.xyz
CUSTOM_DOMAIN_ENABLED=false
```

## Local Development

Run the development server:

```bash
pelican content -s pelicanconf.py --listen --autoreload
```

The site will be available at `http://localhost:8000`

## Environment Variables Reference

| Variable | Usage | Example |
|----------|-------|---------|
| `AUTHOR_NAME` | Site author name | `First Last Name` |
| `SITE_NAME` | Full site title | `First Last Name — ML Engineer` |
| `SITE_URL` | Development site URL | `http://localhost:8000` |
| `PROFILE_EMAIL` | Your email (for internal use) | `your@email.com` |
| `PROFILE_LOCATION` | Your location | `Your City, Country` |
| `PROFILE_STATUS` | Availability status | `Open to Opportunities` |
| `GITHUB_URL` | GitHub profile link | `https://github.com/yourname` |
| `LINKEDIN_URL` | LinkedIn profile link | `https://linkedin.com/in/yourname` |
| `TWITTER_URL` | Twitter profile link | `https://twitter.com/yourhandle` |
| `CONTACT_EMAIL` | Public contact email | `contact@example.com` |
| `BUSINESS_NAME` | Legal business name | `Your Name` |
| `BUSINESS_ADDRESS` | Legal address | `Your City, Country` |
| `BUSINESS_EMAIL` | Legal contact email | `legal@example.com` |
| `PRODUCTION_DOMAIN` | Production domain | `yourdomain.xyz` |

## Security Notes

- **Never commit `.env` file** - It's already in `.gitignore`
- **Use `.env.example`** as a template for documentation
- All sensitive information stays local or in deployment secrets
- When deploying, use your hosting platform's environment variable management (GitHub Secrets, etc.)

## Templates Using Variables

The following templates automatically use the environment variables:

- `base.html` - Footer social links and contact info
- `impressum.md` - Legal information
- `privacy.md` - Privacy policy and data controller info
- `contact.md` - Contact page links

## Pages Using Variables

All markdown files in `content/pages/` have access to environment variables through Pelican's `EXTRA_CONTEXT`.

## Production Deployment

When deploying to production:

1. Set the `PRODUCTION_DOMAIN` environment variable on your hosting platform
2. All other configuration will automatically use values from your deployment environment variables
3. Make sure to set all required variables in your CI/CD pipeline (GitHub Actions, etc.)

Example for GitHub Actions:

```yaml
env:
  AUTHOR_NAME: ${{ secrets.AUTHOR_NAME }}
  SITE_URL: https://yourdomain.xyz
  PROFILE_EMAIL: ${{ secrets.PROFILE_EMAIL }}
  # ... other variables
```

---

For more details on Pelican configuration, see the [Pelican Documentation](https://docs.getpelican.com/en/latest/settings.html)
