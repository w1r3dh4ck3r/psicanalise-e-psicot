import wixLocationFrontend from 'wix-location-frontend';

$w.onReady(function () {
    // ── Smooth-scroll navigation ──
    // Each nav button scrolls to its corresponding anchor element.
    // Element IDs must be set in the Wix Editor.
    const navMap = {
        '#navInicio': '#anchorHero',
        '#navSobre': '#anchorSobre',
        '#navTratamentos': '#anchorTratamentos',
        '#navDepoimentos': '#anchorDepoimentos',
        '#navContato': '#anchorContato'
    };

    Object.entries(navMap).forEach(([navId, anchorId]) => {
        try {
            $w(navId).onClick(() => {
                $w(anchorId).scrollTo();
                closeMobileMenu();
            });
        } catch (e) {
            // Element may not exist yet if editor setup is incomplete
        }
    });

    // ── Floating WhatsApp button ──
    try {
        $w('#whatsappFloat').onClick(() => {
            wixLocationFrontend.to('https://wa.me/+5579996491276');
        });
    } catch (e) {
        // Element not yet created in editor
    }

    // ── Mobile hamburger menu toggle ──
    try {
        $w('#hamburgerButton').onClick(() => {
            if ($w('#mobileMenu').hidden) {
                $w('#mobileMenu').show('fade');
            } else {
                $w('#mobileMenu').hide('fade');
            }
        });
    } catch (e) {
        // Element not yet created in editor
    }
});

function closeMobileMenu() {
    try {
        if (!$w('#mobileMenu').hidden) {
            $w('#mobileMenu').hide('fade');
        }
    } catch (e) {
        // Mobile menu not yet created
    }
}
