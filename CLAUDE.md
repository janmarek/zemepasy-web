# Zeměpásy — web

Static band website built with [Eleventy](https://www.11ty.dev/). No server required.

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
web/
├── _includes/
│   └── base.njk      — shared layout: head, masthead, nav, footer
├── index.njk         — homepage: two-column (gigs+newsletter+social left, bio+photo right)
├── pisne.njk         — songs: lyrics + chords accordion, YouTube embeds
├── fotky.njk         — photo gallery
├── kontakty.njk      — contact page: Jan Marek, email, phone, socials
├── img/
│   └── foto-*.jpg    — band photos (numbered 1–5 currently)
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

## GitHub Pages

Push `_site/` contents to a `gh-pages` branch, or use a GitHub Action:
```yaml
- run: npm ci && npm run build
- uses: peaceiris/actions-gh-pages@v4
  with:
    publish_dir: ./web/_site
```
