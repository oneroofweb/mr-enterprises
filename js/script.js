document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. HERO SLIDER (AUTOPLAY + ARROWS + DOTS)
    // ----------------------------------------------------
    const heroSlider = () => {
        const slides = document.querySelectorAll('[data-hero-slide]');
        const dots = document.querySelectorAll('[data-hero-dot]');
        const prevBtn = document.querySelector('[data-hero-prev]');
        const nextBtn = document.querySelector('[data-hero-next]');
        if (!slides.length) return;

        let currentIndex = 0;
        let slideInterval = null;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0', 'pointer-events-none');
                    slide.classList.add('opacity-100');
                } else {
                    slide.classList.remove('opacity-100');
                    slide.classList.add('opacity-0', 'pointer-events-none');
                }
            });

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('bg-white/50');
                    dot.classList.add('bg-white', 'w-8');
                } else {
                    dot.classList.remove('bg-white', 'w-8');
                    dot.classList.add('bg-white/50', 'w-2.5');
                }
            });

            currentIndex = index;
        };

        const nextSlide = () => {
            const next = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            showSlide(next);
        };

        const prevSlide = () => {
            const prev = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            showSlide(prev);
        };

        const startAutoplay = () => {
            if (slides.length > 1) {
                slideInterval = setInterval(nextSlide, 5000);
            }
        };

        const resetAutoplay = () => {
            clearInterval(slideInterval);
            startAutoplay();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                resetAutoplay();
            });
        });

        showSlide(0);
        startAutoplay();
    };

    // ----------------------------------------------------
    // 2. MOBILE MENU TOGGLE
    // ----------------------------------------------------
    // ----------------------------------------------------
    // 2. MOBILE MENU OVERLAY & TOP DRAWER CONTROLLER
    // ----------------------------------------------------
    const mobileMenu = () => {
        const toggleBtn = document.querySelector('[data-mobile-menu-toggle]');
        const menu = document.querySelector('[data-mobile-menu]');
        const backdrop = document.querySelector('[data-mobile-menu-backdrop]');
        const panel = document.querySelector('[data-mobile-menu-panel]');
        const closeBtn = document.querySelector('[data-mobile-menu-close]');
        const openIcon = document.querySelector('[data-mobile-menu-open-icon]');
        const closeIcon = document.querySelector('[data-mobile-menu-close-icon]');
        const menuLinks = document.querySelectorAll('[data-mobile-menu-link]');

        if (!toggleBtn || !menu) return;

        let isOpen = false;
        let animTimer = null;

        const openMenu = () => {
            if (isOpen) return;
            isOpen = true;
            if (animTimer) clearTimeout(animTimer);

            // Reveal overlay
            menu.classList.remove('hidden');
            menu.removeAttribute('hidden');
            toggleBtn.setAttribute('aria-expanded', 'true');
            if (openIcon) openIcon.classList.add('hidden');
            if (closeIcon) closeIcon.classList.remove('hidden');

            // Lock body scroll so background content & hero slider remain stationary
            document.body.classList.add('overflow-hidden');

            // Trigger slide down & backdrop fade in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (backdrop) {
                        backdrop.classList.remove('opacity-0');
                        backdrop.classList.add('opacity-100');
                    }
                    if (panel) {
                        panel.classList.remove('-translate-y-full');
                        panel.classList.add('translate-y-0');
                    }
                });
            });
        };

        const closeMenu = () => {
            if (!isOpen) return;
            isOpen = false;
            if (animTimer) clearTimeout(animTimer);

            toggleBtn.setAttribute('aria-expanded', 'false');
            if (openIcon) openIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');

            // Animate out
            if (backdrop) {
                backdrop.classList.remove('opacity-100');
                backdrop.classList.add('opacity-0');
            }
            if (panel) {
                panel.classList.remove('translate-y-0');
                panel.classList.add('-translate-y-full');
            }

            // Unlock body scroll
            document.body.classList.remove('overflow-hidden');

            // Hide element from DOM accessibility tree once animation finishes
            animTimer = setTimeout(() => {
                if (!isOpen) {
                    menu.classList.add('hidden');
                    menu.setAttribute('hidden', '');
                }
            }, 300);
        };

        // Header Hamburger Toggle Button
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Dedicated Top "Close" Button inside Menu Drawer
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        // Clicking Backdrop closes the menu
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                closeMenu();
            });
        }

        // Clicking any navigation link closes the drawer and allows smooth navigation
        menuLinks.forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        });

        // Auto close if screen is resized to desktop viewport
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && isOpen) {
                closeMenu();
            }
        });
    };

    // ----------------------------------------------------
    // 3. BRAND TABS FILTER
    // ----------------------------------------------------
    const brandTabs = () => {
        const tabBtns = document.querySelectorAll('[data-brand-tab]');
        const productItems = document.querySelectorAll('[data-product-brand]');

        if (!tabBtns.length || !productItems.length) return;

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetBrand = btn.getAttribute('data-brand-tab');

                // Update active state of buttons
                tabBtns.forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
                    b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
                });
                btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
                btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');

                // Filter products
                productItems.forEach(item => {
                    const itemBrand = item.getAttribute('data-product-brand');
                    if (targetBrand === 'all' || itemBrand === targetBrand) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    };

    // ----------------------------------------------------
    // 4. LIVE PRODUCT SEARCH FILTER
    // ----------------------------------------------------
    const liveSearch = () => {
        const searchInputs = document.querySelectorAll('input[name="search"]');
        const productItems = document.querySelectorAll('[data-product-brand]');
        if (!searchInputs.length || !productItems.length) return;

        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const query = e.target.value.trim().toLowerCase();
                if (!query) {
                    productItems.forEach(item => item.style.display = 'block');
                    return;
                }

                productItems.forEach(item => {
                    const title = (item.getAttribute('data-product-title') || '').toLowerCase();
                    const brand = (item.getAttribute('data-product-brand') || '').toLowerCase();
                    const category = (item.getAttribute('data-product-category') || '').toLowerCase();

                    if (title.includes(query) || brand.includes(query) || category.includes(query)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    };

    // ----------------------------------------------------
    // 5. HORIZONTAL PRODUCT SLIDER CONTROLS
    // ----------------------------------------------------
    const productSliderControls = () => {
        const slider = document.querySelector('[data-product-slider]');
        const prevBtn = document.querySelector('[data-slider-prev]');
        const nextBtn = document.querySelector('[data-slider-next]');

        if (!slider) return;

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                slider.scrollBy({ left: -320, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                slider.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }
    };

    // ----------------------------------------------------
    // 6. QUICK VIEW MODAL WITH WHATSAPP PRE-FILL
    // ----------------------------------------------------
    const quickViewModal = () => {
        const modal = document.getElementById('quick-view-modal');
        if (!modal) return;

        const closeBtn = modal.querySelector('[data-modal-close]');
        const backdrop = modal.querySelector('[data-modal-backdrop]');
        const modalImg = modal.querySelector('[data-modal-img]');
        const modalTitle = modal.querySelector('[data-modal-title]');
        const modalBrand = modal.querySelector('[data-modal-brand]');
        const modalCategory = modal.querySelector('[data-modal-category]');
        const modalPrice = modal.querySelector('[data-modal-price]');
        const modalMrp = modal.querySelector('[data-modal-mrp]');
        const modalSpecs = modal.querySelector('[data-modal-specs]');
        const modalQty = modal.querySelector('[data-modal-qty]');
        const qtyMinus = modal.querySelector('[data-qty-minus]');
        const qtyPlus = modal.querySelector('[data-qty-plus]');
        const modalWhatsAppBtn = modal.querySelector('[data-modal-wa-btn]');

        let currentQty = 1;
        let currentItemName = '';
        let currentItemPrice = '';

        const updateWhatsAppLink = () => {
            if (!modalWhatsAppBtn) return;
            const phone = "919648505055";
            const text = `Hello MR Enterprises, I want to order:\n\n*Product:* ${currentItemName}\n*Price:* ${currentItemPrice}\n*Quantity:* ${currentQty} units\n\nPlease confirm availability and delivery to Lucknow.`;
            modalWhatsAppBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        };

        const openModal = (card) => {
            currentItemName = card.getAttribute('data-product-title') || 'Product';
            currentItemPrice = card.getAttribute('data-product-price') || '₹0';
            const brand = card.getAttribute('data-product-brand') || '';
            const category = card.getAttribute('data-product-category') || '';
            const mrp = card.getAttribute('data-product-mrp') || '';
            const img = card.querySelector('img')?.src || '';
            const specs = card.getAttribute('data-product-specs') || '100% Genuine Manufacturer Covered Product';

            currentQty = 1;
            if (modalQty) modalQty.textContent = currentQty;

            if (modalImg) modalImg.src = img;
            if (modalTitle) modalTitle.textContent = currentItemName;
            if (modalBrand) modalBrand.textContent = brand.toUpperCase();
            if (modalCategory) modalCategory.textContent = category;
            if (modalPrice) modalPrice.textContent = currentItemPrice;
            if (modalMrp) modalMrp.textContent = mrp;
            if (modalSpecs) modalSpecs.textContent = specs;

            updateWhatsAppLink();

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        document.querySelectorAll('[data-quick-view-btn]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('[data-product-card]');
                if (card) openModal(card);
            });
        });

        if (modalWhatsAppBtn) {
            modalWhatsAppBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal();
                if (typeof window.openUpiPaymentModal === 'function') {
                    window.openUpiPaymentModal({
                        title: currentItemName,
                        price: currentItemPrice,
                        qty: currentQty,
                        img: modalImg ? modalImg.src : ''
                    });
                }
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        if (qtyPlus) {
            qtyPlus.addEventListener('click', () => {
                currentQty++;
                if (modalQty) modalQty.textContent = currentQty;
                updateWhatsAppLink();
            });
        }

        if (qtyMinus) {
            qtyMinus.addEventListener('click', () => {
                if (currentQty > 1) {
                    currentQty--;
                    if (modalQty) modalQty.textContent = currentQty;
                    updateWhatsAppLink();
                }
            });
        }
    };

    // ----------------------------------------------------
    // 7. CARD INLINE QUANTITY SELECTOR & INSTANT PAYMENT MODAL
    // ----------------------------------------------------
    const cardQuantityController = () => {
        document.querySelectorAll('[data-product-card]').forEach(card => {
            const minusBtn = card.querySelector('[data-card-qty-minus]');
            const plusBtn = card.querySelector('[data-card-qty-plus]');
            const input = card.querySelector('[data-card-qty-input]');
            const orderBtn = card.querySelector('[data-card-order-btn]');
            if (!minusBtn || !plusBtn || !input || !orderBtn) return;

            const title = card.getAttribute('data-product-title') || 'Product';
            const price = card.getAttribute('data-product-price') || '';

            const updateOrderLink = (qty) => {
                const phone = "919648505055";
                const text = `Hello MR Enterprises,\n\n*New Order Details:*\n• *Product:* ${title}\n• *Quantity:* ${qty}\n• *Price:* ${price}\n\nPlease confirm availability & delivery.`;
                orderBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
            };

            let qty = parseInt(input.value, 10) || 1;

            plusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                qty++;
                input.value = qty;
                updateOrderLink(qty);
            });

            minusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (qty > 1) {
                    qty--;
                    input.value = qty;
                    updateOrderLink(qty);
                }
            });

            // Intercept Order Now click to open UPI Payment Modal
            orderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentQty = parseInt(input.value, 10) || 1;
                const img = card.querySelector('img')?.src || '';
                if (typeof window.openUpiPaymentModal === 'function') {
                    window.openUpiPaymentModal({
                        title,
                        price,
                        qty: currentQty,
                        img
                    });
                }
            });
        });
    };

    // ----------------------------------------------------
    // 8. DIRECT UPI PAYMENT & ORDER CONFIRMATION MODAL
    // ----------------------------------------------------
    const upiPaymentModalController = () => {
        const modal = document.getElementById('upi-payment-modal');
        if (!modal) return;

        const closeBtn = modal.querySelector('[data-payment-close]');
        const backdrop = modal.querySelector('[data-payment-backdrop]');
        const payImg = modal.querySelector('[data-pay-img]');
        const payTitle = modal.querySelector('[data-pay-title]');
        const payRate = modal.querySelector('[data-pay-rate]');
        const payQty = modal.querySelector('[data-pay-qty]');
        const payTotal = modal.querySelector('[data-pay-total]');
        const payQr = modal.querySelector('[data-pay-qr]');
        const payUpiId = modal.querySelector('[data-pay-upi-id]');
        const copyBtn = modal.querySelector('[data-copy-upi-btn]');
        const upiAppLink = modal.querySelector('[data-pay-upi-app-link]');
        const submitBtn = modal.querySelector('[data-submit-order-btn]');
        const step1 = document.getElementById('pay-step-1');
        const step2 = document.getElementById('pay-step-2');
        const step1NextBtn = document.getElementById('pay-step1-next-btn');
        const backToStep1Btn = modal.querySelector('[data-back-to-step1-btn]');
        const modalTitle = modal.querySelector('[data-pay-modal-title]');
        const modalSubtitle = modal.querySelector('[data-pay-modal-subtitle]');
        const modalBody = modal.querySelector('.overflow-y-auto');

        const nameInput = document.getElementById('pay-customer-name');
        const phoneInput = document.getElementById('pay-customer-phone');
        const addressInput = document.getElementById('pay-customer-address');
        const cityInput = document.getElementById('pay-customer-city');
        const stateInput = document.getElementById('pay-customer-state');
        const pincodeInput = document.getElementById('pay-customer-pincode');
        const utrInput = document.getElementById('pay-customer-utr');
        const validationError = document.getElementById('pay-validation-error');

        const STORE_UPI_ID = "9648505055@upi";
        const STORE_PHONE = "919648505055";
        const STORE_NAME = "MR Enterprises";

        let currentOrder = {
            title: '',
            price: '',
            unitRateNum: 0,
            qty: 1,
            totalNum: 0,
            formattedTotal: '₹0.00'
        };

        const parsePrice = (priceStr) => {
            if (!priceStr) return 0;
            const cleaned = priceStr.toString().replace(/[^0-9.]/g, '');
            const parsed = parseFloat(cleaned);
            return isNaN(parsed) ? 0 : parsed;
        };

        const formatINR = (amount) => {
            return '₹' + amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };

        const showError = (msg) => {
            if (validationError) {
                validationError.textContent = msg;
                validationError.classList.remove('hidden');
            }
        };

        const clearError = () => {
            if (validationError) {
                validationError.textContent = '';
                validationError.classList.add('hidden');
            }
        };

        const setStep = (stepNumber) => {
            if (stepNumber === 1) {
                if (step1) step1.classList.remove('hidden');
                if (step2) step2.classList.add('hidden');
                if (step1NextBtn) step1NextBtn.classList.remove('hidden');
                if (submitBtn) submitBtn.classList.add('hidden');
                if (modalTitle) modalTitle.textContent = 'Complete Order & Pay';
                if (modalSubtitle) modalSubtitle.textContent = 'Step 1 of 2: Direct Store UPI Payment';
                clearError();
            } else {
                if (step1) step1.classList.add('hidden');
                if (step2) step2.classList.remove('hidden');
                if (step1NextBtn) step1NextBtn.classList.add('hidden');
                if (submitBtn) submitBtn.classList.remove('hidden');
                if (modalTitle) modalTitle.textContent = 'Delivery & Order Confirmation';
                if (modalSubtitle) modalSubtitle.textContent = 'Step 2 of 2: Address & Confirmation';
                clearError();
                setTimeout(() => {
                    nameInput?.focus();
                }, 120);
            }
            if (modalBody) modalBody.scrollTop = 0;
        };

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            setStep(1);
            clearError();
        };

        window.openUpiPaymentModal = ({ title, price, qty, img }) => {
            const unitRate = parsePrice(price);
            const quantity = parseInt(qty, 10) || 1;
            const total = unitRate * quantity;
            const formattedTotal = formatINR(total);

            currentOrder = {
                title: title || 'Electrical Product',
                price: price || formatINR(unitRate),
                unitRateNum: unitRate,
                qty: quantity,
                totalNum: total,
                formattedTotal: formattedTotal
            };

            if (payImg && img) payImg.src = img;
            if (payTitle) payTitle.textContent = currentOrder.title;
            if (payRate) payRate.textContent = currentOrder.price;
            if (payQty) payQty.textContent = currentOrder.qty;
            if (payTotal) payTotal.textContent = formattedTotal;

            // Generate NPCI standard UPI payment deep link
            // upi://pay?pa=...&pn=...&am=...&cu=INR&tn=...
            const cleanTitle = currentOrder.title.replace(/[^a-zA-Z0-9 ]/g, ' ').trim().slice(0, 20);
            const amountParam = total > 0 ? total.toFixed(2) : '0.00';
            const upiUri = `upi://pay?pa=${STORE_UPI_ID}&pn=${encodeURIComponent(STORE_NAME)}&am=${amountParam}&cu=INR&tn=${encodeURIComponent('Order ' + cleanTitle)}`;

            // High-resolution Dynamic QR Code via QRServer API
            if (payQr) {
                payQr.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUri)}`;
            }

            // Direct Mobile 1-Tap UPI launch link (GPay, PhonePe, Paytm, BHIM)
            if (upiAppLink) {
                upiAppLink.href = upiUri;
            }

            // Clear inputs on each fresh open
            if (nameInput) nameInput.value = '';
            if (phoneInput) phoneInput.value = '';
            if (addressInput) addressInput.value = '';
            if (cityInput) cityInput.value = '';
            if (stateInput) stateInput.value = '';
            if (pincodeInput) pincodeInput.value = '';

            if (utrInput) utrInput.value = '';
            clearError();
            setStep(1);

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        if (step1NextBtn) {
            step1NextBtn.addEventListener('click', () => {
                setStep(2);
            });
        }

        if (backToStep1Btn) {
            backToStep1Btn.addEventListener('click', () => {
                setStep(1);
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // 1-Click Copy Store UPI ID
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(STORE_UPI_ID);
                } catch (err) {
                    const temp = document.createElement('textarea');
                    temp.value = STORE_UPI_ID;
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    document.body.removeChild(temp);
                }
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="bi bi-check2"></i> Copied!';
                copyBtn.classList.add('bg-green-100', 'text-green-800', 'border-green-300');
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    copyBtn.classList.remove('bg-green-100', 'text-green-800', 'border-green-300');
                }, 2000);
            });
        }

        // Validate and submit order via WhatsApp
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();

                const name = nameInput ? nameInput.value.trim() : '';
                const phone = phoneInput ? phoneInput.value.trim() : '';
                const address = addressInput ? addressInput.value.trim() : '';
                const city = cityInput ? cityInput.value.trim() : '';
                const state = stateInput ? stateInput.value.trim() : '';
                const pincode = pincodeInput ? pincodeInput.value.trim() : '';
                const utr = utrInput ? utrInput.value.trim() : '';

                // Form validation
                if (!name) {
                    showError('⚠️ Kripya apna Poora Naam (Customer Name) darj karein.');
                    nameInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    nameInput?.focus();
                    return;
                }

                const cleanPhone = phone.replace(/[^0-9]/g, '');
                if (cleanPhone.length < 10) {
                    showError('⚠️ Kripya sahi 10-digit Mobile Number darj karein.');
                    phoneInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    phoneInput?.focus();
                    return;
                }

                if (!address) {
                    showError('⚠️ Kripya Address Line (House/Shop No., Street, Landmark) darj karein.');
                    addressInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    addressInput?.focus();
                    return;
                }

                if (!city) {
                    showError('⚠️ Kripya City / District darj karein.');
                    cityInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    cityInput?.focus();
                    return;
                }

                if (!state) {
                    showError('⚠️ Kripya State darj karein.');
                    stateInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    stateInput?.focus();
                    return;
                }

                const cleanPincode = pincode.replace(/[^0-9]/g, '');
                if (cleanPincode.length !== 6) {
                    showError('⚠️ Kripya sahi 6-digit PIN Code darj karein.');
                    pincodeInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    pincodeInput?.focus();
                    return;
                }

                clearError();

                // Purge any legacy stored customer details
                try {
                    ['name', 'phone', 'address', 'city', 'state', 'pincode'].forEach(k => {
                        localStorage.removeItem('mr_customer_' + k);
                    });
                } catch (e) {}

                // Formatted date and time
                const now = new Date();
                const formattedDate = now.toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                const formattedTime = now.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });

                // Structured Row-wise Order & Payment Confirmation WhatsApp Message
                const message = 
`*🛒 NAYAA ORDER & UPI PAYMENT CONFIRMATION*
----------------------------------------
*Dukaan:* MR Enterprises, Lucknow
*Date & Time:* ${formattedDate} at ${formattedTime}

