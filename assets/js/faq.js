
document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ JS loaded successfully');
    
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // ابتدا همه آیتم‌ها را ببند
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        const question = item.querySelector('.faq-question');
        
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        answer.classList.remove('active');
        answer.style.maxHeight = null;
    });
    
    // باز کردن اولین آیتم
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        const firstAnswer = firstItem.querySelector('.faq-answer');
        const firstQuestion = firstItem.querySelector('.faq-question');
        
        firstItem.classList.add('active');
        firstQuestion.setAttribute('aria-expanded', 'true');
        firstAnswer.classList.add('active');
        // استفاده از setTimeout برای اطمینان از رندر شدن
        setTimeout(() => {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }, 10);
    }
    
    // افزودن event listener به سوالات
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('FAQ clicked:', this.textContent);
            
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // بستن همه آیتم‌های دیگر
            faqItems.forEach(item => {
                if (item !== faqItem) {
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherQuestion = item.querySelector('.faq-question');
                    
                    item.classList.remove('active');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                }
            });
            
            // تغییر وضعیت آیتم فعلی
            if (isActive) {
                // بستن
                faqItem.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                // باز کردن
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
                
                // تنظیم ارتفاع با کمی تاخیر
                setTimeout(() => {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }, 10);
            }
        });
        
        // پشتیبانی از کیبورد
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ریست ارتفاع در هنگام تغییر سایز پنجره
    window.addEventListener('resize', function() {
        faqItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
