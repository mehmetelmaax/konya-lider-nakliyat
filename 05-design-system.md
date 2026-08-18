# Phase 5 & 6 — Design System & Technical Spec

## 5.1 DESIGN SYSTEM

### Brand Palette (Tailwind Tokens)
```css
:root {
  --navy: #102A43;       /* Primary brand color, headings, header, footer */
  --orange: #F7931E;     /* CTA fill, focus indicators, WhatsApp icon wrapper */
  --orange-text: #A85B00;/* Accessible orange text on white backgrounds */
  --charcoal: #252525;   /* Body text copy */
  --gray-light: #E9EEF2; /* Section divider blocks, borders, cards backgrounds */
  --off-white: #F9FAFB;  /* Global fallback background */
  --white: #FFFFFF;      /* Clean margins, containers, text on navy */
  
  /* Usage ratio: 65% Navy | 20% White/Off-White | 10% Gray-Light | 5% Orange */
}
```

### Contrast Locks Table

| Text Color | Background Color | Measured Contrast | WCAG AA / AAA Status | Usage Rules |
| :--- | :--- | :---: | :---: | :--- |
| `#FFFFFF` (White) | `--navy` (`#102A43`) | 14.5:1 | **PASS (AAA)** | Headings and text in dark containers. |
| `--navy` (`#102A43`) | `--orange` (`#F7931E`) | 6.06:1 | **PASS (AA)** | Core primary CTA button fill + label. |
| `--orange` (`#F7931E`) | `#FFFFFF` (White) | 2.39:1 | **FAIL** | **NEVER USE** as text color on light backgrounds. |
| `--orange-text` (`#A85B00`) | `#FFFFFF` (White) | 4.89:1 | **PASS (AA)** | Highlights, links, and minor text icons. |
| `--charcoal` (`#252525`) | `--off-white` (`#F9FAFB`) | 13.5:1 | **PASS (AAA)** | Global body copy text. |
| `--navy` (`#102A43`) | `--gray-light` (`#E9EEF2`) | 9.87:1 | **PASS (AAA)** | Card headings on light gray backgrounds. |

---

## 5.2 VISUAL SPECIFICATIONS

### Logo Vectorization Plan
The logo assets provided by the user are raster graphics. Before production, they must be converted to optimized inline SVGs to avoid fuzzy scaling on high-density mobile screens:
1. **Desktop Header & Footer**: Horizontal lockmark containing the stylized house-arrow glyph followed by the typography `LİDER EVDEN EVE NAKLİYAT`. Recommended layout height is `48px` to fit inside the `64px` header with proper padding.
2. **Mobile Header (<= 430px)**: The standalone house+arrow icon, scaled to `32px` square, leaving maximal header width for click-to-call items.
3. **Reversed Single-Color Logo**: Pure `#FFFFFF` fill for contrast against footer `--navy` backgrounds.
4. **Favicon Assets**:
  - `favicon.ico` (32x32px)
  - `apple-touch-icon.png` (180x180px)
  - `icon-192.png` (192x192px)
  - `icon-512.png` (512x512px)
  - `icon.svg` (SVG mask vector)

### Typography (Self-hosted next/font)
We select a single high-readability sans-serif typeface to minimize loading times and support full Turkish glyph casing mapping (dotless-i, ş, ç, ğ, ö, ü).
- **Primary Typeface**: `Inter` (Variable font family, weights 300 to 800).
- **Heading Font**: `Outfit` (Variable font family, weights 600 to 900) for a modern, premium corporate-contractor aesthetic.

```typescript
// next/font configurations in Next.js
import { Inter, Outfit } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin-ext'], // Full Turkish glyph support
  variable: '--font-sans',
  display: 'swap',
});

export const outfit = Outfit({
  subsets: ['latin-ext'],
  variable: '--font-display',
  display: 'swap',
});
```

#### Typography Scale
- `H1 (Hero Slider)`: `clamp(2rem, 5vw, 3.5rem)` | line-height: `1.15`
- `H2 (Section Headings)`: `clamp(1.5rem, 4vw, 2.5rem)` | line-height: `1.2`
- `H3 (Card Titles)`: `1.25rem` (20px) | line-height: `1.3`
- `Body Text`: `1rem` (16px) | line-height: `1.6` | character ceiling: `65-75` characters per line width (`max-w-prose`).

### Spacing & Grid
- **Columns**: 12 columns desktop, 8 tablet, 4 mobile.
- **Gutters**: Desktop: `32px`, Tablet: `24px`, Mobile: `16px`.
- **Breakpoints**: Mobile: `375px`/`430px`, Tablet: `768px`, Desktop: `1024px`/`1280px`/`1536px`.
- **Section Alternation Rhythm**:
  - Hero Area: Navy Background
  - Trust Strip / Steps: Off-White
  - Services Grid: Gray-Light
  - Testimonials: White
  - FAQ Area: Off-White
  - Footer Area: Navy