*📦 ORDER DETAILS:*
• *Product:* ${currentOrder.title}
• *Quantity:* ${currentOrder.qty} units
• *Unit Rate:* ${currentOrder.price}
• *Total Payable:* ${currentOrder.formattedTotal}

*💳 PAYMENT VERIFICATION (Direct Store UPI):*
• *Store UPI ID:* ${STORE_UPI_ID}
• *UPI Reference / UTR No.:* ${utr ? utr : 'Direct UPI Payment Done (Sharing Screenshot)'}
• *Status:* Payment Done ✓ (0% Gateway Fee)

*📍 CUSTOMER & COMPLETE DELIVERY ADDRESS:*
• *Customer Name:* ${name}
• *Phone Number:* +91 ${cleanPhone}
• *Address Line:* ${address}
• *City / District:* ${city}
• *State:* ${state}
• *PIN Code:* ${cleanPincode}
• *Full Address:* ${address.replace(/\r?\n+/g, ', ')}, ${city}, ${state} - ${cleanPincode}

----------------------------------------
_Maine direct UPI par payment complete kar diya hai. Kripya payment verify karke order confirm & dispatch karein._`;

                const whatsAppUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
                window.open(whatsAppUrl, '_blank');

                closeModal();
            });
        }
    };

    // ----------------------------------------------------
    // 9. QUICK WHOLESALE / BULK INQUIRY WHATSAPP BUILDER
    // ----------------------------------------------------
    const bulkInquiryBuilder = () => {
        const form = document.getElementById('quick-inquiry-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('[name="customer_name"]')?.value || 'Customer';
            const category = form.querySelector('[name="category"]')?.value || 'Electrical Goods';
            const requirement = form.querySelector('[name="requirement"]')?.value || '';

            const phone = "919648505055";
            const message = `Hello MR Enterprises,\n\nI need a price quotation / bulk order inquiry:\n*Name:* ${name}\n*Requirement Category:* ${category}\n*Details / List:*\n${requirement}\n\nPlease share your best rates.`;

            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    };

    // ----------------------------------------------------
    // 10. GALLERY LIGHTBOX MODAL CONTROLLER
    // ----------------------------------------------------
    const galleryLightboxController = () => {
        const modal = document.querySelector('[data-lightbox-modal]');
        const backdrop = document.querySelector('[data-lightbox-backdrop]');
        const content = document.querySelector('[data-lightbox-content]');
        const imgEl = document.querySelector('[data-lightbox-img]');
        const titleEl = document.querySelector('[data-lightbox-title]');
        const descEl = document.querySelector('[data-lightbox-desc]');
        const tagEl = document.querySelector('[data-lightbox-tag]');
        const currentIdxEl = document.querySelector('[data-lightbox-current-idx]');
        const totalIdxEl = document.querySelector('[data-lightbox-total-idx]');
        const prevBtn = document.querySelector('[data-lightbox-prev]');
        const nextBtn = document.querySelector('[data-lightbox-next]');
        const closeBtns = document.querySelectorAll('[data-lightbox-close]');
        const whatsappBtn = document.querySelector('[data-lightbox-whatsapp]');
        const dotsContainer = document.querySelector('[data-lightbox-dots]');
        const triggers = document.querySelectorAll('[data-lightbox-trigger]');

        if (!modal || !triggers.length) return;

        const galleryData = [
            {
                src: 'assets/images/store_gallery/01M2FVTW9JA063B748QQG10K5G.webp',
                title: 'Havells LED Lighting Range',
                desc: 'Energy efficient, longer life LED bulbs, panels and smart lighting displays • Kamlapur Tiraha, Lucknow',
                tag: 'LED Lighting',
                query: 'Havells LED Range'
            },
            {
                src: 'assets/images/store_gallery/01M2FVVEG2505K8QN2KR6589TD.webp',
                title: 'Designer Ceiling Fans Collection',
                desc: 'High air delivery, silent motors and premium wooden/metallic finished fans • Kamlapur Tiraha, Lucknow',
                tag: 'Ceiling Fans',
                query: 'Designer Ceiling Fans'
            },
            {
                src: 'assets/images/store_gallery/01M2FVVVYY5D5GB11DY97W7KQP.webp',
                title: 'Heavy-Duty Wires & Cables Range',
                desc: '100% genuine copper wiring, flame retardant cables & industrial wholesale rolls • Kamlapur Tiraha, Lucknow',
                tag: 'Wires & Cables',
                query: 'Wires and Cables'
            }
        ];

        let currentIndex = 0;
        let isOpen = false;
        let animTimer = null;

        // Render Pagination Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = galleryData.map((_, i) => `
                <button
                    type="button"
                    data-lightbox-dot="${i}"
                    aria-label="View Image ${i + 1}"
                    class="h-2 rounded-full transition-all duration-300 ${i === 0 ? 'w-7 bg-yellow-400' : 'w-2 bg-white/40 hover:bg-white/70'} cursor-pointer"
                ></button>
            `).join('');

            dotsContainer.querySelectorAll('[data-lightbox-dot]').forEach(dot => {
                dot.addEventListener('click', () => {
                    const idx = parseInt(dot.getAttribute('data-lightbox-dot'), 10);
                    if (!isNaN(idx)) showSlide(idx);
                });
            });
        }

        const updateDots = (index) => {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('[data-lightbox-dot]');
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('w-2', 'bg-white/40');
                    dot.classList.add('w-7', 'bg-yellow-400');
                } else {
                    dot.classList.remove('w-7', 'bg-yellow-400');
                    dot.classList.add('w-2', 'bg-white/40');
                }
            });
        };

        const showSlide = (index) => {
            if (index < 0) index = galleryData.length - 1;
            if (index >= galleryData.length) index = 0;
            currentIndex = index;

            const item = galleryData[currentIndex];
            if (!item) return;

            // Fade transition on image
            if (imgEl) {
                imgEl.classList.add('opacity-0');
                setTimeout(() => {
                    imgEl.src = item.src;
                    imgEl.alt = item.title;
                    imgEl.onload = () => {
                        imgEl.classList.remove('opacity-0');
                    };
                    if (imgEl.complete) {
                        imgEl.classList.remove('opacity-0');
                    }
                }, 80);
            }

            if (titleEl) titleEl.textContent = item.title;
            if (descEl) descEl.textContent = item.desc;
            if (tagEl) tagEl.textContent = item.tag;
            if (currentIdxEl) currentIdxEl.textContent = String(currentIndex + 1);
            if (totalIdxEl) totalIdxEl.textContent = String(galleryData.length);

            if (whatsappBtn) {
                const message = `Hello MR Enterprises,\n\nI saw your showroom showcase for *${item.title}* (${item.tag}). Please share current wholesale / retail prices and availability.`;
                whatsappBtn.href = `https://wa.me/919648505055?text=${encodeURIComponent(message)}`;
            }

            updateDots(currentIndex);
        };

        const openLightbox = (index = 0) => {
            if (isOpen) return;
            isOpen = true;
            if (animTimer) clearTimeout(animTimer);

            showSlide(index);

            modal.classList.remove('hidden');
            modal.removeAttribute('hidden');
            document.body.classList.add('overflow-hidden');

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (backdrop) {
                        backdrop.classList.remove('opacity-0');
                        backdrop.classList.add('opacity-100');
                    }
                    if (content) {
                        content.classList.remove('scale-95', 'opacity-0');
                        content.classList.add('scale-100', 'opacity-100');
                    }
                });
            });
        };

        const closeLightbox = () => {
            if (!isOpen) return;
            isOpen = false;
            if (animTimer) clearTimeout(animTimer);

            if (backdrop) {
                backdrop.classList.remove('opacity-100');
                backdrop.classList.add('opacity-0');
            }
            if (content) {
                content.classList.remove('scale-100', 'opacity-100');
                content.classList.add('scale-95', 'opacity-0');
            }

            document.body.classList.remove('overflow-hidden');

            animTimer = setTimeout(() => {
                if (!isOpen) {
                    modal.classList.add('hidden');
                    modal.setAttribute('hidden', '');
                }
            }, 250);
        };

        // Attach triggers to all gallery items
        triggers.forEach((trigger, idx) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetIdx = parseInt(trigger.getAttribute('data-lightbox-index') ?? String(idx), 10);
                openLightbox(isNaN(targetIdx) ? idx : targetIdx);
            });

            // Keyboard access on trigger (Enter / Space)
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetIdx = parseInt(trigger.getAttribute('data-lightbox-index') ?? String(idx), 10);
                    openLightbox(isNaN(targetIdx) ? idx : targetIdx);
                }
            });
        });

        // Prev & Next Buttons
        prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(currentIndex - 1);
        });

        nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(currentIndex + 1);
        });

        // Close triggers
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });
        });

        backdrop?.addEventListener('click', () => {
            closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
            if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
        });

        // Mobile Touch Swipe Gesture Support
        let touchStartX = 0;
        let touchStartY = 0;
        const viewport = content || modal;

        viewport.addEventListener('touchstart', (e) => {
            if (!isOpen || e.touches.length !== 1) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
            if (!isOpen || e.changedTouches.length !== 1) return;
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;

            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX < 0) {
                    showSlide(currentIndex + 1);
                } else {
                    showSlide(currentIndex - 1);
                }
            }
        }, { passive: true });
    };

    // Initialize all modules
    heroSlider();
    mobileMenu();
    brandTabs();
    liveSearch();
    productSliderControls();
    cardQuantityController();
    quickViewModal();
    upiPaymentModalController();
    bulkInquiryBuilder();
    galleryLightboxController();
});


