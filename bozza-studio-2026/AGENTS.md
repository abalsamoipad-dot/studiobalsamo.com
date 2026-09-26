# Prototype Instructions

## User-approved direction, 26 September 2026
- Initial selected visual: `../design-explorations/2026-09-26/proposta-2-v2-commercialista.png`. It remains the historical palette/imagery reference. The latest explicit user request authorizes a broader modernization of the existing prototype, superseding strict layout fidelity to that initial mock.
- Midnight navy, large clear typography, images of accounting, financial statements, corporate numbers and advisory work. User explicitly rejected architecture imagery and abstract sculptures.
- Keep the website a professional commercialista / corporate advisory site. No fabricated credentials, client outcomes, awards or customer counts.
- Prototype lives in this folder. Preserve the existing production site and configuration in the parent. No publication has been requested.
- User supplied `../Foto sito New.png` as the new portrait. Use its faithful copy `public/assets/antonio-balsamo.jpg`; preserve the original and the person’s appearance.
- Contact flow is a clearly labeled local simulation; no requests to Formspree and no persistence of submitted data.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat it as the source of truth unless later explicit user feedback supersedes it, as in the modernization below.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

- User requested restrained but distinctive scrolling movement: preserve subtle hero parallax, one-time scroll reveals, compact sticky navigation and smooth disclosures; honor prefers-reduced-motion.
- User asked for a more innovative scroll/text experience: preserve the cinematic headline entrance, layered hero movement and masked portrait reveal.
- Latest feedback explicitly rejects the tall, pinned “I numeri acquistano valore...” scene: it scrolls too slowly and looks like the end of the site. That scene and its word-by-word scroll gate are removed. Move directly from method to competencies, with compact spacing and short one-time entrances. No forced scroll distance, full-screen interludes or pinned narrative sections. Preserve native scrolling and reduced-motion alternatives.
- Latest modernization: the user still finds the page old-fashioned and wants a modern, dynamic professional identity. The implementation now uses an asymmetric opening, a separate financial image frame, larger lighter typography, electric-blue accents, rounded action targets, short line entrances and subtle pointer response. Preserve the continuous document flow; do not reintroduce the rejected narrative scene.
- The professional-network sentence must say “dell’area legale, del lavoro e della revisione.” The user explicitly removed “delle perizie”.

## New structural exploration, 26 September 2026
- The user has rejected the latest implementation as too static and old-fashioned, explicitly asking to rethink the entire project and its structure. The asymmetric hero / method / services / studio sequence above is not approved and must not constrain the next design.
- Explore distinct entry journeys and visual systems before another implementation. Keep professional commercialista content, the authentic portrait, native continuous scrolling and the corrected network sentence. Do not merely add animation to the existing layout.
- New concepts and their motion rationale live in `../design-explorations/2026-09-26/ripartenza/`. Build only after the user selects from this latest exploration.

## Approved option 3 — current visual truth
- The user explicitly selected option 3 from the latest displayed set: `../design-explorations/2026-09-26/ripartenza/opzione-3-studio-in-prima-persona.png`, generated result `exec-74e2350f-0d6c-4683-ab00-ae30ef6ff378.png`. This supersedes earlier navy/blue layout constraints.
- Recreate the open off-white composition, ink headline “Le decisioni”, central authentic cutout portrait, coral foreground “si prendono insieme.” and immediate full-width accounting photograph chapter.
- Preserve clear readable hero text, the real person's appearance, Phosphor icons and DM Sans. Extend the art direction through professional content and contacts, without generic cards or invented metrics.
- Motion uses short opposing headline movement, restrained portrait depth, financial-image parallax and text entrances during native scrolling. All content must remain legible and usable with reduced motion and touch. No long pinned scenes.

## Refinement approved by the user — studio portrait and spacing
- The user likes the option 3 structure and asks to preserve it. Changes are scoped to integrating the small photograph in the dark Studio section and reducing unnecessary whitespace throughout the page.
- Use the faithful `antonio-balsamo.jpg` in an editorial portrait with overlapping name/credentials, short crop reveal, restrained image movement on scroll and subtle pointer depth. Do not regenerate or alter the person's face for this refinement. Respect reduced motion and touch.
- Keep hero and financial transition intact. Tighten section padding, title-to-content gaps and the spacing around the working method, while preserving readable groups and usable form controls.
- Current audit and before/after evidence: `qa/2026-09-26-studio-spacing/`.

## Publication authorized, 26 September 2026
- The user approved the refined site and explicitly requested a CCII/Civil Code citation audit, commit, production deployment and a final cleanup commit. This supersedes earlier prototype-only restrictions.
- Publish through the existing GitHub Pages main/root configuration and preserve CNAME. Use the existing Formspree endpoint for real user submissions; do not send test messages to the live service.
- Production metadata must be indexable. Preserve the approved layout and portrait effects. Exclude local screenshots, original photographs, cloud-console exports, exploration files, and machine-specific audit artifacts from public commits.

## Mobile hero readability, 26 September 2026
- The first mobile correction separated the portrait too far from “Le decisioni”; the user prefers the original prominence with a subtler overlap. Raise and enlarge the portrait so the crown just touches the lower edge of the headline, keeping the words readable. Keep the bounded image sizing for short Safari viewports, the approved desktop composition and the current hero height.
