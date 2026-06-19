# Zeměpásy — web

Static band website built with [Eleventy](https://www.11ty.dev/). Lives at `janmarek/zemepasy-web` on GitHub, deployed to https://janmarek.github.io/zemepasy-web/ via GitHub Actions.

## Stack

- **11ty (Eleventy)** — static site generator; shared layout in `_includes/base.njk`
- **Tailwind CSS** via Play CDN (no build step for CSS)
- **Font Awesome 6 Free** via cdnjs CDN — used for brand icons (fa-brands)
- **Google Fonts** — Playfair Display, PT Serif, Courier Prime

## Custom colors (Tailwind config in base.njk)

| Name     | Hex       | Usage                        |
|----------|-----------|------------------------------|
| `paper`  | `#faf8f3` | background                   |
| `ink`    | `#1a1a1a` | text, borders                |
| `muted`  | `#5c5040` | secondary text               |
| `accent` | `#8c3a2e` | hover color (links, button)  |

Global `a:hover { color: #8c3a2e }` is set in `base.njk`. The band name link overrides this with `hover:text-ink` to stay dark.

## Files

```
├── _includes/
│   └── base.njk      — shared layout: head, masthead, nav, footer; OG/Twitter/canonical meta tags here
├── index.njk         — homepage: two-column (bio+photo first on mobile; concerts+newsletter+social left on desktop)
├── pisne.njk         — songs: lyrics + chords accordion, YouTube embeds
├── fotky.njk         — photo gallery
├── kontakty.njk      — contact page: Jan Marek, email, phone, socials
├── img/
│   ├── cover.jpg     — used as OG/Twitter share image
│   └── foto-*.jpg    — band photos (numbered 1–5 currently)
├── favicon.svg       — Z on paper background (#faf8f3), ink top bar
├── robots.txt        — allows all, points to sitemap
├── sitemap.xml       — all 4 pages
└── _site/            — build output (gitignored)
```

## Development

```
npm install      # first time only
npm run build    # build to _site/
npm run dev      # build + live server at localhost:8080
```

## Nav + current-page highlight

Nav has 4 items: O nás · Písně · Fotky · Kontakty.

Each page sets `navPage` in its frontmatter. `base.njk` uses this to bold + underline the active item:

```yaml
navPage: home      # index.njk
navPage: pisne     # pisne.njk
navPage: fotky     # fotky.njk
navPage: kontakty  # kontakty.njk
```

## Homepage two-column layout

DOM order matches visual order on both mobile and desktop: concerts + newsletter first (left), bio + photo second (right). No CSS order tricks — the `lg:grid lg:grid-cols-2` parent auto-places children left→right.

## Adding content

**Gig** — copy the commented template in `index.njk` under `#koncerty`

**Song** — copy the `<details>` template comment in `pisne.njk`:
- Use `<pre class="song-text">` for lyrics/chords; chord lines go directly above the lyric line
- Czech chord names: H = B, B = Bb
- YouTube embed (place before `<pre>`):
  ```html
  <div class="aspect-video mb-6">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="..." frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen class="w-full h-full"></iframe>
  </div>
  ```
  If a video shows "Error 153", embedding is disabled — fix in YouTube Studio → Content → video Details → More options → Allow embedding.

**Photo** — add a `<figure>` block to `fotky.njk`, save image to `img/`:
```html
<figure class="sm:border sm:border-ink sm:p-4">
  <img src="img/foto-N.jpg" alt="..." class="w-full object-cover aspect-[3/2]" loading="lazy">
  <figcaption class="font-mono text-[0.65rem] tracking-wide text-muted px-1 pt-2">
    Popis / místo / rok
  </figcaption>
</figure>
```
Note: border and padding are hidden on mobile (`sm:` prefix) — edge-to-edge on small screens.

## Newsletter

Form `action="#"` is a placeholder. To activate with Mailchimp (free up to 500 contacts):
1. Create an account and Audience at mailchimp.com
2. Audience → Signup forms → Embedded forms
3. Copy the `action` URL into the form in `index.njk`
4. Remove `onsubmit="return false;"` from the form tag

## SEO & meta

- `base.njk` contains canonical URL, OG tags, Twitter Card, theme-color — all driven by `pageTitle` and `description` frontmatter
- `index.njk` has a JSON-LD `MusicGroup` schema block at the bottom of the content
- `img/cover.jpg` is the OG share image — replace with a better band photo if available
- If the site moves to a custom domain, update the hardcoded `https://janmarek.github.io/zemepasy-web/` URLs in: `base.njk` (canonical + OG), `index.njk` (JSON-LD), `robots.txt`, `sitemap.xml`

## GitHub Pages

Deployed automatically on push to `main` via `.github/workflows/deploy.yml`. Uses Node 26. GitHub Pages source is set to "GitHub Actions" in repo settings.
