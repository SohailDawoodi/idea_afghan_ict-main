class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.messageContainer = document.getElementById('form-message');
        this.csrfToken = this.generateCSRFToken();
        this.init();
    }

    init() {
        if (!this.form) return;

        // Add CSRF token to form
        this.addCSRFField();
        
        // Add event listener
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.addRealTimeValidation();
    }

    generateCSRFToken() {
        return 'csrf_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    addCSRFField() {
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrf_token';
        csrfInput.value = this.csrfToken;
        this.form.appendChild(csrfInput);
        
        // Store in session storage for validation
        sessionStorage.setItem('csrf_token', this.csrfToken);
    }

    addRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let message = '';

        switch(fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    message = 'نام باید حداقل ۲ کاراکتر باشد';
                } else if (value.length > 100) {
                    isValid = false;
                    message = 'نام نمی‌تواند بیش از ۱۰۰ کاراکتر باشد';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'ایمیل وارد شده معتبر نیست';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    message = 'شماره تلفن معتبر نیست';
                }
                break;
                
            case 'subject':
                if (value.length < 3) {
                    isValid = false;
                    message = 'موضوع باید حداقل ۳ کاراکتر باشد';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    message = 'پیام باید حداقل ۱۰ کاراکتر باشد';
                } else if (value.length > 2000) {
                    isValid = false;
                    message = 'پیام نمی‌تواند بیش از ۲۰۰۰ کاراکتر باشد';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, message);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 13px;
            margin-top: 5px;
            padding-right: 5px;
        `;
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showMessage('لطفا فیلدهای ضروری را به درستی پر کنید', 'error');
            return;
        }

        // Disable form and show loading
        this.setFormLoading(true);
        
        try {
            const formData = new FormData(this.form);
            
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showMessage(result.message, 'success');
                this.form.reset();
                
                // Show tracking ID
                if (result.tracking_id) {
                    setTimeout(() => {
                        this.showMessage(`شماره پیگیری: ${result.tracking_id}`, 'info');
                    }, 2000);
                }
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showMessage('خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.', 'error');
        } finally {
            this.setFormLoading(false);
        }
    }

    setFormLoading(isLoading) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="lni lni-spinner lni-spin"></i> در حال ارسال...';
            this.form.classList.add('form-loading');
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'ارسال پیام <i class="lni lni-arrow-left"></i>';
            this.form.classList.remove('form-loading');
        }
    }

    showMessage(message, type = 'info') {
        if (!this.messageContainer) return;
        
        this.messageContainer.textContent = message;
        this.messageContainer.className = `form-message ${type}`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.messageContainer.style.display = 'none';
            }, 5000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});