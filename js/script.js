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
    // 3. BRAND TABS FILTER & CATEGORY VISIBILITY CONTROLLER
    // ----------------------------------------------------
    const updateCategoryBlockVisibility = () => {
        const categoryBlocks = document.querySelectorAll('[data-category-block]');
        categoryBlocks.forEach(block => {
            const cards = block.querySelectorAll('[data-product-brand]');
            const hasVisible = Array.from(cards).some(card => card.style.display !== 'none');
            if (hasVisible) {
                block.classList.remove('hidden');
                block.classList.add('is-revealed');
            } else {
                block.classList.add('hidden');
            }
        });
    };

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

                // Update category blocks visibility accordingly
                updateCategoryBlockVisibility();
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
                    updateCategoryBlockVisibility();
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

                // Update category blocks visibility accordingly
                updateCategoryBlockVisibility();
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
    // 6 & 7 & 8. MULTI-PRODUCT CART & 3-STEP CHECKOUT SYSTEM
    // (1. Add Product -> 2. Confirm Order / Address -> 3. Payment Mode Combined UPI)
    // ----------------------------------------------------
    const orderCartAndCheckoutController = () => {
        const STORE_UPI_ID = "9648505055@upi";
        const STORE_PHONE = "919648505055";
        const STORE_NAME = "MR Enterprises";

        // Cart state stored in memory (and synced with sessionStorage)
        let cart = [];
        try {
            const saved = sessionStorage.getItem('mr_cart_items');
            if (saved) {
                cart = JSON.parse(saved);
            }
        } catch (e) {
            cart = [];
        }

        const saveCart = () => {
            try {
                sessionStorage.setItem('mr_cart_items', JSON.stringify(cart));
            } catch (e) {}
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

        // DOM elements
        const checkoutModal = document.getElementById('upi-payment-modal');
        const floatingCartBar = document.getElementById('floating-cart-bar');
        const modalBackdrop = checkoutModal?.querySelector('[data-payment-backdrop]');
        const modalCloseBtns = checkoutModal?.querySelectorAll('[data-payment-close]');
        const modalTitle = checkoutModal?.querySelector('[data-checkout-modal-title]');
        const modalSubtitle = checkoutModal?.querySelector('[data-checkout-modal-subtitle]');
        const modalBody = checkoutModal?.querySelector('.overflow-y-auto');

        // Stepper elements
        const wizardStep1 = document.getElementById('checkout-step-1');
        const wizardStep2 = document.getElementById('checkout-step-2');
        const wizardStep3 = document.getElementById('checkout-step-3');
        const footerStep1 = document.getElementById('footer-actions-step-1');
        const footerStep2 = document.getElementById('footer-actions-step-2');
        const footerStep3 = document.getElementById('footer-actions-step-3');

        const step1NextBtn = document.getElementById('pay-step1-next-btn');
        const step2BackBtn = document.getElementById('pay-step2-back-btn');
        const step2NextBtn = document.getElementById('pay-step2-next-btn');
        const step3BackBtn = document.getElementById('pay-step3-back-btn');
        const submitOrderBtn = checkoutModal?.querySelector('[data-submit-order-btn]');

        // Form fields
        const nameInput = document.getElementById('pay-customer-name');
        const phoneInput = document.getElementById('pay-customer-phone');
        const addressInput = document.getElementById('pay-customer-address');
        const cityInput = document.getElementById('pay-customer-city');
        const stateInput = document.getElementById('pay-customer-state');
        const pincodeInput = document.getElementById('pay-customer-pincode');
        const utrInput = document.getElementById('pay-customer-utr');
        const validationError = document.getElementById('pay-validation-error');

        // Step 3 Payment elements
        const payCombinedTotal = checkoutModal?.querySelector('[data-pay-combined-total]');
        const payQr = checkoutModal?.querySelector('[data-pay-qr]');
        const copyUpiBtn = checkoutModal?.querySelector('[data-copy-upi-btn]');
        const payUpiAppLink = checkoutModal?.querySelector('[data-pay-upi-app-link]');

        // Toast container
        let toastEl = document.getElementById('cart-toast-notification');
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.id = 'cart-toast-notification';
            toastEl.className = 'fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-mr-blue text-white text-xs font-bold rounded-xl shadow-2xl transition-all duration-300 transform translate-y-[-20px] opacity-0 pointer-events-none border border-blue-400/30';
            document.body.appendChild(toastEl);
        }

        let toastTimeout = null;
        const showToast = (message) => {
            if (!toastEl) return;
            if (toastTimeout) clearTimeout(toastTimeout);
            toastEl.innerHTML = `
                <div class="flex items-center gap-2">
                    <i class="bi bi-check-circle-fill text-green-400 text-sm"></i>
                    <span>${message}</span>
                </div>
                <button type="button" data-toast-cart-btn class="ml-2.5 px-2.5 py-1 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-mr-blue rounded-lg font-black text-[11px] transition cursor-pointer shadow-xs whitespace-nowrap">
                    Go to Cart ➔
                </button>
            `;
            const toastBtn = toastEl.querySelector('[data-toast-cart-btn]');
            if (toastBtn) {
                toastBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openCheckoutModal(1);
                });
            }
            toastEl.classList.remove('translate-y-[-20px]', 'opacity-0', 'pointer-events-none');
            toastEl.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
            toastTimeout = setTimeout(() => {
                toastEl.classList.add('translate-y-[-20px]', 'opacity-0', 'pointer-events-none');
                toastEl.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
            }, 3200);
        };

        const getSummary = () => {
            let count = cart.length;
            let totalUnits = 0;
            let grandTotal = 0;
            cart.forEach(item => {
                totalUnits += item.qty;
                grandTotal += (item.unitRate * item.qty);
            });
            return {
                count,
                totalUnits,
                grandTotal,
                formattedTotal: formatINR(grandTotal)
            };
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

        // Render Cart UI everywhere across the page
        const renderCartUI = () => {
            const summary = getSummary();
            saveCart();

            // 1. Header Cart Badge & Total
            document.querySelectorAll('[data-cart-badge-count]').forEach(el => {
                el.textContent = summary.count;
            });
            document.querySelectorAll('[data-cart-header-total]').forEach(el => {
                el.textContent = summary.formattedTotal;
            });

            // 2. Floating Bottom Cart Bar
            if (floatingCartBar) {
                if (summary.count > 0) {
                    floatingCartBar.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
                    floatingCartBar.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
                    const countEl = floatingCartBar.querySelector('[data-floating-cart-count]');
                    const textEl = floatingCartBar.querySelector('[data-floating-cart-items-text]');
                    const totalEl = floatingCartBar.querySelector('[data-floating-cart-total]');
                    if (countEl) countEl.textContent = summary.count;
                    if (textEl) textEl.textContent = `${summary.count} Product${summary.count > 1 ? 's' : ''} (${summary.totalUnits} Units)`;
                    if (totalEl) totalEl.textContent = summary.formattedTotal;
                } else {
                    floatingCartBar.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
                    floatingCartBar.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                }
            }

            // 3. Step 1: Selected Products Container
            const itemsContainer = document.getElementById('cart-items-container');
            const emptyState = document.getElementById('cart-empty-state');
            const summaryBox = document.getElementById('cart-summary-box');

            if (itemsContainer) {
                if (summary.count === 0) {
                    itemsContainer.innerHTML = '';
                    if (emptyState) emptyState.classList.remove('hidden');
                    if (summaryBox) summaryBox.classList.add('hidden');
                    if (step1NextBtn) {
                        step1NextBtn.disabled = true;
                        step1NextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                } else {
                    if (emptyState) emptyState.classList.add('hidden');
                    if (summaryBox) summaryBox.classList.remove('hidden');
                    if (step1NextBtn) {
                        step1NextBtn.disabled = false;
                        step1NextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    }

                    let itemsHtml = '';
                    cart.forEach((item, index) => {
                        const itemSubtotal = item.unitRate * item.qty;
                        itemsHtml += `
                        <div class="flex items-center gap-2.5 sm:gap-3 p-2.5 bg-gray-50 hover:bg-gray-100/70 rounded-xl border border-gray-200 transition">
                            <div class="w-12 h-12 bg-white rounded-lg border border-gray-200 p-1 flex items-center justify-center flex-none overflow-hidden">
                                <img src="${item.img || 'assets/images/category-placeholder.jpg'}" alt="${item.title}" class="max-w-full max-h-full object-contain" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <span class="text-[9px] font-black uppercase text-blue-700 tracking-wider">${item.brand || 'GENUINE'}</span>
                                <h4 class="font-bold text-xs sm:text-sm text-gray-900 truncate leading-snug">${item.title}</h4>
                                <div class="text-[11px] text-gray-500 mt-0.5">Rate: <strong class="text-gray-800">${formatINR(item.unitRate)}</strong></div>
                            </div>
                            <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white flex-none h-7 sm:h-8">
                                <button type="button" data-cart-item-minus="${index}" aria-label="Decrease quantity" class="w-6 sm:w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 font-bold text-xs select-none cursor-pointer">−</button>
                                <span class="w-6 sm:w-7 text-center text-xs font-bold text-gray-900 select-none">${item.qty}</span>
                                <button type="button" data-cart-item-plus="${index}" aria-label="Increase quantity" class="w-6 sm:w-7 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 font-bold text-xs select-none cursor-pointer">+</button>
                            </div>
                            <div class="text-right flex-none w-16 sm:w-20">
                                <div class="text-xs sm:text-sm font-black text-mr-red">${formatINR(itemSubtotal)}</div>
                                <button type="button" data-cart-item-remove="${index}" class="text-[10px] sm:text-[11px] text-red-500 hover:text-red-700 font-semibold underline cursor-pointer mt-0.5">Remove</button>
                            </div>
                        </div>
                        `;
                    });
                    itemsContainer.innerHTML = itemsHtml;

                    // Bind item controls
                    itemsContainer.querySelectorAll('[data-cart-item-plus]').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const idx = parseInt(btn.getAttribute('data-cart-item-plus'), 10);
                            if (cart[idx]) {
                                cart[idx].qty++;
                                renderCartUI();
                            }
                        });
                    });

                    itemsContainer.querySelectorAll('[data-cart-item-minus]').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const idx = parseInt(btn.getAttribute('data-cart-item-minus'), 10);
                            if (cart[idx]) {
                                if (cart[idx].qty > 1) {
                                    cart[idx].qty--;
                                } else {
                                    cart.splice(idx, 1);
                                }
                                renderCartUI();
                            }
                        });
                    });

                    itemsContainer.querySelectorAll('[data-cart-item-remove]').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const idx = parseInt(btn.getAttribute('data-cart-item-remove'), 10);
                            if (cart[idx]) {
                                const title = cart[idx].title;
                                cart.splice(idx, 1);
                                renderCartUI();
                                showToast(`Removed ${title} from order.`);
                            }
                        });
                    });
                }
            }

            // Step 1 count & totals
            document.querySelectorAll('[data-cart-summary-count]').forEach(el => el.textContent = summary.count);
            document.querySelectorAll('[data-cart-summary-units]').forEach(el => el.textContent = `${summary.totalUnits} units`);
            document.querySelectorAll('[data-cart-summary-subtotal]').forEach(el => el.textContent = summary.formattedTotal);
            document.querySelectorAll('[data-cart-summary-grandtotal]').forEach(el => el.textContent = summary.formattedTotal);

            // Step 2 previews
            document.querySelectorAll('[data-step2-item-count]').forEach(el => el.textContent = summary.count);
            document.querySelectorAll('[data-step2-total-pill]').forEach(el => el.textContent = summary.formattedTotal);

            // Step 3 combined total & QR
            if (payCombinedTotal) payCombinedTotal.textContent = summary.formattedTotal;

            const amountParam = summary.grandTotal > 0 ? summary.grandTotal.toFixed(2) : '0.00';
            const upiNote = encodeURIComponent(`Order ${summary.count} Products MR Enterprises`);
            const upiUri = `upi://pay?pa=${STORE_UPI_ID}&pn=${encodeURIComponent(STORE_NAME)}&am=${amountParam}&cu=INR&tn=${upiNote}`;

            if (payQr) {
                payQr.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiUri)}`;
            }
            if (payUpiAppLink) {
                payUpiAppLink.href = upiUri;
            }

            // 4. Synchronize Product Cards on the page with active cart items
            document.querySelectorAll('[data-product-card]').forEach(card => {
                const cardTitle = (card.getAttribute('data-product-title') || '').trim().toLowerCase();
                const inCartItem = cart.find(i => i.title.trim().toLowerCase() === cardTitle);
                const addBtn = card.querySelector('[data-card-add-btn]');
                let cartBadge = card.querySelector('[data-card-in-cart-badge]');

                if (inCartItem && inCartItem.qty > 0) {
                    // Update Button State to "Go to Cart ➔"
                    if (addBtn) {
                        addBtn.innerHTML = `<i class="bi bi-bag-check-fill text-xs text-white"></i> <span>Go to Cart ➔</span>`;
                        addBtn.classList.remove('bg-mr-blue', 'hover:bg-blue-900', 'active:bg-blue-950');
                        addBtn.classList.add('bg-green-600', 'hover:bg-green-700', 'active:bg-green-800');
                    }

                    // Card border highlight
                    card.classList.add('ring-2', 'ring-green-500/70', 'border-green-300');

                    // Floating In-Cart Badge on Image
                    if (!cartBadge) {
                        const imgBox = card.querySelector('.aspect-\\[4\\/3\\], [class*="aspect-"]');
                        if (imgBox) {
                            cartBadge = document.createElement('span');
                            cartBadge.setAttribute('data-card-in-cart-badge', '');
                            cartBadge.className = 'absolute bottom-1.5 right-1.5 bg-green-600 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1 z-10';
                            imgBox.appendChild(cartBadge);
                        }
                    }
                    if (cartBadge) {
                        cartBadge.innerHTML = `<i class="bi bi-check-circle-fill text-[9px]"></i> In Cart: ${inCartItem.qty}`;
                        cartBadge.classList.remove('hidden');
                    }
                } else {
                    // Reset Button State to "Add"
                    if (addBtn) {
                        addBtn.innerHTML = `<i class="bi bi-cart-plus text-xs sm:text-sm"></i> <span>Add</span>`;
                        addBtn.classList.remove('bg-green-600', 'hover:bg-green-700', 'active:bg-green-800');
                        addBtn.classList.add('bg-mr-blue', 'hover:bg-blue-900', 'active:bg-blue-950');
                    }

                    // Remove card border highlight
                    card.classList.remove('ring-2', 'ring-green-500/70', 'border-green-300');

                    // Hide In-Cart Badge
                    if (cartBadge) {
                        cartBadge.classList.add('hidden');
                    }
                }
            });
        };

        // Add to cart helper
        const addToCart = (product, qty = 1) => {
            const quantity = parseInt(qty, 10) || 1;
            const existingIndex = cart.findIndex(i => i.title.trim().toLowerCase() === product.title.trim().toLowerCase());
            if (existingIndex > -1) {
                cart[existingIndex].qty += quantity;
            } else {
                cart.push({
                    title: product.title,
                    priceStr: product.priceStr,
                    unitRate: parsePrice(product.priceStr),
                    qty: quantity,
                    img: product.img || '',
                    brand: product.brand || '',
                    category: product.category || ''
                });
            }
            renderCartUI();
            showToast(`Added ${quantity}x ${product.title} to order!`);
        };

        // Wizard step switcher
        let currentStep = 1;
        const setWizardStep = (step) => {
            currentStep = step;
            const summary = getSummary();

            // Toggle step bodies
            if (wizardStep1) wizardStep1.classList.toggle('hidden', step !== 1);
            if (wizardStep2) wizardStep2.classList.toggle('hidden', step !== 2);
            if (wizardStep3) wizardStep3.classList.toggle('hidden', step !== 3);

            // Toggle step footers
            if (footerStep1) footerStep1.classList.toggle('hidden', step !== 1);
            if (footerStep2) footerStep2.classList.toggle('hidden', step !== 2);
            if (footerStep3) footerStep3.classList.toggle('hidden', step !== 3);

            // Update title & subtitle
            if (modalTitle && modalSubtitle) {
                if (step === 1) {
                    modalTitle.textContent = 'Confirm & Place Order';
                    modalSubtitle.textContent = `Step 1 of 3: Selected Products (${summary.count} items)`;
                } else if (step === 2) {
                    modalTitle.textContent = 'Delivery Address & Contact';
                    modalSubtitle.textContent = 'Step 2 of 3: Enter your Lucknow delivery address';
                } else if (step === 3) {
                    modalTitle.textContent = 'Single Combined UPI Transfer';
                    modalSubtitle.textContent = `Step 3 of 3: Pay ${summary.formattedTotal} for all products`;
                }
            }

            // Update step indicators
            [1, 2, 3].forEach(num => {
                const navBtn = checkoutModal?.querySelector(`[data-wizard-nav="${num}"]`);
                const indicator = checkoutModal?.querySelector(`[data-step-indicator="${num}"]`);
                if (!navBtn || !indicator) return;

                if (num === step) {
                    navBtn.className = 'flex items-center gap-1.5 transition font-black text-mr-blue cursor-pointer';
                    indicator.className = 'w-5 h-5 rounded-full bg-mr-blue text-white flex items-center justify-center text-[10px] font-bold shadow-xs';
                    indicator.textContent = num;
                } else if (num < step) {
                    navBtn.className = 'flex items-center gap-1.5 transition font-bold text-green-700 cursor-pointer';
                    indicator.className = 'w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] font-bold';
                    indicator.innerHTML = '<i class="bi bi-check text-xs"></i>';
                } else {
                    navBtn.className = 'flex items-center gap-1.5 transition text-gray-400 hover:text-gray-600 cursor-pointer';
                    indicator.className = 'w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-bold';
                    indicator.textContent = num;
                }
            });

            clearError();
            if (modalBody) modalBody.scrollTop = 0;

            if (step === 2) {
                setTimeout(() => nameInput?.focus(), 150);
            }
        };

        const openCheckoutModal = (step = 1) => {
            if (!checkoutModal) return;
            renderCartUI();
            const summary = getSummary();
            if (summary.count === 0) {
                setWizardStep(1);
            } else {
                setWizardStep(step);
            }
            checkoutModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        const closeCheckoutModal = () => {
            if (!checkoutModal) return;
            checkoutModal.classList.add('hidden');
            document.body.style.overflow = '';
            setWizardStep(1);
            clearError();
        };

        // Navigation Stepper Bar clicks
        checkoutModal?.querySelectorAll('[data-wizard-nav]').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetStep = parseInt(btn.getAttribute('data-wizard-nav'), 10);
                const summary = getSummary();
                if (targetStep === 1) {
                    setWizardStep(1);
                } else if (targetStep === 2) {
                    if (summary.count === 0) {
                        showError('Kripya pehle store se products add karein.');
                        return;
                    }
                    setWizardStep(2);
                } else if (targetStep === 3) {
                    if (summary.count === 0) {
                        showError('Kripya pehle store se products add karein.');
                        return;
                    }
                    if (validateAddress()) {
                        setWizardStep(3);
                    }
                }
            });
        });

        // Step 1 -> Step 2
        if (step1NextBtn) {
            step1NextBtn.addEventListener('click', () => {
                const summary = getSummary();
                if (summary.count === 0) {
                    showToast('⚠️ Please select at least 1 product.');
                    return;
                }
                setWizardStep(2);
            });
        }

        // Step 2 -> Step 1
        if (step2BackBtn) {
            step2BackBtn.addEventListener('click', () => {
                setWizardStep(1);
            });
        }

        // Validate Address Form
        const validateAddress = () => {
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const address = addressInput ? addressInput.value.trim() : '';
            const city = cityInput ? cityInput.value.trim() : '';
            const state = stateInput ? stateInput.value.trim() : '';
            const pincode = pincodeInput ? pincodeInput.value.trim() : '';

            if (!name) {
                showError('⚠️ Kripya apna Poora Naam (Customer Name) darj karein.');
                nameInput?.focus();
                return false;
            }

            const cleanPhone = phone.replace(/[^0-9]/g, '');
            if (cleanPhone.length < 10) {
                showError('⚠️ Kripya sahi 10-digit Mobile Number darj karein.');
                phoneInput?.focus();
                return false;
            }

            if (!address) {
                showError('⚠️ Kripya Address Line (House/Shop No., Street, Landmark) darj karein.');
                addressInput?.focus();
                return false;
            }

            if (!city) {
                showError('⚠️ Kripya City / District darj karein.');
                cityInput?.focus();
                return false;
            }

            if (!state) {
                showError('⚠️ Kripya State darj karein.');
                stateInput?.focus();
                return false;
            }

            const cleanPincode = pincode.replace(/[^0-9]/g, '');
            if (cleanPincode.length !== 6) {
                showError('⚠️ Kripya sahi 6-digit PIN Code darj karein.');
                pincodeInput?.focus();
                return false;
            }

            clearError();
            return true;
        };

        // Step 2 -> Step 3
        if (step2NextBtn) {
            step2NextBtn.addEventListener('click', () => {
                if (validateAddress()) {
                    setWizardStep(3);
                }
            });
        }

        // Step 3 -> Step 2
        if (step3BackBtn) {
            step3BackBtn.addEventListener('click', () => {
                setWizardStep(2);
            });
        }

        // Copy Store UPI ID
        if (copyUpiBtn) {
            copyUpiBtn.addEventListener('click', async () => {
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
                const originalHtml = copyUpiBtn.innerHTML;
                copyUpiBtn.innerHTML = '<i class="bi bi-check2"></i> Copied!';
                copyUpiBtn.classList.add('bg-green-100', 'text-green-800', 'border-green-300');
                setTimeout(() => {
                    copyUpiBtn.innerHTML = originalHtml;
                    copyUpiBtn.classList.remove('bg-green-100', 'text-green-800', 'border-green-300');
                }, 2000);
            });
        }

        // Step 3: Final WhatsApp Multi-Product Order Confirmation
        if (submitOrderBtn) {
            submitOrderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const summary = getSummary();
                if (summary.count === 0) {
                    showToast('⚠️ No products in order.');
                    setWizardStep(1);
                    return;
                }

                if (!validateAddress()) {
                    setWizardStep(2);
                    return;
                }

                const name = nameInput ? nameInput.value.trim() : '';
                const phone = phoneInput ? phoneInput.value.trim().replace(/[^0-9]/g, '') : '';
                const address = addressInput ? addressInput.value.trim() : '';
                const city = cityInput ? cityInput.value.trim() : '';
                const state = stateInput ? stateInput.value.trim() : '';
                const pincode = pincodeInput ? pincodeInput.value.trim().replace(/[^0-9]/g, '') : '';
                const utr = utrInput ? utrInput.value.trim() : '';

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

                // Build row-by-row itemized list
                const itemLines = cart.map((item, idx) => {
                    const subtotal = item.unitRate * item.qty;
                    return `${idx + 1}. *${item.title}*\n   • Qty: ${item.qty} units | Rate: ${formatINR(item.unitRate)} | Total: ${formatINR(subtotal)}`;
                }).join('\n');

                const message =
`*🛒 NAYAA MULTI-PRODUCT ORDER & COMBINED UPI PAYMENT*
----------------------------------------
*Dukaan:* MR Enterprises, Lucknow
*Date & Time:* ${formattedDate} at ${formattedTime}

