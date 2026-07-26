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
                if(mrpPriceEl) mrpPriceEl.textContent = '₹१४९९';
                if(discountPriceEl) discountPriceEl.textContent = '- ₹७४९';
                if(totalPriceEl) totalPriceEl.textContent = '₹७५०';
                if(saveAmountEl) saveAmountEl.textContent = '₹७४९';
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

        // Abandoned Cart & Auto-Save Logic
        class CheckoutAutoSaver {
            constructor() {
                this.webhookUrl = 'https://script.google.com/macros/s/AKfycbw2iDlEuCb17BuPOmYGEJWcfXYun2yS13uS1_j6tJM4ZyP_ZFTjVdB_oCzxcHWWXgyQYw/exec';
                this.lastSavedData = sessionStorage.getItem('lastSavedDraft') || '';
                
                this.draftId = sessionStorage.getItem('draftId');
                if (!this.draftId) {
                    this.draftId = 'draft_' + Math.random().toString(36).substring(2, 11);
                    sessionStorage.setItem('draftId', this.draftId);
                }

                this.isSaving = false;
                this.init();
            }

            getFormData(status = "Pending", reminder = "No") {
                const firstName = document.getElementById('firstName')?.value.trim() || '';
                const lastName = document.getElementById('lastName')?.value.trim() || '';
                const name = (firstName + ' ' + lastName).trim();
                const phone = document.getElementById('phone')?.value.trim() || '';
                const email = document.getElementById('email')?.value.trim() || '';
                const apt = document.getElementById('apt')?.value.trim() || '';
                const address = (document.getElementById('address')?.value.trim() || '') + (apt ? ', ' + apt : '');
                const city = document.getElementById('city')?.value.trim() || '';
                const pincode = document.getElementById('pincode')?.value.trim() || '';
                const product = document.getElementById('planName') ? document.getElementById('planName').textContent : 'Unknown';
                const amount = document.getElementById('totalPrice') ? document.getElementById('totalPrice').textContent.replace(/[^0-9]/g, '') : '0';
                
                const paymentMethodInput = document.querySelector('input[name="payment"]:checked');
                const payment = paymentMethodInput ? paymentMethodInput.value : '';

                return {
                    name, phone, email, address, city, pincode, product, amount, payment, status, reminder, draftId: this.draftId
                };
            }

            hasDataChanged(data) {
                // We only care if at least name, email or phone is present
                if (!data.name && !data.email && !data.phone) return false;
                const currentDataString = JSON.stringify(data);
                if (currentDataString !== this.lastSavedData) {
                    return currentDataString;
                }
                return false;
            }

            async fetchWithRetry(payload, retries = 3) {
                for (let i = 0; i < retries; i++) {
                    try {
                        const response = await fetch(this.webhookUrl, {
                            method: 'POST',
                            body: JSON.stringify(payload),
                            headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
                        });
                        // Allow opaque responses or successful responses
                        return true;
                    } catch (error) {
                        if (i === retries - 1) console.error('Webhook failed:', error);
                        await new Promise(res => setTimeout(res, 1000 * (i + 1))); // exponential backoff
                    }
                }
                return false;
            }

            async autoSave(force = false) {
                if (this.isSaving) return;
                const data = this.getFormData();
                const currentDataString = this.hasDataChanged(data);
                
                if (currentDataString || force) {
                    this.isSaving = true;
                    const success = await this.fetchWithRetry(data);
                    if (success) {
                        this.lastSavedData = currentDataString;
                        sessionStorage.setItem('lastSavedDraft', currentDataString);
                    }
                    this.isSaving = false;
                }
            }

            init() {
                // Listen to blur events on critical fields
                const triggers = ['firstName', 'lastName', 'email', 'phone'];
                triggers.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.addEventListener('blur', () => this.autoSave());
                    }
                });

                // Listen to changes on entire form
                const form = document.getElementById('checkoutForm');
                if (form) {
                    form.addEventListener('change', () => this.autoSave());
                }

                // Auto-save every 15 seconds
                setInterval(() => this.autoSave(), 15000);
            }
        }

        const autoSaver = new CheckoutAutoSaver();

        // Form Submit & Payment Modal Logic
        const checkoutForm = document.getElementById('checkoutForm');
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const paymentMethodInput = document.querySelector('input[name="payment"]:checked');
            if (!paymentMethodInput) return;
            const paymentMethod = paymentMethodInput.value;
            
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            
            // UI Feedback during submission
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line" style="display:inline-block; animation: spin 1s linear infinite; margin-right:8px;"></i> ऑर्डर प्रक्रियेत आहे...';
            if(formMessage) {
                formMessage.textContent = '';
                formMessage.style.color = '';
            }

            try {
                if (paymentMethod === 'cod') {
                    // Send final completed payload
                    const finalPayload = autoSaver.getFormData('Completed', 'Yes');
                    await autoSaver.fetchWithRetry(finalPayload);
                    
                    if(formMessage) {
                        formMessage.style.color = '#388e3c';
                        formMessage.textContent = 'Order placed successfully!';
                    }
                    checkoutForm.reset();
                    sessionStorage.removeItem('lastSavedDraft');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2500);
                } else {
                    // It's UPI or Card - Just ensure a draft is saved first
                    await autoSaver.autoSave(true);

                    // Show secure payment modal for UPI / Card
                    const modal = document.getElementById('payment-modal');
                    const loader = document.getElementById('payment-loader');
                    const fakeForm = document.getElementById('payment-fake-form');
                    const successMsg = document.getElementById('payment-success-msg');
                    const modalAmount = document.getElementById('modal-amount');
                    
                    const upiUi = document.getElementById('upi-ui-section');
                    const cardUi = document.getElementById('card-ui-section');
                    
                    const totalPriceEl = document.getElementById('totalPrice');
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
                            
                            if (paymentMethod === 'upi') {
                                if(upiUi) upiUi.style.display = 'block';
                            } else if (paymentMethod === 'card') {
                                if(cardUi) cardUi.style.display = 'block';
                            }
                        }, 1000);
                    }
                }
            } catch (error) {
                console.error('Error submitting order:', error);
                if(formMessage) {
                    formMessage.style.color = '#d32f2f';
                    formMessage.textContent = 'Unable to place your order. Please try again.';
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
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
            confirmPayBtn.addEventListener('click', async () => {
                const originalText = confirmPayBtn.textContent;
                confirmPayBtn.disabled = true;
                confirmPayBtn.textContent = 'Processing...';

                try {
                    // Send final completed payload after successful "payment"
                    const finalPayload = autoSaver.getFormData('Completed', 'Yes');
                    await autoSaver.fetchWithRetry(finalPayload);
                    sessionStorage.removeItem('lastSavedDraft');

                    const fakeForm = document.getElementById('payment-fake-form');
                    const successMsg = document.getElementById('payment-success-msg');
                    
                    if(fakeForm) fakeForm.style.display = 'none';
                    if(successMsg) successMsg.style.display = 'block';
                    
                    setTimeout(() => {
                        alert('तुमचे पेमेंट यशस्वी झाले आहे! धन्यवाद.');
                        window.location.href = 'index.html';
                    }, 2000);
                } catch(err) {
                    console.error(err);
                    alert('पेमेंट अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
                    confirmPayBtn.disabled = false;
                    confirmPayBtn.textContent = originalText;
                }
            });
        }
    }

});
