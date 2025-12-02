

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.style.maxHeight = '0';
                    q.nextElementSibling.style.padding = '0';
                }
            });
            
            // Toggle current FAQ item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
                answer.style.padding = '0';
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 2rem 1.5rem';
                
                // Smooth scroll to ensure the entire answer is visible
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
        
        // Keyboard navigation support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation between FAQ items
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextItem = this.closest('.faq-item').nextElementSibling;
                if (nextItem) {
                    nextItem.querySelector('.faq-question').focus();
                }
            }
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevItem = this.closest('.faq-item').previousElementSibling;
                if (prevItem) {
                    prevItem.querySelector('.faq-question').focus();
                }
            }
        });
    });
    
    // Auto-expand first FAQ item on page load
    if (faqQuestions.length > 0) {
        faqQuestions[0].setAttribute('aria-expanded', 'true');
        const firstAnswer = faqQuestions[0].nextElementSibling;
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        firstAnswer.style.padding = '0 2rem 1.5rem';
    }
});
