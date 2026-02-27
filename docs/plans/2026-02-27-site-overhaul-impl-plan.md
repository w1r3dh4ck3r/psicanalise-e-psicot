# karolinejangola.com Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild karolinejangola.com as a professional single-page site with real content, working navigation, proper mobile design, and SEO.

**Architecture:** Hybrid — Velo code handles CMS content loading, SEO structured data, smooth-scroll navigation, and WhatsApp behavior. Wix Editor handles visual layout, images, fonts, and mobile positioning. Content lives in Wix CMS collections.

**Tech Stack:** Wix Velo (frontend JS), wix-data (CMS), wix-seo-frontend (SEO), Wix Editor (visual design)

---

## Phase 1: Content Preparation (Claude — code only)

### Task 1: Draft treatment descriptions in PT-BR

**Files:**
- Create: `content/tratamentos.json`

**Step 1:** Write 6 treatment descriptions in Brazilian Portuguese (~100-150 words each). Professional, empathetic tone. Focus on the patient's experience and outcomes.

Categories:
1. Ansiedade
2. Depressao
3. Relacionamentos
4. Terapia de Casais
5. Trauma
6. Terapia de Jovens

**Step 2:** Save as JSON array ready for CMS bulk insert:
```json
[
  { "title": "Ansiedade", "description": "...", "order": 1 },
  ...
]
```

**Step 3:** Commit
```bash
git add content/tratamentos.json
git commit -m "content: draft treatment descriptions in PT-BR"
```

---

### Task 2: Draft bio, hero text, and testimonial placeholders

**Files:**
- Create: `content/site-content.json`

**Step 1:** Write reworked bio text (based on existing "Quem Sou" content), hero headline/subtitle, and 3 testimonial placeholder entries.

**Step 2:** Save as JSON:
```json
{
  "hero": { "headline": "...", "subtitle": "...", "ctaText": "..." },
  "bio": "...",
  "testimonials": [
    { "quote": "...", "clientName": "...", "context": "..." },
    ...
  ]
}
```

**Step 3:** Commit
```bash
git add content/site-content.json
git commit -m "content: draft bio, hero text, and testimonial placeholders"
```

---

### Task 3: Write SEO code for homepage

**Files:**
- Modify: `src/pages/Página Inicial.c1dmp.js`

**Step 1:** Write homepage Velo code that sets:
- Page title
- Meta description
- Open Graph tags (og:title, og:description, og:type, og:url)
- LocalBusiness structured data (JSON-LD) with both Aracaju and Vila Velha addresses

```javascript
import wixSeoFrontend from 'wix-seo-frontend';

$w.onReady(function () {
  wixSeoFrontend.setTitle('Karoline Jangola | Psicanalista e Psicoterapeuta em Aracaju e Vila Velha');

  wixSeoFrontend.setMetaTags([
    { name: 'description', content: '...' },
    { property: 'og:title', content: '...' },
    { property: 'og:description', content: '...' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://www.karolinejangola.com' }
  ]);

  wixSeoFrontend.setStructuredData([{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Karoline Jangola — Psicanalista e Psicoterapeuta",
    // ... full schema
  }]);
});
```

**Step 2:** Commit
```bash
git add "src/pages/Página Inicial.c1dmp.js"
git commit -m "feat: add SEO meta tags and structured data to homepage"
```

---

### Task 4: Write masterPage.js — navigation and WhatsApp

**Files:**
- Modify: `src/pages/masterPage.js`

**Step 1:** Write site-wide code for:
- Smooth-scroll anchor navigation (nav link clicks → `$w('#anchorXxx').scrollTo()`)
- Floating WhatsApp button click handler
- Mobile hamburger menu toggle (show/hide)

```javascript
$w.onReady(function () {
  // Smooth-scroll navigation
  // These element IDs must be created in the editor
  const navMap = {
    '#navInicio': '#anchorHero',
    '#navSobre': '#anchorSobre',
    '#navTratamentos': '#anchorTratamentos',
    '#navDepoimentos': '#anchorDepoimentos',
    '#navContato': '#anchorContato'
  };

  Object.entries(navMap).forEach(([navId, anchorId]) => {
    $w(navId).onClick(() => {
      $w(anchorId).scrollTo();
      // Close mobile menu if open
      if (!$w('#mobileMenu').hidden) {
        $w('#mobileMenu').hide('fade');
      }
    });
  });

  // WhatsApp floating button
  $w('#whatsappFloat').onClick(() => {
    // wix-location or direct link
    import('wix-location-frontend').then(wixLocation => {
      wixLocation.to('https://wa.me/+5579996491276');
    });
  });

  // Mobile hamburger toggle
  $w('#hamburgerButton').onClick(() => {
    if ($w('#mobileMenu').hidden) {
      $w('#mobileMenu').show('fade');
    } else {
      $w('#mobileMenu').hide('fade');
    }
  });
});
```

