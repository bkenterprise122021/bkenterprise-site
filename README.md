# BK Enterprise GitHub Site - Embedded Product Version

This version changes product buttons so users see clean BK Enterprise URLs instead of direct `script.google.com` URLs.

## Clean product URLs

- https://bkenterprise.co.za/plumbing-booking-system/
- https://bkenterprise.co.za/bk-community-status/
- https://bkenterprise.co.za/bk-service-pro/
- https://bkenterprise.co.za/bk-ai-prompt-builder/
- https://bkenterprise.co.za/bk-teacher-reviews/
- https://bkenterprise.co.za/bk-edusuite/
- https://bkenterprise.co.za/bk-question-guesser/

## Files/folders added

- `product-frame.css`
- One folder per product, each containing its own `index.html`
- Updated `products.json`
- Updated `scripts.js`
- Updated `sitemap.xml`

## Important Apps Script step

Each live Apps Script product must allow iframe embedding.

In each product's Apps Script project, update `doGet()` to include:

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("BK Product")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

If the app uses templates, use:

```javascript
function doGet(e) {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("BK Product")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

Then deploy a new web app version:

Deploy > Manage deployments > Edit > New version > Deploy

## Testing

After uploading to GitHub, test:

1. Homepage product button opens a clean BK URL.
2. The product app loads inside the page.
3. The browser address stays on `bkenterprise.co.za/product-name/`.
4. Use hard refresh if you still see cached old files.
