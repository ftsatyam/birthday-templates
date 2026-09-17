# Wishwell — Birthday Templates

Wishwell is a polished, static-first birthday template browser for people who want to send something more memorable than a quick “HBD”. The experience is designed around a warm editorial art direction: cream paper, coral energy, playful lime highlights, purple moments, oversized serif typography, and little details that make browsing feel like opening a beautifully made card.

## Product overview

The site is a single-page template browser with a lightweight interaction layer:

- Responsive hero section with a featured card composition.
- Template catalog with category filtering and keyword search.
- Favorite toggles with saved-count feedback.
- Template preview modal with a clear “Use this template” conversion path.
- “How it works” and testimonial sections for trust and product storytelling.
- Newsletter signup feedback state and reusable toast notifications.
- Mobile navigation drawer behavior and mobile-first layout adjustments.

The current experience uses remote Unsplash image URLs for visual card artwork. For a production CMS, these can be replaced with optimized CDN assets or a managed media library without changing the component model.

## Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4 import pipeline
- Lucide React icons
- Wouter-compatible project scaffold
- CSS custom properties for the Wishwell design tokens

## Local development

Requirements: Node.js 20+ and pnpm 10+.

```bash
pnpm install
pnpm dev
```

The development server runs on `http://localhost:3000`.

## Useful scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite development server with host access. |
| `pnpm build` | Build the client and the scaffold server bundle. |
| `pnpm check` | Run TypeScript without emitting files. |
| `pnpm preview` | Preview the production client build locally. |
| `pnpm format` | Format the repository with Prettier. |

## Project structure

```text
client/
  index.html            Document shell and metadata.
  src/
    App.tsx             Application entry point.
    index.css           Wishwell design system and responsive styling.
    main.tsx            React bootstrap.
    pages/Home.tsx      Complete homepage and interaction state.
server/
  index.ts              Scaffold server for production serving.
shared/
  const.ts              Shared scaffold constants.
README.md               Project documentation.
```

## Design system

The visual language pairs **Playfair Display** for emotionally expressive headlines with **DM Sans** for clear UI and body copy. The palette is intentionally warm and celebratory:

| Token | Value | Use |
| --- | --- | --- |
| Cream | `#f8f2e8` | Primary page background. |
| Paper | `#fffaf2` | Cards, modals, and elevated surfaces. |
| Ink | `#242029` | Typography and dark action surfaces. |
| Coral | `#ff7057` | Primary celebration accent and actions. |
| Purple | `#9978ee` | Secondary brand accent and story section. |
| Lime | `#d0ef73` | Highlight color and positive feedback. |

Motion uses short, interruptible transitions with a reduced-motion fallback. The catalog and modal are intentionally usable by keyboard, and all icon-only buttons include accessible labels.

## Development notes

The homepage is intentionally self-contained so it can be moved to a CMS-backed implementation later. Template records are currently modeled as a typed array in `client/src/pages/Home.tsx`. A future integration can replace that source with a server-backed or build-time collection while preserving the existing filtering and presentation API.

The “Use this template”, newsletter, saved, and copy-link flows currently provide polished local feedback instead of performing an external side effect. These are safe extension points for a future personalization editor, authentication layer, or delivery provider.

## Production considerations

Before production launch, replace the remote demo image URLs with optimized, licensed assets hosted on a CDN. Add form delivery and analytics environment variables, configure a content model for templates, and include social sharing metadata for individual card routes. The current static project is intentionally free of secrets and backend dependencies.

## License

MIT. See the repository for the complete source code and project configuration.

## Interactive personalization editor

Each template now opens a live personalization editor. Users can edit the recipient name and greeting, switch between Coral Joy, Purple Party, Lime Light, and Blue Skies themes, and see the card update immediately in the preview pane. The Save design action provides a completion state suitable for connecting to a future persistence or delivery service, while Copy preview link currently provides local feedback.

The editor is intentionally client-side and dependency-free. Its state is local to the current session, making it easy to replace later with a personalization API, account-backed drafts, or a shareable route without changing the browse experience.


### Photo and font customization

The editor also supports a local personal photo upload for JPG, PNG, and WEBP files up to 5 MB. The image is previewed immediately on the card and can be replaced or removed before saving. Users can choose from four type directions—Editorial, Friendly, Handwritten, and Modern—which update the live card typography without changing the overall layout.