**Note:** All element IDs (`#navInicio`, `#anchorHero`, `#whatsappFloat`, `#hamburgerButton`, `#mobileMenu`) must be created in the Wix Editor by Mark before this code works.

**Step 2:** Commit
```bash
git add src/pages/masterPage.js
git commit -m "feat: add smooth-scroll navigation and WhatsApp button to masterPage"
```

---

### Task 5: Write homepage CMS loading code

**Files:**
- Modify: `src/pages/Página Inicial.c1dmp.js` (append to existing SEO code)

**Step 1:** Add code to load treatments from CMS into a Repeater, and testimonials into a second Repeater:

```javascript
import wixData from 'wix-data';

// Inside $w.onReady, after SEO code:

// --- Treatments Repeater ---
$w('#treatmentsRepeater').onItemReady(($item, itemData) => {
  $item('#treatmentTitle').text = itemData.title;
  $item('#treatmentDesc').text = itemData.description;
});

wixData.query('Tratamentos')
  .ascending('order')
  .find()
  .then((results) => {
    $w('#treatmentsRepeater').data = results.items;
  });

// --- Testimonials Repeater ---
$w('#testimonialsRepeater').onItemReady(($item, itemData) => {
  $item('#testimonialQuote').text = itemData.quote;
  $item('#testimonialName').text = itemData.clientName;
  $item('#testimonialContext').text = itemData.context;
});

wixData.query('Depoimentos')
  .ascending('order')
  .find()
  .then((results) => {
    $w('#testimonialsRepeater').data = results.items;
  });
```

**Note:** Repeater elements and their child element IDs must exist in the Wix Editor.

**Step 2:** Commit
```bash
git add "src/pages/Página Inicial.c1dmp.js"
git commit -m "feat: load treatments and testimonials from CMS into repeaters"
```

---

### Task 6: Write CMS seed script (backend)

**Files:**
- Create: `src/backend/seedContent.jsw` (Wix web module — callable from editor preview)

**Step 1:** Write a backend function that inserts the treatment and testimonial content into CMS collections. This is run once to populate initial content.

```javascript
import wixData from 'wix-data';

export async function seedTratamentos() {
  const items = [/* from tratamentos.json */];
  return wixData.bulkInsert('Tratamentos', items);
}

export async function seedDepoimentos() {
  const items = [/* from site-content.json testimonials */];
  return wixData.bulkInsert('Depoimentos', items);
}
```

**Step 2:** Commit
```bash
git add src/backend/seedContent.jsw
git commit -m "feat: add CMS seed script for treatments and testimonials"
```

---

## Phase 2: Editor Setup (Mark — visual tasks)

These tasks happen in the Wix Editor. Each is a checklist item.

### Task 7: Delete unused pages

In the Wix Editor → Pages panel, delete:
- [ ] Minha Abordagem #deleted
- [ ] Blog #deleted
- [ ] Post #deleted
- [ ] Artigos #deleted
- [ ] Agendamento Online #does not allow to remove
- [ ] Calendario de Agendamentos #does not allow to remove
- [ ] Formulario de Agendamento #does not allow to remove
- [ ] Pagina do Carrinho #does not allow to remove
- [ ] Carrinho Lateral #does not allow to remove
- [ ] Checkout #could not find
- [ ] Pagina de Servico #has only an option to replace with custom page
- [ ] Pagina de Agradecimento #deleted

---

### Task 8: Create CMS collections

In the Wix Editor → CMS panel:

**Collection: `Tratamentos`**
| Field | Type | ID |
|-------|------|----|
| Title | Text | `title` |
| Description | Text (multi-line) | `description` |
| Order | Number | `order` |

**Collection: `Depoimentos`**
| Field | Type | ID |
|-------|------|----|
| Quote | Text (multi-line) | `quote` |
| Client Name | Text | `clientName` |
| Context | Text | `context` |
| Order | Number | `order` |

---

### Task 9: Build homepage sections in editor

