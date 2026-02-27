import wixSeoFrontend from 'wix-seo-frontend';
import wixData from 'wix-data';

$w.onReady(function () {
    setupSeo();
    loadTratamentos();
    loadDepoimentos();
});

// ── SEO: meta tags, Open Graph, structured data ──

function setupSeo() {
    wixSeoFrontend.setTitle(
        'Karoline Jangola | Psicanalista e Psicoterapeuta em Aracaju e Vila Velha'
    );

    wixSeoFrontend.setMetaTags([
        {
            name: 'description',
            content: 'Psicanalise e psicoterapia humanizada para criancas, adolescentes e adultos. Atendimento presencial em Aracaju-SE e Vila Velha-ES, e online para todo o Brasil.'
        },
        {
            property: 'og:title',
            content: 'Karoline Jangola | Psicanalista e Psicoterapeuta'
        },
        {
            property: 'og:description',
            content: 'Terapia humanizada para criancas, adolescentes e adultos. Aracaju-SE, Vila Velha-ES e online.'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:url',
            content: 'https://www.karolinejangola.com'
        }
    ]);

    wixSeoFrontend.setStructuredData([
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Karoline Jangola — Psicanalista e Psicoterapeuta",
            "description": "Psicanalise e psicoterapia humanizada para criancas, adolescentes e adultos.",
            "url": "https://www.karolinejangola.com",
            "telephone": "+55 79 99649-1276",
            "email": "karoljangola@gmail.com",
            "priceRange": "$$",
            "address": [
                {
                    "@type": "PostalAddress",
                    "addressLocality": "Aracaju",
                    "addressRegion": "SE",
                    "addressCountry": "BR"
                },
                {
                    "@type": "PostalAddress",
                    "addressLocality": "Vila Velha",
                    "addressRegion": "ES",
                    "addressCountry": "BR"
                }
            ],
            "areaServed": {
                "@type": "Country",
                "name": "Brasil"
            },
            "sameAs": [
                "https://www.karolinejangola.com"
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Karoline Jangola — Psicanalista e Psicoterapeuta",
            "serviceType": ["Psicanalise", "Psicoterapia", "Terapia de Casais", "Terapia Infantil"],
            "provider": {
                "@type": "Person",
                "name": "Karoline Jangola",
                "jobTitle": "Psicanalista e Psicoterapeuta"
            }
        }
    ]);
}

// ── Load treatments from CMS into repeater ──

function loadTratamentos() {
    try {
        $w('#treatmentsRepeater').onItemReady(($item, itemData) => {
            $item('#treatmentTitle').text = itemData.title;
            $item('#treatmentDesc').text = itemData.description;
        });

        wixData.query('Tratamentos')
            .ascending('order')
            .find()
            .then((results) => {
                if (results.totalCount > 0) {
                    $w('#treatmentsRepeater').data = results.items;
                }
            })
            .catch((err) => {
                console.error('Failed to load treatments:', err);
            });
    } catch (e) {
        // Repeater not yet created in editor
    }
}

// ── Load testimonials from CMS into repeater ──

function loadDepoimentos() {
    try {
        $w('#testimonialsRepeater').onItemReady(($item, itemData) => {
            $item('#testimonialQuote').text = itemData.quote;
            $item('#testimonialName').text = itemData.clientName;
            $item('#testimonialContext').text = itemData.context;
        });

        wixData.query('Depoimentos')
            .ascending('order')
            .find()
            .then((results) => {
                if (results.totalCount > 0) {
                    $w('#testimonialsRepeater').data = results.items;
                }
            })
            .catch((err) => {
                console.error('Failed to load testimonials:', err);
            });
    } catch (e) {
        // Repeater not yet created in editor
    }
}