*📦 SELECTED PRODUCTS (${summary.count} Items / ${summary.totalUnits} Units):*
${itemLines}

----------------------------------------
*💰 COMBINED GRAND TOTAL:* ${summary.formattedTotal}
*🚚 Delivery Charge:* FREE Delivery in Lucknow

*💳 PAYMENT MODE (Single Combined Transfer):*
• *Store UPI ID:* ${STORE_UPI_ID}
• *Total Amount:* ${summary.formattedTotal}
• *UPI Reference / UTR No.:* ${utr ? utr : 'Combined UPI Payment Done (Sharing Screenshot)'}
• *Status:* Single Combined Transfer via UPI ✓

*📍 CUSTOMER & COMPLETE DELIVERY ADDRESS:*
• *Customer Name:* ${name}
• *Phone Number:* +91 ${phone}
• *Address Line:* ${address}
• *City / District:* ${city}
• *State:* ${state}
• *PIN Code:* ${pincode}
• *Full Address:* ${address.replace(/\r?\n+/g, ', ')}, ${city}, ${state} - ${pincode}

----------------------------------------
_Maine upar diye gaye sabhi products ka ek sath combined payment UPI se transfer kar diya hai. Kripya payment verify karke dispatch confirm karein._`;

                const whatsAppUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
                window.open(whatsAppUrl, '_blank');

                // Clear cart after successful order submission
                cart = [];
                renderCartUI();
                closeCheckoutModal();
                showToast('🎉 Order placed successfully on WhatsApp!');
            });
        }

        // Close triggers
        modalCloseBtns?.forEach(btn => btn.addEventListener('click', closeCheckoutModal));
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeCheckoutModal);
        checkoutModal?.addEventListener('click', (e) => {
            if (e.target === checkoutModal) closeCheckoutModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && checkoutModal && !checkoutModal.classList.contains('hidden')) {
                closeCheckoutModal();
            }
        });

        // Open Cart triggers (Header buttons & Floating bar buttons)
        document.querySelectorAll('[data-open-cart-btn]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openCheckoutModal(1);
            });
        });

        // ----------------------------------------------------
        // Product Card Listeners: Quantity - / + and "+ Add to Order"
        // ----------------------------------------------------
        document.querySelectorAll('[data-product-card]').forEach(card => {
            const minusBtn = card.querySelector('[data-card-qty-minus]');
            const plusBtn = card.querySelector('[data-card-qty-plus]');
            const input = card.querySelector('[data-card-qty-input]');
            const addBtn = card.querySelector('[data-card-add-btn]');

            const title = card.getAttribute('data-product-title') || 'Product';
            const priceStr = card.getAttribute('data-product-price') || '₹0';
            const brand = card.getAttribute('data-product-brand') || '';
            const category = card.getAttribute('data-product-category') || '';
            const img = card.querySelector('img')?.src || '';

            if (plusBtn && input) {
                plusBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let currentVal = parseInt(input.value, 10) || 1;
                    input.value = currentVal + 1;
                });
            }

            if (minusBtn && input) {
                minusBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let currentVal = parseInt(input.value, 10) || 1;
                    if (currentVal > 1) {
                        input.value = currentVal - 1;
                    }
                });
            }

            if (addBtn && input) {
                addBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cardTitle = (card.getAttribute('data-product-title') || '').trim().toLowerCase();
                    const inCartItem = cart.find(i => i.title.trim().toLowerCase() === cardTitle);
                    const qty = parseInt(input.value, 10) || 1;

                    // If product is already in cart and stepper is default 1, clicking 'Go to Cart' opens the cart modal!
                    if (inCartItem && qty === 1) {
                        openCheckoutModal(1);
                        return;
                    }

                    // Otherwise, add/increase product in cart
                    addToCart({
                        title,
                        priceStr,
                        brand,
                        category,
                        img
                    }, qty);

                    // Reset card input stepper to 1
                    input.value = 1;

                    // Micro-pulse animation feedback on card
                    card.classList.add('scale-[1.02]');
                    setTimeout(() => card.classList.remove('scale-[1.02]'), 220);
                });
            }
        });

        // ----------------------------------------------------
        // Quick View Modal Controller (with "+ Add to Order" & "Confirm Order")
        // ----------------------------------------------------
        const quickViewModal = document.getElementById('quick-view-modal');
        if (quickViewModal) {
            const qvCloseBtn = quickViewModal.querySelector('[data-modal-close]');
            const qvBackdrop = quickViewModal.querySelector('[data-modal-backdrop]');
            const qvImg = quickViewModal.querySelector('[data-modal-img]');
            const qvTitle = quickViewModal.querySelector('[data-modal-title]');
            const qvBrand = quickViewModal.querySelector('[data-modal-brand]');
            const qvCategory = quickViewModal.querySelector('[data-modal-category]');
            const qvPrice = quickViewModal.querySelector('[data-modal-price]');
            const qvMrp = quickViewModal.querySelector('[data-modal-mrp]');
            const qvSpecs = quickViewModal.querySelector('[data-modal-specs]');
            const qvQty = quickViewModal.querySelector('[data-modal-qty]');
            const qvMinus = quickViewModal.querySelector('[data-qty-minus]');
            const qvPlus = quickViewModal.querySelector('[data-qty-plus]');
            const qvAddBtn = quickViewModal.querySelector('[data-modal-add-btn]');
            const qvCheckoutBtn = quickViewModal.querySelector('[data-modal-checkout-btn]');

            let currentQvQty = 1;
            let currentQvProduct = null;

            const closeQv = () => {
                quickViewModal.classList.add('hidden');
                document.body.style.overflow = '';
            };

            const openQv = (card) => {
                currentQvQty = 1;
                currentQvProduct = {
                    title: card.getAttribute('data-product-title') || 'Product',
                    priceStr: card.getAttribute('data-product-price') || '₹0',
                    brand: card.getAttribute('data-product-brand') || '',
                    category: card.getAttribute('data-product-category') || '',
                    mrp: card.getAttribute('data-product-mrp') || '',
                    img: card.querySelector('img')?.src || '',
                    specs: card.getAttribute('data-product-specs') || '100% Genuine Covered Product'
                };

                if (qvImg) qvImg.src = currentQvProduct.img;
                if (qvTitle) qvTitle.textContent = currentQvProduct.title;
                if (qvBrand) qvBrand.textContent = currentQvProduct.brand.toUpperCase();
                if (qvCategory) qvCategory.textContent = currentQvProduct.category;
                if (qvPrice) qvPrice.textContent = currentQvProduct.priceStr;
                if (qvMrp) qvMrp.textContent = currentQvProduct.mrp;
                if (qvSpecs) qvSpecs.textContent = currentQvProduct.specs;
                if (qvQty) qvQty.textContent = currentQvQty;

                quickViewModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            };

            document.querySelectorAll('[data-quick-view-btn]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = btn.closest('[data-product-card]');
                    if (card) openQv(card);
                });
            });

            if (qvPlus) {
                qvPlus.addEventListener('click', () => {
                    currentQvQty++;
                    if (qvQty) qvQty.textContent = currentQvQty;
                });
            }

            if (qvMinus) {
                qvMinus.addEventListener('click', () => {
                    if (currentQvQty > 1) {
                        currentQvQty--;
                        if (qvQty) qvQty.textContent = currentQvQty;
                    }
                });
            }

            if (qvAddBtn) {
                qvAddBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentQvProduct) {
                        addToCart(currentQvProduct, currentQvQty);
                        closeQv();
                    }
                });
            }

            if (qvCheckoutBtn) {
                qvCheckoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentQvProduct) {
                        addToCart(currentQvProduct, currentQvQty);
                        closeQv();
                        openCheckoutModal(1);
                    }
                });
            }

            if (qvCloseBtn) qvCloseBtn.addEventListener('click', closeQv);
            if (qvBackdrop) qvBackdrop.addEventListener('click', closeQv);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !quickViewModal.classList.contains('hidden')) {
                    closeQv();
                }
            });
        }

        // Initial UI render
        renderCartUI();
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

    // ----------------------------------------------------
    // 11. ON-SCROLL PROGRESSIVE PRODUCT SECTION REVEAL (SEO & SPEED)
    // ----------------------------------------------------
    const categoryScrollRevealController = () => {
        const categoryBlocks = document.querySelectorAll('[data-category-block]');
        if (!categoryBlocks.length) return;

        // If IntersectionObserver is not supported (e.g. legacy browsers or search crawler bots), reveal immediately
        if (!('IntersectionObserver' in window)) {
            categoryBlocks.forEach(block => block.classList.add('is-revealed'));
            return;
        }

        // Apply progressive reveal class via JS so if JS is disabled, content remains 100% visible by default for SEO crawlers
        categoryBlocks.forEach((block, index) => {
            block.classList.add('scroll-reveal-section');
            // Reveal the first category block immediately so initial above-the-fold content is instantly visible
            if (index === 0) {
                block.classList.add('is-revealed');
            }
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '120px 0px -30px 0px', // Preloads smoothly 120px before user arrives at the section
            threshold: 0.05
        });

        categoryBlocks.forEach(block => {
            if (!block.classList.contains('is-revealed')) {
                revealObserver.observe(block);
            }
        });

        // Global helper for search and brand filter to reveal all blocks instantly
        window.revealAllCategoryBlocks = () => {
            categoryBlocks.forEach(block => {
                block.classList.add('is-revealed');
                revealObserver.unobserve(block);
            });
        };
    };

    // Initialize all modules
    heroSlider();
    mobileMenu();
    brandTabs();
    liveSearch();
    productSliderControls();
    orderCartAndCheckoutController();
    bulkInquiryBuilder();
    galleryLightboxController();
    categoryScrollRevealController();
});