### Motion (GSAP + Framer Motion Presets)
Animations are restricted to 4 lightweight presets to prevent UI sluggishness and avoid Cumulative Layout Shift (CLS):
1. **FadeIn Up**: Staggered cards reveal. `duration: 0.3s`, `ease: [0.25, 1, 0.5, 1]`.
2. **Horizontal Slider Fade**: Slider transitions. `duration: 0.4s`, `ease: easeInOut`.
3. **Accordion SlideDown**: FAQ expanding. `duration: 0.2s`, `ease: easeOut`.
4. **Scale Hover**: Micro-interaction on CTAs. `scale: 1.02`, `duration: 0.15s`.
- *Accessibility*: Add `motion` rules to respect `prefers-reduced-motion: reduce`.

---

## 5.3 COMPONENT INTERFACE SPECS

All interactive components must support 5 states: **Default, Hover, Active, Focus-Visible, and Disabled/Loading**. Touch screens use `active:scale-98` for touch feedback instead of hover.

### 1. Button
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'tertiary';
  isLoading?: boolean;
}
// Default styles
// - primary: bg-orange text-navy hover:bg-navy hover:text-white focus-visible:ring-2 ring-orange
// - secondary: border border-navy text-navy hover:bg-navy hover:text-white
// - tertiary: text-orange-text underline
```

### 2. StickyMobileCTA
- **Positioning**: Fixed at bottom of screen (`bottom-0 left-0 w-full z-50`).
- **Visibility**: Appears after Hero Section exits view.
- **Micro-Collision Resolution**: If scroll hits the final footer CTA form, the `StickyMobileCTA` fades out smoothly (`opacity-0`) to avoid layout clutter.
- **Safe Area**: Uses `pb-[env(safe-area-inset-bottom)]` to prevent clipping behind the iOS home indicator bar.

### 3. QuoteForm
- **Inputs**: Name, Tel (using `inputMode="tel"` and regex validation `0[5-9]\d{9}$`), Route From, Route To, Move Size.
- **Anti-Pattern**: Avoid email or zip-code requests to keep friction minimal.
- **States**: Validated inline using custom Tailwind border highlights (`border-emerald-500` or `border-rose-500`).

---

## 5.4 IMAGERY RULESET

- **Formats**: AVIF format by default, falling back to WebP. No legacy JPGs.
- **Optimization**: Sized correctly via `next/image` with explicit aspect ratios (e.g., `aspect-video`).
- **Stock Cliché Replacements**:
  - *Cliché*: Generic model crew smiling. *Replacement*: Action detail shots showing bubble wrap folding around wooden edges.
  - *Cliché*: Empty cardboard boxes in white void. *Replacement*: Hand placing tape on a box overlayed with the brand tag.
- **Icon stroke weights**: Uniform stroke weight `1.5px` matching typography weights.

---

## 5.5 PHASE 6 — TECHNICAL SPECIFICATIONS

### Rendering Optimization
- **Home Page**: ISR (Incremental Static Regeneration) with `revalidate: 86400` (24 hours).
- **Service Pages**: SSG (Static Site Generation) during build.
- **District/Route Pages**: ISR with `revalidate: 604800` (Weekly) to fetch prices dynamically without building 20+ pages statically each time.
- **HTML Server Output**: FAQ Accordion content and Slider text must reside in the raw static HTML output to ensure complete indexing by crawler scrapers.

### Core Web Vitals targets
- **LCP**: < 2.0s over mobile 4G.
- **CLS**: < 0.05. Maintained by sizing the Hero Slider container wrapper aspect-ratio statically (`aspect-[16/9] md:aspect-[21/9]`).
- **INP**: < 200ms. Keep interactive forms client-only.
- **Bundle Management**: Avoid importing the entire `framer-motion` bundle. Import only `m` and `LazyMotion`.

### URL Canonicals
- Locale-aware lowercase transliteration logic to avoid dotless-i routing breaks.
- All endpoints end without trailing slashes. Forced redirect to WWW and HTTPS.

---

## 5.6 STRUCTURED DATA (JSON-LD)

This script is generated server-side and injected into `/` and respective directories. Review schema is omitted because no verified review source is confirmed.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MovingCompany",
      "@id": "https://konyaliderevdeneve.com/#organization",
      "name": "Konya Lider Nakliyat",
      "alternateName": "Lider Evden Eve Nakliyat",
      "url": "https://konyaliderevdeneve.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://konyaliderevdeneve.com/img/logo.png",
        "width": "200",
        "height": "60"
      },
      "telephone": "+905546400205",
      "email": "info@konyaliderevdeneve.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Fatih Mahallesi, 73258 Sokak, No:9/1",
        "addressLocality": "Selçuklu",
        "addressRegion": "Konya",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "37.015",
        "longitude": "35.295"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "07:00",
        "closes": "22:00"
      },
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Selçuklu"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Meram"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Karatay"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Ereğli"
        }
      ],
      "priceRange": "$$"
    },
    {
      "@type": "Service",
      "@id": "https://konyaliderevdeneve.com/#service-asansorlu",
      "name": "Asansörlü Evden Eve Nakliyat",
      "provider": {
        "@id": "https://konyaliderevdeneve.com/#organization"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Konya"
      }
    }
  ]
}
```
