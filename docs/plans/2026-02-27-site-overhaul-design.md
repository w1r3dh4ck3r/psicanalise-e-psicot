# karolinejangola.com Full Site Overhaul — Design Document

**Date**: 2026-02-27
**Site**: karolinejangola.com (Wix)
**Owner**: Karoline Jangola — Psicanalista e Psicoterapeuta
**Locations**: Aracaju-SE, Vila Velha-ES, Online (todo o Brasil)
**Contact**: karoljangola@gmail.com | WhatsApp: +55 79 99649-1276

---

## Goal

Rebuild karolinejangola.com as a professional single-page website that converts visitors into clients. Fix all existing issues: broken mobile layout, placeholder content, zero SEO, missing navigation, and unused pages.

## Approach

**Hybrid (Approach C)** — Velo code handles content loading (from CMS), SEO structured data, smooth-scroll navigation, and WhatsApp behavior. The Wix Editor handles visual layout, images, fonts, colors, and mobile positioning. Content lives in Wix CMS collections so Karoline can update text without touching code.

---

## Current State (Audit Findings)

| Issue | Severity |
|-------|----------|
| Treatments page: 100% Wix placeholder text | Critical |
| "Minha Abordagem" page: completely empty | Critical |
| No navigation menu (desktop or mobile) | Critical |
| Mobile layout broken: text overflow, content hidden | Critical |
| Site not indexed by Google | Critical |
| Location mismatch: title says Aracaju, header says Vila Velha | High |
| All header links point to homepage (no real navigation) | High |
| No testimonials | Medium |
| No blog content | Low |
| Unused pages: Cart, Checkout, Booking Calendar, etc. | Low |

---

## New Page Structure

Single-page with smooth-scroll anchor sections:

### 1. Sticky Header
- Left: Brand name "Terapia Humanizada" (or logo)
- Right: Anchor links — Inicio | Sobre | Tratamentos | Depoimentos | Contato
- Mobile: Hamburger menu with the same links
- Fixed position: stays visible on scroll

### 2. Hero Section
- Full-width background image (calm, nature/wellness theme)
- Headline: **"Terapia Humanizada"**
- Subtitle: "Psicanalise e Psicoterapia para criancas, adolescentes e adultos"
- CTA button (green): "Agende sua consulta" → links to `https://wa.me/+5579996491276`
- Mobile: text stacks vertically, CTA is full-width

### 3. Quem Sou (About)
- Professional photo of Karoline (if available)
- Reworked bio text (keep personal story: mother of 3, son with ADHD, daughter with ASD)
- Credentials: ISO 9001, RQP K-69702-DF Clinical Psychoanalyst
- Locations served: "Atendimento presencial em Aracaju-SE e Vila Velha-ES | Online para todo o Brasil"
- Mobile: photo above text, single column

### 4. Tratamentos (Treatments)
- 6 treatment cards in 2x3 grid (desktop), single column (mobile)
- Each card: icon or image, treatment name, ~100-150 word description
- Categories:
  1. **Ansiedade** — anxiety management, symptoms, psychoanalytic approach
  2. **Depressao** — depression support, signs, therapeutic process
  3. **Relacionamentos** — relationship patterns, interpersonal dynamics
  4. **Terapia de Casais** — couples therapy, communication, conflict resolution
  5. **Trauma** — trauma processing, emotional healing, safe space
  6. **Terapia de Jovens** — children/pre-adolescents, emotional development, ADHD/ASD support
- Content: AI drafts initial PT-BR descriptions, Karoline reviews and adjusts

### 5. Depoimentos (Testimonials)
- 3-4 testimonial slots
- Format: quote text + first name + context (e.g., "Maria, mae de paciente")
- Desktop: side-by-side cards; Mobile: swipeable carousel
- Initially placeholder quotes for Karoline to replace with real testimonials

### 6. Contato (Contact)
- Large green WhatsApp button: "Fale comigo pelo WhatsApp" → `wa.me/+5579996491276`
- Email: karoljangola@gmail.com
- Locations: Aracaju-SE | Vila Velha-ES | Online
- Credential badges (existing: RQP card, ISO 9001 certificate)

### 7. Footer
- Name + copyright
- Social media links (if any)
- Minimal design

---

## Pages to Delete

All of these are unused/empty and should be removed:
- Minha Abordagem (empty)
- Blog (no content)
- Post (no content)
- Artigos (no content)
- Agendamento Online (replacing with WhatsApp)
- Calendario de Agendamentos (unused)
- Formulario de Agendamento (unused)
- Pagina do Carrinho (unused e-commerce)
- Carrinho Lateral (unused e-commerce)
- Checkout (unused e-commerce)
- Pagina de Servico (unused)
- Pagina de Agradecimento (unused)

**Keep only**: Homepage (masterPage + Pagina Inicial)

---

## Mobile Design

- Sticky header with hamburger menu
- All sections stack vertically (single column)
- Treatment cards: full-width, one per row
- Testimonials: horizontal swipe carousel
- Font sizes: no overflow, readable without zoom
- Fixed floating WhatsApp button (bottom-right corner, always visible)
- Hero CTA: full-width button
- Images: responsive, proper aspect ratios

---

## SEO

- **Page title**: "Karoline Jangola | Psicanalista e Psicoterapeuta em Aracaju e Vila Velha"
- **Meta description**: "Psicanalise e psicoterapia humanizada para criancas, adolescentes e adultos. Atendimento presencial em Aracaju-SE e Vila Velha-ES, e online para todo o Brasil."
- **H1**: "Terapia Humanizada" (single H1)
- **H2s**: Section headings (Quem Sou, Tratamentos, Depoimentos, Contato)
- **Alt text**: Descriptive alt on all images
- **Sitemap**: Submit to Google Search Console after rebuild
- **robots.txt**: Ensure crawling is allowed
- **Structured data**: LocalBusiness schema via Wix SEO settings

---

## Scheduling

- Remove Wix Bookings system entirely
- All appointment booking via WhatsApp: `https://wa.me/+5579996491276`
- WhatsApp CTA appears in: Hero section, Contact section, floating mobile button
- Keep Wix chat widget as secondary contact option

---

## Content Ownership

| Content | Who drafts | Who approves |
|---------|-----------|-------------|
| Treatment descriptions (6) | AI (PT-BR) | Karoline |
| Bio/About text | AI (rework existing) | Karoline |
| Testimonials | Karoline (real quotes) | Karoline |
| SEO meta tags | AI | Mark/Karoline |
| Design/layout | Wix Editor | Mark/Karoline |

---

## Implementation Split

### Claude does (Velo code + CMS):
- Create CMS collections for treatments, testimonials, site content
- Populate CMS with PT-BR content (treatment descriptions, bio, etc.)
- Write masterPage.js: smooth-scroll navigation, floating WhatsApp button
- Write homepage Velo code: load content from CMS, render dynamically
- Set SEO meta tags and structured data programmatically
- Configure page settings via Velo (title, description)

### Mark does (Wix Editor checklist):
- Delete unused pages (12 pages listed above)
- Set hero background image
- Position/style visual elements (layout grid, spacing, colors, fonts)
- Upload credential badge images
- Upload Karoline's professional photo
- Configure mobile view layout in editor
- Publish and submit to Google Search Console
