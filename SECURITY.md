# Security Policy

## Reporting a vulnerability

If you discover a security issue in this site, please email **ink@bloodlineinkwear.com**
with a description and steps to reproduce. Please do not open a public issue for
security reports.

## Scope

This is a static marketing website (HTML, CSS, and vanilla JavaScript) with no
backend, database, or user authentication. There is currently no server-side
processing of form submissions.

## Hardening in place

- A restrictive **Content-Security-Policy** is set via `<meta>` in `index.html`.
  Scripts and styles are same-origin only (no `'unsafe-inline'`); fonts are
  limited to Google Fonts.
- A `referrer` policy of `strict-origin-when-cross-origin` is enforced.
- All JavaScript renders text via `textContent` (no `innerHTML`/`eval`), so the
  pages are not exposed to DOM-based XSS.

## Notes for deployment

Some protections can only be delivered as real HTTP response headers rather than
`<meta>` tags. When hosting allows custom headers, also send:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