Rebuild the Homepage as a single-page layout with these sections (top to bottom):

**Header (masterPage):**
- [ ] Add sticky header strip
- [ ] Add brand name text: "Terapia Humanizada" → ID: `brandName`
- [ ] Add 5 nav buttons: Inicio, Sobre, Tratamentos, Depoimentos, Contato → IDs: `navInicio`, `navSobre`, `navTratamentos`, `navDepoimentos`, `navContato`
- [ ] Add hamburger button (mobile only) → ID: `hamburgerButton`
- [ ] Add mobile menu container (hidden by default) → ID: `mobileMenu`
- [ ] Add floating WhatsApp button (bottom-right) → ID: `whatsappFloat`

**Homepage sections (each needs an Anchor element above it):**

- [ ] **Hero section**: Full-width strip with background image, headline text, subtitle text, green CTA button linking to `https://wa.me/+5579996491276`
  - Anchor above → ID: `anchorHero`

- [ ] **Quem Sou section**: Two-column strip (photo left, text right). Text element for bio. Image elements for credentials.
  - Anchor above → ID: `anchorSobre`

- [ ] **Tratamentos section**: Strip containing a Repeater element → ID: `treatmentsRepeater`. Inside repeater item: text element `treatmentTitle`, text element `treatmentDesc`
  - Anchor above → ID: `anchorTratamentos`

- [ ] **Depoimentos section**: Strip containing a Repeater element → ID: `testimonialsRepeater`. Inside repeater item: text element `testimonialQuote`, text element `testimonialName`, text element `testimonialContext`
  - Anchor above → ID: `anchorDepoimentos`

- [ ] **Contato section**: Strip with WhatsApp button, email text, location text, credential badge images
  - Anchor above → ID: `anchorContato`

---

### Task 10: Configure mobile layout

Switch to Mobile Editor view and:
- [ ] Verify header collapses to hamburger menu
- [ ] Stack all sections vertically
- [ ] Treatment cards: single column, full width
- [ ] Testimonials: single column
- [ ] Font sizes readable (no overflow/clipping)
- [ ] WhatsApp float button visible and not overlapping content
- [ ] Hero CTA button full width
- [ ] Images properly sized

---

### Task 11: Run CMS seed and test

- [ ] Open site in Preview mode
- [ ] Run seed function from Velo dev console: `import { seedTratamentos, seedDepoimentos } from 'backend/seedContent.jsw'; seedTratamentos(); seedDepoimentos();`
- [ ] Verify treatments appear in repeater
- [ ] Verify testimonials appear in repeater
- [ ] Verify smooth-scroll navigation works
- [ ] Verify WhatsApp buttons work
- [ ] Verify SEO tags in page source (View → Developer Tools → Elements → `<head>`)
- [ ] Verify mobile layout

---

### Task 12: Publish and submit to Google

- [ ] Publish site from Wix Editor
- [ ] Go to Wix Dashboard → Marketing & SEO → SEO Tools
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt allows crawling

---

## Element ID Reference

All IDs that must be set in the editor for code to work:

| Element | ID | Location |
|---------|-----|----------|
| Brand name | `brandName` | Header (masterPage) |
| Nav: Inicio | `navInicio` | Header |
| Nav: Sobre | `navSobre` | Header |
| Nav: Tratamentos | `navTratamentos` | Header |
| Nav: Depoimentos | `navDepoimentos` | Header |
| Nav: Contato | `navContato` | Header |
| Hamburger button | `hamburgerButton` | Header (mobile) |
| Mobile menu | `mobileMenu` | Header (mobile) |
| WhatsApp float | `whatsappFloat` | masterPage (all pages) |
| Anchor: Hero | `anchorHero` | Homepage |
| Anchor: Sobre | `anchorSobre` | Homepage |
| Anchor: Tratamentos | `anchorTratamentos` | Homepage |
| Anchor: Depoimentos | `anchorDepoimentos` | Homepage |
| Anchor: Contato | `anchorContato` | Homepage |
| Treatments repeater | `treatmentsRepeater` | Homepage |
| Treatment title | `treatmentTitle` | Inside repeater item |
| Treatment description | `treatmentDesc` | Inside repeater item |
| Testimonials repeater | `testimonialsRepeater` | Homepage |
| Testimonial quote | `testimonialQuote` | Inside repeater item |
| Testimonial name | `testimonialName` | Inside repeater item |
| Testimonial context | `testimonialContext` | Inside repeater item |
