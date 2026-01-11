import { translations } from './translations.js';

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.init();
    }

    init() {
        this.updateDOM();
        this.setupEventListeners();
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            this.updateDOM();

            // Dispatch event for other components to listen to language changes
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        }
    }

    updateDOM() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.currentLang][key]) {
                // Determine if we should update text or placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) {
                        el.placeholder = translations[this.currentLang][key];
                    } else {
                        el.value = translations[this.currentLang][key];
                    }
                } else {
                    // Check if it's a link or button with an icon
                    const icon = el.querySelector('.material-symbols-outlined');
                    if (icon) {
                        // Find if there's a span or dedicated text container inside
                        const textContainer = el.querySelector('span:not(.material-symbols-outlined)');
                        if (textContainer) {
                            textContainer.innerHTML = translations[this.currentLang][key];
                        } else {
                            // Fallback: Preserve the icon and change only the text Node
                            const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                            if (textNodes.length > 0) {
                                textNodes[textNodes.length - 1].textContent = ` ${translations[this.currentLang][key]}`;
                            } else {
                                el.innerHTML = icon.outerHTML + ` ${translations[this.currentLang][key]}`;
                            }
                        }
                    } else {
                        el.innerHTML = translations[this.currentLang][key];
                    }
                }
            }
        });

        // Update current language text labels (for dropdowns)
        const currentLangLabels = document.querySelectorAll('.current-lang-text');
        currentLangLabels.forEach(label => {
            label.textContent = this.currentLang.toUpperCase();
        });

        // Update active state in switcher buttons
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('text-primary-accent');
                btn.classList.remove('text-white/70');
            } else {
                btn.classList.remove('text-primary-accent');
                btn.classList.add('text-white/70');
            }
        });

        // Update document lang attribute
        document.documentElement.lang = this.currentLang;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const langBtn = e.target.closest('.lang-btn');
            if (langBtn) {
                const lang = langBtn.getAttribute('data-lang');
                this.setLanguage(lang);
            }
        });
    }
}

export const i18n = new I18n();
