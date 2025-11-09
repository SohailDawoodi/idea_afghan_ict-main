class I18n {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    this.currentLang = urlLang || localStorage.getItem('language') || 'en';
    this.translations = {};
    this.rtlLanguages = ['fa', 'ps'];
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(`./assets/lang/${lang}.json`);
      this.translations[lang] = await response.json();
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
    }
  }

  async init() {
    await this.loadTranslations(this.currentLang);
    this.updateDirection();
    this.translatePage();
    this.updateLanguageSelector();
  }

  async changeLanguage(lang) {
    if (!this.translations[lang]) {
      await this.loadTranslations(lang);
    }
    
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updateDirection();
    this.translatePage();
    this.updateLanguageSelector();
  }

  updateDirection() {
    const html = document.documentElement;
    if (this.rtlLanguages.includes(this.currentLang)) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', this.currentLang);
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', this.currentLang);
    }
  }

  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        element.textContent = translation;
      }
    });
  }

  getTranslation(key) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return null;
      }
    }
    
    return translation;
  }

  updateLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    if (selector) {
      selector.value = this.currentLang;
    }
  }
}

const i18n = new I18n();