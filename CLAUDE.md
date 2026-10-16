# Tangerine Blue for Bluesky

A user stylesheet that gives bsky.app the Tangerine look. Sibling of Tangerine Neue for
Mastodon (`../TangerineUI-for-Mastodon`) and shares its palette.

## Source of truth

- `src/template.css` and `src/variants.mjs` are the only source. Run `node src/build.mjs`
  to regenerate the five `TangerineBlue*.css` files. CI fails if they are stale.
- Version string lives in `src/template.css` (`--t-version: "vX.Y.Z";`). Bump it there and rebuild.
- Rules in the template get the rule only, no justification comments. Put rationale in the
  commit message.

## How the theme targets Bluesky

Bluesky sets colors as inline styles, so rules match values like `rgb(0, 106, 255)` with
attribute selectors (`[style*="..."]`) and swap in `--t-*` tokens with `!important`. Structure
is targeted through Bluesky's `data-testid` hooks. Dark tokens switch on Bluesky's own
`html.theme--dim` / `html.theme--dark` class, so they follow the in-app theme setting, not the OS. Palette rules are scoped per theme class
(`html.theme--light`, `html.theme--dim`, `html.theme--dark`) and map Bluesky's shades
(`primary_500` for solid buttons, `primary_600` for hover and ghost-button text, `primary_200`
for disabled, `contrast_*` for greys). The authoritative shade values come from the
`@bsky.app/alf` npm package (`dist/palette.js`). Override rules after the palette section
are prefixed with `html[class]` so they outrank the palette rules. When Bluesky changes a
value, the matching rule silently stops applying; the screenshot harness in `tools/` is how
to catch that.

## Testing

No local Bluesky. `tools/screenshot.mjs` loads public bsky.app pages headlessly and injects
the CSS with Playwright, which is equivalent to what Stylebot does. Logged-in views (left nav,
compose, notifications, settings) need a real session and are checked by hand in Stylebot.

## Releases

Version-named branch, PR into main, merge, tagged GitHub release with human-written notes.
