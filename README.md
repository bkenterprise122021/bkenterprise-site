# BK Enterprise GitHub Pages Website

This is the GitHub-ready static version of the BK Enterprise landing page.

## Files

- `index.html` - main website page
- `styles.css` - website styling
- `scripts.js` - product loading, search/filter, analytics events
- `products.json` - edit this file to add or change products
- `assets/bk-logo.jpg` - original BK Enterprise logo
- `CNAME` - custom domain setting for GitHub Pages
- `.nojekyll` - tells GitHub Pages to serve files as-is

## Important

This is not an Apps Script project. It is a static GitHub Pages website.
Your product buttons should link to your deployed Apps Script `/exec` URLs.

## How to add product links

Open `products.json` and update each product `url` value.

Example:

```json
"url": "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

If a product URL is `#`, the site will show a message saying the link has not been added yet.

## GitHub setup

1. Create a public repository, for example `bkenterprise-site`.
2. Upload all files from this folder into the repository root.
3. Go to `Settings > Pages`.
4. Set source to `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Under Custom domain, use `bkenterprise.co.za`.
7. In Vox DNS, add GitHub Pages DNS records.
8. When GitHub is ready, enable `Enforce HTTPS`.

## DNS records for Vox

Add these A records for `bkenterprise.co.za.`:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Add a CNAME for `www.bkenterprise.co.za.`:

```text
YOUR-GITHUB-USERNAME.github.io.
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

## Product update

This version includes the updated product list supplied on 2026-07-15, including BK Teacher Reviews, BK EduSuite and BK Question Guesser.
