// Bootstrap 5.3.9 from jsDelivr (docs/decisions/0001-bootstrap-5-via-cdn.md).
// Integrity hashes were computed from the CDN files and checked byte-for-byte against the
// npm package bootstrap@5.3.9 on 19/11/2026. Update version and hashes together.

export const bootstrapVersion = '5.3.9';
const base = `https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist`;

export const bootstrapCss = {
  ltr: {
    href: `${base}/css/bootstrap.min.css`,
    integrity: 'sha384-yEPZ7jP9S0QKiUQ0m3jjsO4ProIW7wvR9gXkI7JOGa2XVsw53Yke2bsdkBbjmmiX',
  },
  rtl: {
    href: `${base}/css/bootstrap.rtl.min.css`,
    integrity: 'sha384-fFMX5LqaHoT6olm8r/JTe3Dg4+vFEFXrVlhIo8IGs96iA+JhgKLLYwY4y2fHeyMY',
  },
} as const;

export const bootstrapJs = {
  src: `${base}/js/bootstrap.bundle.min.js`,
  integrity: 'sha384-WyOxWvTyr1QaMPfiPJSv76iReVthorl5uWlFtZPyK0IEB0hGzo9y5Bp9mYanr8Bu',
} as const;

export const cdnOrigin = 'https://cdn.jsdelivr.net';
