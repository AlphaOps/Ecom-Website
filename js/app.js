/**
 * Shuga Amrit - Minimalist Editorial Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL FADE ANIMATIONS
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 2. MOBILE MENU
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenuBtn && mobileNav) {
        closeMenuBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 3. MOBILE STICKY CTA (For Index Page)
    const mobileStickyCta = document.getElementById('mobileStickyCta');
    const heroSection = document.querySelector('.hero');
    
    if (mobileStickyCta && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            if (heroBottom < 0) {
                mobileStickyCta.classList.add('visible');
            } else {
                mobileStickyCta.classList.remove('visible');
            }
        });
    }

    // 4. FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if(header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(other => {
                    other.classList.remove('active');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 5. HERO THUMBNAIL LOGIC
    const heroMainImg = document.getElementById('heroImage');
    const heroMainVideo = document.getElementById('heroVideo');
    const thumbStripImgs = document.querySelectorAll('.thumb-strip img');
    
    if (thumbStripImgs.length > 0) {
        thumbStripImgs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbStripImgs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                if (thumb.dataset.type === 'video') {
                    if (heroMainImg) heroMainImg.style.display = 'none';
                    if (heroMainVideo) heroMainVideo.style.display = 'block';
                } else {
                    if (heroMainVideo) heroMainVideo.style.display = 'none';
                    if (heroMainImg) {
                        heroMainImg.style.display = 'block';
                        heroMainImg.style.opacity = '0';
                        setTimeout(() => {
                            heroMainImg.src = thumb.src;
                            heroMainImg.style.opacity = '1';
                        }, 50);
                    }
                }
            });
        });
    }

    // 6. VIDEO CAROUSEL MUTE TOGGLE
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        const muteBtn = card.querySelector('.video-overlay');
        const icon = card.querySelector('.video-overlay i');
        
        if (video && muteBtn) {
            muteBtn.addEventListener('click', () => {
                if (video.muted) {
                    video.muted = false;
                    icon.classList.remove('ri-volume-mute-fill');
                    icon.classList.add('ri-volume-up-fill');
                } else {
                    video.muted = true;
                    icon.classList.remove('ri-volume-up-fill');
                    icon.classList.add('ri-volume-mute-fill');
                }
            });
        }
    });

    // 7. CHECKOUT LOGIC
    // Highlight selected payment method
    const paymentOptions = document.querySelectorAll('.payment-option');
    if (paymentOptions.length > 0) {
        paymentOptions.forEach(option => {
            const input = option.querySelector('input[type="radio"]');
            if (input) {
                input.addEventListener('change', () => {
                    paymentOptions.forEach(opt => opt.classList.remove('selected'));
                    if (input.checked) option.classList.add('selected');
                });
            }
        });
    }

    if (document.getElementById('checkoutForm')) {
        const urlParams = new URLSearchParams(window.location.search);
        let plan = urlParams.get('plan') || 'combo';
        
        const planNameEl = document.getElementById('planName');
        const planPriceEl = document.getElementById('planPrice');
        const mrpPriceEl = document.getElementById('mrpPrice');
        const discountPriceEl = document.getElementById('discountPrice');
        const totalPriceEl = document.getElementById('totalPrice');
        const saveAmountEl = document.getElementById('saveAmount');
        const qtyEl = document.getElementById('qtyBadge');
        const pills = document.querySelectorAll('.shade-pill');

        const updateSummary = (selectedPlan) => {
            if (selectedPlan === 'combo') {
                if(planNameEl) planNameEl.textContent = 'कॉम्बो पॅक (३ बॉटल)';
                if(planPriceEl) planPriceEl.textContent = '₹१८००';
                if(mrpPriceEl) mrpPriceEl.textContent = '₹२९९७';
                if(discountPriceEl) discountPriceEl.textContent = '- ₹११९७';
                if(totalPriceEl) totalPriceEl.textContent = '₹१८००';
                if(saveAmountEl) saveAmountEl.textContent = '₹११९७';
                if(qtyEl) qtyEl.textContent = '३';
            } else {
                if(planNameEl) planNameEl.textContent = 'सिंगल पॅक';
                if(planPriceEl) planPriceEl.textContent = '₹७५०';
                if(mrpPriceEl) mrpPriceEl.textContent = '₹९९९';
                if(discountPriceEl) discountPriceEl.textContent = '- ₹२४९';
                if(totalPriceEl) totalPriceEl.textContent = '₹७५०';
                if(saveAmountEl) saveAmountEl.textContent = '₹२४९';
                if(qtyEl) qtyEl.textContent = '१';
            }
            
            pills.forEach(pill => {
                if(pill.dataset.plan === selectedPlan) {
                    pill.classList.add('active');
                } else {
                    pill.classList.remove('active');
                }
            });
        };

        updateSummary(plan);

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                updateSummary(pill.dataset.plan);
            });
        });

        // Form Submit & Payment Modal Logic
        const checkoutForm = document.getElementById('checkoutForm');
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const paymentMethodInput = document.querySelector('input[name="payment"]:checked');
            if (!paymentMethodInput) return;
            const paymentMethod = paymentMethodInput.value;
            
            if (paymentMethod === 'cod') {
                alert('तुमची ऑर्डर यशस्वीरित्या प्राप्त झाली आहे! लवकरच तुमच्याशी संपर्क साधला जाईल.');
                window.location.href = 'index.html';
            } else {
                // Show secure payment modal for UPI / Card
                const modal = document.getElementById('payment-modal');
                const loader = document.getElementById('payment-loader');
                const fakeForm = document.getElementById('payment-fake-form');
                const successMsg = document.getElementById('payment-success-msg');
                const modalAmount = document.getElementById('modal-amount');
                
                const upiUi = document.getElementById('upi-ui-section');
                const cardUi = document.getElementById('card-ui-section');
                
                if (totalPriceEl && modalAmount) {
                    modalAmount.textContent = totalPriceEl.textContent;
                }

                if (modal) {
                    modal.classList.add('active');
                    loader.style.display = 'block';
                    fakeForm.style.display = 'none';
                    successMsg.style.display = 'none';
                    
                    if(upiUi) upiUi.style.display = 'none';
                    if(cardUi) cardUi.style.display = 'none';

                    // Simulate loading gateway connection
                    setTimeout(() => {
                        loader.style.display = 'none';
                        fakeForm.style.display = 'block';
                        
                        // Show specific UI
                        if (paymentMethod === 'upi') {
                            if(upiUi) upiUi.style.display = 'block';
                        } else if (paymentMethod === 'card') {
                            if(cardUi) cardUi.style.display = 'block';
                        }
                    }, 1000);
                }
            }
        });

        // Modal interactions
        const modal = document.getElementById('payment-modal');
        const closeBtn = document.querySelector('.close-modal');
        const confirmPayBtn = document.getElementById('confirm-fake-pay');

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        }
        
        if (confirmPayBtn) {
            confirmPayBtn.addEventListener('click', () => {
                const fakeForm = document.getElementById('payment-fake-form');
                const successMsg = document.getElementById('payment-success-msg');
                
                // Show success
                if(fakeForm) fakeForm.style.display = 'none';
                if(successMsg) successMsg.style.display = 'block';
                
                // Redirect after success
                setTimeout(() => {
                    alert('तुमचे पेमेंट यशस्वी झाले आहे! धन्यवाद.');
                    window.location.href = 'index.html';
                }, 2000);
            });
        }
    }

});
