# Tangerine Blue for Bluesky

The [Tangerine Neue](https://github.com/mattbirchler/Tangerine-Neue-for-Mastodon) look, for
[bsky.app](https://bsky.app). A warm page background, the timeline as a rounded card, and the
accent color everywhere Bluesky uses blue. Light and dark, in five color variants.

This is a user stylesheet. Bluesky doesn't support custom themes, so you apply it with a
browser extension that injects CSS, such as [Stylebot](https://stylebot.dev) or
[Stylus](https://github.com/openstyles/stylus).

**Status: early.** The feed, profiles, and post threads are styled. The left navigation, compose
box, notifications, and settings are still stock Bluesky and are next on the list.

## Install

1. Install Stylebot or Stylus in your browser.
2. Open the variant you want and copy the whole file:
   - [`TangerineBlue.css`](TangerineBlue.css) (Tangerine, orange)
   - [`TangerineBlue-purple.css`](TangerineBlue-purple.css)
   - [`TangerineBlue-cherry.css`](TangerineBlue-cherry.css)
   - [`TangerineBlue-lagoon.css`](TangerineBlue-lagoon.css)
   - [`TangerineBlue-granite.css`](TangerineBlue-granite.css)
3. On bsky.app, open the extension, create a style for `bsky.app`, paste the CSS, and save.

Dark mode follows Bluesky's own theme setting. Pick "Dim" in Bluesky's appearance settings
for the dark version; the pure black "Dark" theme is not covered yet.

## Why it can break

Bluesky sets its colors as inline styles rather than CSS classes. The theme matches those
exact values and swaps in Tangerine's, so when Bluesky changes a shade, that one rule stops
applying until it's updated here. If something looks off after a Bluesky release, please
[open an issue](https://github.com/mattbirchler/Tangerine-Blue-for-Bluesky/issues) with a
screenshot.

## Development

`src/template.css` and `src/variants.mjs` are the source. Run `node src/build.mjs` to
regenerate the five output files. `tools/` has a Playwright script that renders public
Bluesky pages with and without the theme for before/after comparison.

## Credits

Palette and design language from [Tangerine UI](https://github.com/nileane/TangerineUI-for-Mastodon)
by Niléane. MIT licensed.
