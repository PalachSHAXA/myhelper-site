// Language switcher functionality
let currentLang = 'ru';

function updateTranslations(lang) {
    if (!translations || !translations[lang]) {
        console.error('Translations not loaded for language:', lang);
        return;
    }

    const t = translations[lang];

    // Navigation
    document.querySelectorAll('[data-i18n="nav.about"]').forEach(el => el.textContent = t.nav.about);
    document.querySelectorAll('[data-i18n="nav.principles"]').forEach(el => el.textContent = t.nav.principles);
    document.querySelectorAll('[data-i18n="nav.tariffs"]').forEach(el => el.textContent = t.nav.tariffs);
    document.querySelectorAll('[data-i18n="nav.services"]').forEach(el => el.textContent = t.nav.services);
    document.querySelectorAll('[data-i18n="nav.staff"]').forEach(el => el.textContent = t.nav.staff);
    document.querySelectorAll('[data-i18n="nav.contacts"]').forEach(el => el.textContent = t.nav.contacts);

    // Hero section
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.textContent = t.hero.badge;

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.textContent = t.hero.description;

    const learnMoreBtn = document.querySelector('.hero-buttons .btn-primary');
    if (learnMoreBtn) learnMoreBtn.textContent = t.hero.learnMore;

    const contactBtn = document.querySelector('.hero-buttons .btn-secondary');
    if (contactBtn) contactBtn.textContent = t.hero.contact;

    // About section
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) aboutTitle.textContent = t.about.title;

    const aboutLead = document.querySelector('.about-text .lead');
    if (aboutLead) aboutLead.textContent = t.about.lead;

    const aboutDesc = document.querySelector('.about-text p:not(.lead)');
    if (aboutDesc) aboutDesc.textContent = t.about.description;

    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards[0]) {
        featureCards[0].querySelector('h3').textContent = t.about.feature1Title;
        featureCards[0].querySelector('p').textContent = t.about.feature1Desc;
    }
    if (featureCards[1]) {
        featureCards[1].querySelector('h3').textContent = t.about.feature2Title;
        featureCards[1].querySelector('p').textContent = t.about.feature2Desc;
    }
    if (featureCards[2]) {
        featureCards[2].querySelector('h3').textContent = t.about.feature3Title;
        featureCards[2].querySelector('p').textContent = t.about.feature3Desc;
    }
    if (featureCards[3]) {
        featureCards[3].querySelector('h3').textContent = t.about.feature4Title;
        featureCards[3].querySelector('p').textContent = t.about.feature4Desc;
    }

    // Principles section
    const principlesTitle = document.querySelector('#principles .section-title');
    if (principlesTitle) principlesTitle.textContent = t.principles.title;

    const principleCards = document.querySelectorAll('.principle-card');
    if (principleCards[0]) {
        principleCards[0].querySelector('h3').textContent = t.principles.principle1Title;
        principleCards[0].querySelector('p').textContent = t.principles.principle1Desc;
    }
    if (principleCards[1]) {
        principleCards[1].querySelector('h3').textContent = t.principles.principle2Title;
        principleCards[1].querySelector('p').textContent = t.principles.principle2Desc;
    }
    if (principleCards[2]) {
        principleCards[2].querySelector('h3').textContent = t.principles.principle3Title;
        principleCards[2].querySelector('p').textContent = t.principles.principle3Desc;
    }
    if (principleCards[3]) {
        principleCards[3].querySelector('h3').textContent = t.principles.principle4Title;
        principleCards[3].querySelector('p').textContent = t.principles.principle4Desc;
    }
    if (principleCards[4]) {
        principleCards[4].querySelector('h3').textContent = t.principles.principle5Title;
        principleCards[4].querySelector('p').textContent = t.principles.principle5Desc;
    }
    if (principleCards[5]) {
        principleCards[5].querySelector('h3').textContent = t.principles.principle6Title;
        principleCards[5].querySelector('p').textContent = t.principles.principle6Desc;
    }
    if (principleCards[6]) {
        principleCards[6].querySelector('h3').textContent = t.principles.principle7Title;
        principleCards[6].querySelector('p').textContent = t.principles.principle7Desc;
    }

    // Tariffs section
    const tariffsTitle = document.querySelector('#tariffs .section-title');
    if (tariffsTitle) tariffsTitle.textContent = t.tariffs.title;

    const tariffBadge = document.querySelector('.tariff-badge');
    if (tariffBadge) {
        tariffBadge.innerHTML = `<span class="badge-icon">💡</span> ${t.tariffs.badge}`;
    }

    const tariffBoxes = document.querySelectorAll('.tariff-box');
    if (tariffBoxes[0]) {
        tariffBoxes[0].querySelector('h3').textContent = t.tariffs.residential;
        tariffBoxes[0].querySelector('.price-label').textContent = t.tariffs.byAgreement;
        const features = tariffBoxes[0].querySelectorAll('.tariff-features li');
        if (features[0]) features[0].innerHTML = `<span class="check">✓</span> ${t.tariffs.residentialFeature1}`;
        if (features[1]) features[1].innerHTML = `<span class="check">✓</span> ${t.tariffs.residentialFeature2}`;
        if (features[2]) features[2].innerHTML = `<span class="check">✓</span> ${t.tariffs.residentialFeature3}`;
        if (features[3]) features[3].innerHTML = `<span class="check">✓</span> ${t.tariffs.residentialFeature4}`;
        if (features[4]) features[4].innerHTML = `<span class="check">✓</span> ${t.tariffs.residentialFeature5}`;
    }
    if (tariffBoxes[1]) {
        const popularBadge = tariffBoxes[1].querySelector('.popular-badge');
        if (popularBadge) popularBadge.textContent = t.tariffs.popular;
        tariffBoxes[1].querySelector('h3').textContent = t.tariffs.commercial;
        tariffBoxes[1].querySelector('.price-label').textContent = t.tariffs.individual;
        const features = tariffBoxes[1].querySelectorAll('.tariff-features li');
        if (features[0]) features[0].innerHTML = `<span class="check">✓</span> ${t.tariffs.commercialFeature1}`;
        if (features[1]) features[1].innerHTML = `<span class="check">✓</span> ${t.tariffs.commercialFeature2}`;
        if (features[2]) features[2].innerHTML = `<span class="check">✓</span> ${t.tariffs.commercialFeature3}`;
        if (features[3]) features[3].innerHTML = `<span class="check">✓</span> ${t.tariffs.commercialFeature4}`;
        if (features[4]) features[4].innerHTML = `<span class="check">✓</span> ${t.tariffs.commercialFeature5}`;
    }

    const importantNote = document.querySelector('.important-note p');
    if (importantNote) {
        importantNote.innerHTML = `<strong>${t.tariffs.important}</strong> ${t.tariffs.importantNote}`;
    }

    // Services section
    const servicesTitle = document.querySelector('#services .section-title');
    if (servicesTitle) servicesTitle.textContent = t.services.title;

    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems[0]) {
        serviceItems[0].querySelector('h3').textContent = t.services.service1Title;
        serviceItems[0].querySelector('p').textContent = t.services.service1Desc;
    }
    if (serviceItems[1]) {
        serviceItems[1].querySelector('h3').textContent = t.services.service2Title;
        serviceItems[1].querySelector('p').textContent = t.services.service2Desc;
    }
    if (serviceItems[2]) {
        serviceItems[2].querySelector('h3').textContent = t.services.service3Title;
        serviceItems[2].querySelector('p').textContent = t.services.service3Desc;
    }
    if (serviceItems[3]) {
        serviceItems[3].querySelector('h3').textContent = t.services.service4Title;
        serviceItems[3].querySelector('p').textContent = t.services.service4Desc;
    }

    const servicesNote = document.querySelector('.services-note');
    if (servicesNote) servicesNote.textContent = t.services.note;

    // Staff section
    const staffTitle = document.querySelector('#staff .section-title');
    if (staffTitle) staffTitle.textContent = t.staff.title;

    const staffCategories = document.querySelectorAll('.staff-category');
    if (staffCategories[0]) {
        staffCategories[0].querySelector('h3').textContent = t.staff.administration;
        const items = staffCategories[0].querySelectorAll('.staff-item .role');
        if (items[0]) items[0].textContent = t.staff.director;
        if (items[1]) items[1].textContent = t.staff.accountant;
        if (items[2]) items[2].textContent = t.staff.managers;
    }
    if (staffCategories[1]) {
        staffCategories[1].querySelector('h3').textContent = t.staff.engineering;
        const items = staffCategories[1].querySelectorAll('.staff-item .role');
        if (items[0]) items[0].textContent = t.staff.plumbers;
        if (items[1]) items[1].textContent = t.staff.electricians;
    }
    if (staffCategories[2]) {
        staffCategories[2].querySelector('h3').textContent = t.staff.service;
        const items = staffCategories[2].querySelectorAll('.staff-item .role');
        if (items[0]) items[0].textContent = t.staff.cleaning;
        if (items[1]) items[1].textContent = t.staff.security;
        if (items[2]) items[2].textContent = t.staff.gardeners;
        if (items[3]) items[3].textContent = t.staff.workers;
    }

    const scheduleTitle = document.querySelector('.schedule-info h3');
    if (scheduleTitle) scheduleTitle.textContent = t.staff.scheduleTitle;

    const scheduleItems = document.querySelectorAll('.schedule-item');
    if (scheduleItems[0]) {
        scheduleItems[0].querySelector('strong').textContent = t.staff.engineeringSchedule;
        scheduleItems[0].querySelector('p').textContent = t.staff.engineeringScheduleDesc;
    }
    if (scheduleItems[1]) {
        scheduleItems[1].querySelector('strong').textContent = t.staff.cleaningSchedule;
        scheduleItems[1].querySelector('p').textContent = t.staff.cleaningScheduleDesc;
    }
    if (scheduleItems[2]) {
        scheduleItems[2].querySelector('strong').textContent = t.staff.winterSchedule;
        scheduleItems[2].querySelector('p').textContent = t.staff.winterScheduleDesc;
    }

    // Contacts section
    const contactsTitle = document.querySelector('#contacts .section-title');
    if (contactsTitle) contactsTitle.textContent = t.contacts.title;

    const contactFeatures = document.querySelectorAll('.contact-feature h3');
    if (contactFeatures[0]) contactFeatures[0].textContent = t.contacts.feature1;
    if (contactFeatures[1]) contactFeatures[1].textContent = t.contacts.feature2;
    if (contactFeatures[2]) contactFeatures[2].textContent = t.contacts.feature3;

    const contactInfoTitle = document.querySelector('.contact-info h3');
    if (contactInfoTitle) contactInfoTitle.textContent = t.contacts.contactUs;

    // CTA section
    const ctaTitle = document.querySelector('.cta-content h2');
    if (ctaTitle) ctaTitle.textContent = t.cta.title;

    const ctaDescription = document.querySelector('.cta-content > p');
    if (ctaDescription) ctaDescription.textContent = t.cta.description;

    const ctaButton = document.querySelector('.cta-content .btn');
    if (ctaButton) ctaButton.textContent = t.cta.button;

    const ctaTagline = document.querySelector('.cta-tagline h3');
    if (ctaTagline) ctaTagline.textContent = t.cta.tagline;

    // Footer
    const footerDesc = document.querySelector('.footer-brand p');
    if (footerDesc) footerDesc.textContent = t.footer.description;

    const footerNavTitle = document.querySelector('.footer-links h4');
    if (footerNavTitle) footerNavTitle.textContent = t.footer.navigation;

    const footerNavLinks = document.querySelectorAll('.footer-links a');
    if (footerNavLinks[0]) footerNavLinks[0].textContent = t.nav.about;
    if (footerNavLinks[1]) footerNavLinks[1].textContent = t.nav.principles;
    if (footerNavLinks[2]) footerNavLinks[2].textContent = t.nav.tariffs;
    if (footerNavLinks[3]) footerNavLinks[3].textContent = t.nav.services;

    const footerContactTitle = document.querySelector('.footer-contact h4');
    if (footerContactTitle) footerContactTitle.textContent = t.footer.contactsTitle;

    const footerAvailable = document.querySelector('.footer-contact p:last-child');
    if (footerAvailable) footerAvailable.textContent = t.footer.available;

    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) {
        const year = new Date().getFullYear();
        footerCopyright.innerHTML = `&copy; ${year} ${t.footer.copyright}`;
    }

    console.log('Language changed to:', lang);
}

function setLanguage(lang) {
    currentLang = lang;

    // Update active button
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update all translatable elements
    updateTranslations(lang);

    // Save to localStorage
    localStorage.setItem('language', lang);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get current language from localStorage or default to 'ru'
    currentLang = localStorage.getItem('language') || 'ru';

    // Initialize language
    setLanguage(currentLang);

    // Language switcher buttons
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});
