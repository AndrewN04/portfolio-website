# Design system

## Surface

An experience-led single-page portfolio. The work and the developer's identity lead; the interface frames them as a precise, working terminal rather than generic marketing cards.

## Visual language

- Near-black canvas `#000000`, with restrained raised surfaces `#08090a` and `#101317`.
- Off-white primary text and high-contrast slate secondary text.
- Syntax blue `#61afef` and syntax green `#98c379`; retain a continuous, moderately pastel RGB accent only for the animated role type and its matching profile snippet.
- Space Grotesk for editorial/display and body text. Fira Code for commands, labels, metadata, and code.
- Fine neutral rules and squared, low-radius terminal surfaces. No glass, purple, decorative imagery, or fake metrics.

## Composition and interaction

- First viewport pairs a large automatic role typewriter with a code profile panel.
- Section headings use concise shell commands and indices. Skills use compact rows; projects use five compact banners per carousel page with keyboard, touch, and pagination controls.
- Contact is a clear terminal-form close. The footer keeps the cursor spotlight on pointer devices.
- Navigation stays semantic, responsive, and keyboard operable. Layout reflows at 320px and primary touch controls target at least 44px.
- Typewriter and RGB background movement continue under `prefers-reduced-motion`; other motion honors the preference.

## Tokens

Defined in `app/globals.css` as CSS custom properties for canvas, surfaces, text, syntax colors, rules, and focus.
