class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.messageContainer = document.getElementById('form-message');
        this.submitBtn = document.getElementById('submit-btn');
        this.backendUrl = 'http://localhost/contact-form/contact_submit.php';
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        // Add event listener
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.addRealTimeValidation();
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
                    message = 'Name must be at least 2 characters';
                } else if (value.length > 100) {
                    isValid = false;
                    message = 'Name cannot exceed 100 characters';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid phone number';
                }
                break;
                
            case 'subject':
                if (value.length < 3) {
                    isValid = false;
                    message = 'Subject must be at least 3 characters';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    message = 'Message must be at least 10 characters';
                } else if (value.length > 2000) {
                    isValid = false;
                    message = 'Message cannot exceed 2000 characters';
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
        
        field.classList.add('border-red-500');
        field.classList.remove('border-alpha-light', 'dark:border-alpha-dark');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500');
        field.classList.add('border-alpha-light', 'dark:border-alpha-dark');
        
        const existingError = field.parentNode.querySelector('.text-red-500');
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
            this.showSweetAlert('error', 'Please fill all required fields correctly');
            return;
        }

        // Show loading
        this.setFormLoading(true);
        
        try {
            // Prepare form data
            const formData = {
                name: this.form.querySelector('[name="name"]').value.trim(),
                email: this.form.querySelector('[name="email"]').value.trim(),
                phone: this.form.querySelector('[name="phone"]').value.trim(),
                subject: this.form.querySelector('[name="subject"]').value.trim(),
                message: this.form.querySelector('[name="message"]').value.trim()
            };
            
            // Send AJAX request
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showSweetAlert('success', result.message, result.tracking_id);
                this.form.reset();
            } else {
                this.showSweetAlert('error', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            this.showSweetAlert('error', 'Connection error. Please try again.');
        } finally {
            this.setFormLoading(false);
        }
    }

    setFormLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<i class="lni lni-spinner lni-spin mr-2"></i> Sending...';
            this.submitBtn.classList.add('opacity-70');
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = 'Send Message <i class="lni lni-arrow-right ml-2"></i>';
            this.submitBtn.classList.remove('opacity-70');
        }
    }

    showSweetAlert(type, message, trackingId = null) {
        if (type === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                html: trackingId 
                    ? `${message}<br><br><strong>Tracking ID:</strong> ${trackingId}`
                    : message,
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981',
                timer: 5000,
                timerProgressBar: true,
                customClass: {
                    popup: 'animate__animated animate__fadeIn'
                }
            });
        } else if (type === 'error') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: message,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444',
                customClass: {
                    popup: 'animate__animated animate__shakeX'
                }
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});