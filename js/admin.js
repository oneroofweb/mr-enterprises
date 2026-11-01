/**
 * MR ENTERPRISES — ADMIN DASHBOARD CONTROLLER & LOCAL DATA BRIDGE
 * Handles full CRUD for Hero Slider, Categories, Brands, Products, and Gallery
 * Works with client-side LocalStorage and is ready for REST API backend sync.
 */

// Default Seed Data matching storefront
const DEFAULT_STORE_DATA = {
    heroSlides: [
        {
            id: 'hero_1',
            title: 'MR Enterprises Electrical Goods',
            desktop: 'assets/images/banners/01M2DATJWCE0W85RAQES221FXK.webp',
            mobile: 'assets/images/banners/01M2DATJWNHQB2RS6B86DJSQWZ.webp',
            link: '#products',
            order: 1,
            active: true
        },
        {
            id: 'hero_2',
            title: 'Huge Discounts on Premium Electronics & Authorized Brands',
            desktop: 'assets/images/banners/01M2DAV9672SBKVV4G3Y8PDVT6.webp',
            mobile: 'assets/images/banners/01M2DA0GJ1993AGK7FJZCWJXGH.webp',
            link: '#products',
            order: 2,
            active: true
        }
    ],

    categories: [
        {
            id: 'cat_1',
            slug: 'cat-lighting',
            name: 'LED Lighting',
            count: 'Explore 25+ Items',
            image: 'assets/images/categories/01M2DDZ2M55W08YSDHWMFH1QBY.webp'
        },
        {
            id: 'cat_2',
            slug: 'cat-fans',
            name: 'Ceiling & Wall Fans',
            count: 'Explore 18+ Items',
            image: 'assets/images/categories/01M2DD0T554GNRMNXA59RQBPMJ.webp'
        },
        {
            id: 'cat_3',
            slug: 'cat-switches',
            name: 'Modular Switches',
            count: 'Explore 40+ Items',
            image: 'assets/images/categories/01M2F2KJYFG77QVC6E67G8Y4Q6.webp'
        },
        {
            id: 'cat_4',
            slug: 'cat-wires',
            name: 'Wires & Cables',
            count: 'Explore 30+ Items',
            image: 'assets/images/categories/01M2DE64S99QVAEP552M2NTCS4.webp'
        },
        {
            id: 'cat_5',
            slug: 'cat-mcb',
            name: 'MCBs & Switchgear',
            count: 'Explore 15+ Items',
            image: 'assets/images/categories/cat_mcb_switchgear.jpg'
        },
        {
            id: 'cat_6',
            slug: 'cat-appliances',
            name: 'Home Appliances',
            count: 'Explore 12+ Items',
            image: 'assets/images/categories/cat_appliances_geysers.jpg'
        },
        {
            id: 'cat_7',
            slug: 'cat-conduits',
            name: 'Conduits & Accessories',
            count: 'Explore 50+ Items',
            image: 'assets/images/categories/cat_accessories_conduits.jpg'
        },
        {
            id: 'cat_8',
            slug: 'cat-profile',
            name: 'Profile & Strip Lights',
            count: 'Explore 20+ Items',
            image: 'assets/images/categories/cat_profile_lighting.jpg'
        }
    ],

    brands: [
        { id: 'brand_1', name: 'Havells', slug: 'havells', image: 'assets/images/brands/01M2F41CSD7QBZNXRSGZXFGX07.webp', active: true },
        { id: 'brand_2', name: 'Polycab', slug: 'polycab', image: 'assets/images/brands/01M2F4896QQ51B5Q0J37AEE3C6.webp', active: true },
        { id: 'brand_3', name: 'Anchor', slug: 'anchor', image: 'assets/images/brands/01M2F4JXCSM1SY2KT8CHE02ASX.webp', active: true },
        { id: 'brand_4', name: 'REO', slug: 'reo', image: '', active: true },
        { id: 'brand_5', name: 'CONA', slug: 'cona', image: '', active: true },
        { id: 'brand_6', name: 'Philips', slug: 'philips', image: '', active: true },
        { id: 'brand_7', name: 'Crompton', slug: 'crompton', image: '', active: true },
        { id: 'brand_8', name: 'Legrand', slug: 'legrand', image: '', active: true }
    ],

    products: [
        {
            id: 'prod_1',
            title: 'Havells 9W Cool Day Light LED Bulb (Pack of 2)',
            brand: 'havells',
            category: 'cat-lighting',
            price: 120,
            mrp: 190,
            badge: 'BESTSELLER',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DDZ2M55W08YSDHWMFH1QBY.webp'
        },
        {
            id: 'prod_2',
            title: 'Havells Adore 15W Slim Round LED Panel Light',
            brand: 'havells',
            category: 'cat-lighting',
            price: 380,
            mrp: 550,
            badge: 'TOP RATED',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DDZ2M55W08YSDHWMFH1QBY.webp'
        },
        {
            id: 'prod_3',
            title: 'Philips 20W Stellar Bright LED Batten Tube',
            brand: 'philips',
            category: 'cat-lighting',
            price: 240,
            mrp: 350,
            badge: 'HOT SELLER',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DDZ2M55W08YSDHWMFH1QBY.webp'
        },
        {
            id: 'prod_4',
            title: 'Polycab 50W Outdoor IP66 LED Flood Light',
            brand: 'polycab',
            category: 'cat-lighting',
            price: 890,
            mrp: 1450,
            badge: 'FACTORY PRICE',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DDZ2M55W08YSDHWMFH1QBY.webp'
        },
        {
            id: 'prod_5',
            title: 'Havells Stealth Air 1200mm Metallic BLDC Ceiling Fan',
            brand: 'havells',
            category: 'cat-fans',
            price: 3150,
            mrp: 4400,
            badge: 'TOP SELLER',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DD0T554GNRMNXA59RQBPMJ.webp'
        },
        {
            id: 'prod_6',
            title: 'Crompton Energion Hyperjet 1200mm BLDC Remote Fan',
            brand: 'crompton',
            category: 'cat-fans',
            price: 2850,
            mrp: 3950,
            badge: 'HIGH AIR',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DD0T554GNRMNXA59RQBPMJ.webp'
        },
        {
            id: 'prod_7',
            title: 'Havells Ventil Air DB 200mm High Suction Exhaust Fan',
            brand: 'havells',
            category: 'cat-fans',
            price: 980,
            mrp: 1450,
            badge: '',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DD0T554GNRMNXA59RQBPMJ.webp'
        },
        {
            id: 'prod_8',
            title: 'Anchor Roma 10A 1-Way Modular Switch (White Glossy)',
            brand: 'anchor',
            category: 'cat-switches',
            price: 38,
            mrp: 55,
            badge: 'POPULAR',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2F2KJYFG77QVC6E67G8Y4Q6.webp'
        },
        {
            id: 'prod_9',
            title: 'Anchor Roma 6/16A Combined Power Socket with Shutter',
            brand: 'anchor',
            category: 'cat-switches',
            price: 135,
            mrp: 195,
            badge: '',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2F2KJYFG77QVC6E67G8Y4Q6.webp'
        },
        {
            id: 'prod_10',
            title: 'Havells Fabio 8-Module Metallic Cover Plate (Graphite Black)',
            brand: 'havells',
            category: 'cat-switches',
            price: 240,
            mrp: 350,
            badge: 'PREMIUM',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2F2KJYFG77QVC6E67G8Y4Q6.webp'
        },
        {
            id: 'prod_11',
            title: 'Polycab Optima 1.5 sq mm FR Copper Wire 90m Coil (Red)',
            brand: 'polycab',
            category: 'cat-wires',
            price: 1850,
            mrp: 2600,
            badge: 'FLAME RETARDANT',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DE64S99QVAEP552M2NTCS4.webp'
        },
        {
            id: 'prod_12',
            title: 'Havells Life Line Plus 2.5 sq mm S3 HRFR Wire 90m Coil',
            brand: 'havells',
            category: 'cat-wires',
            price: 2950,
            mrp: 4100,
            badge: 'TOP GRADE',
            stock: 'in_stock',
            image: 'assets/images/categories/01M2DE64S99QVAEP552M2NTCS4.webp'
        },
        {
            id: 'prod_13',
            title: 'Havells Euro-X 16A Single Pole C-Curve 10kA MCB',
            brand: 'havells',
            category: 'cat-mcb',
            price: 175,
            mrp: 260,
            badge: 'ISI CERTIFIED',
            stock: 'in_stock',
            image: 'assets/images/categories/cat_mcb_switchgear.jpg'
        },
        {
            id: 'prod_14',
            title: 'Legrand RX3 32A Double Pole Isolator Switch',
            brand: 'legrand',
            category: 'cat-mcb',
            price: 490,
            mrp: 680,
            badge: '',
            stock: 'in_stock',
            image: 'assets/images/categories/cat_mcb_switchgear.jpg'
        },
        {
            id: 'prod_15',
            title: 'Havells Instanio 3-Litre Instant Water Heater Geyser (White/Blue)',
            brand: 'havells',
            category: 'cat-appliances',
            price: 3650,
            mrp: 5200,
            badge: 'WINTER ESSENTIAL',
            stock: 'in_stock',
            image: 'assets/images/categories/cat_appliances_geysers.jpg'
        },
        {
            id: 'prod_16',
            title: '25mm Heavy Duty PVC Conduit Pipe (Pack of 10 Bundles)',
            brand: 'polycab',
            category: 'cat-conduits',
            price: 850,
            mrp: 1200,
            badge: 'WHOLESALE',
            stock: 'in_stock',
            image: 'assets/images/categories/cat_accessories_conduits.jpg'
        }
    ],

    gallery: [
        {
            id: 'gal_1',
            title: 'Modern Architectural LED Showroom & Chandeliers',
            tag: 'LED Lighting',
            desc: 'Lucknow Showroom Display',
            image: 'assets/images/store_gallery/01M2FVTW9JA063B748QQG10K5G.webp'
        },
        {
            id: 'gal_2',
            title: 'Authorized Switchgear, MCB & DB Distribution Units',
            tag: 'MCB & Distribution',
            desc: 'Wholesale & Contractor Hub',
            image: 'assets/images/store_gallery/01M2FVVEG2505K8QN2KR6589TD.webp'
        },
        {
            id: 'gal_3',
            title: 'Modular Switches, Designer Glass Plates & Accessories',
            tag: 'Modular Switches',
            desc: 'Madi Road, Bijnor, Lucknow',
            image: 'assets/images/store_gallery/01M2FVVVYY5D5GB11DY97W7KQP.webp'
        }
    ]
};

const STORAGE_KEY = 'mr_enterprises_store_data';

class AdminApp {
    constructor() {
        this.data = this.loadData();
        this.currentView = 'dashboard';
        this.initEventListeners();
        this.renderAll();
    }

    loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed.products && parsed.categories && parsed.brands && parsed.heroSlides) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Failed to parse localStorage data:', e);
        }
        this.saveData(DEFAULT_STORE_DATA);
        return JSON.parse(JSON.stringify(DEFAULT_STORE_DATA));
    }

    saveData(dataToSave = this.data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
            this.updateBadgeCounts();
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            this.showToast('Storage quota exceeded or error saving data', 'error');
        }
    }

    initEventListeners() {
        // Tab Navigation
        document.querySelectorAll('[data-nav-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-nav-target');
                this.navigate(target);
            });
        });

        // Mobile Sidebar Toggles
        const openBtn = document.getElementById('open-sidebar-btn');
        const closeBtn = document.getElementById('close-sidebar-btn');
        const sidebar = document.getElementById('admin-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');

        if (openBtn) {
            openBtn.addEventListener('click', () => {
                sidebar.classList.remove('-translate-x-full');
                backdrop.classList.remove('hidden');
            });
        }

        const closeSidebar = () => {
            sidebar.classList.add('-translate-x-full');
            backdrop.classList.add('hidden');
        };

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (backdrop) backdrop.addEventListener('click', closeSidebar);

        // Quick Add Dropdown Toggle
        const quickAddBtn = document.getElementById('quick-add-btn');
        const quickAddMenu = document.getElementById('quick-add-menu');
        if (quickAddBtn && quickAddMenu) {
            quickAddBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                quickAddMenu.classList.toggle('hidden');
            });

            document.addEventListener('click', () => {
                quickAddMenu.classList.add('hidden');
            });
        }

        // Live Product Filters
        const searchInput = document.getElementById('product-search-input');
        const catFilter = document.getElementById('product-category-filter');
        const brandFilter = document.getElementById('product-brand-filter');
        const stockFilter = document.getElementById('product-stock-filter');

        [searchInput, catFilter, brandFilter, stockFilter].forEach(el => {
            if (el) {
                el.addEventListener('input', () => this.renderProductsTable());
                el.addEventListener('change', () => this.renderProductsTable());
            }
        });
    }

    navigate(viewName) {
        this.currentView = viewName;

        // Hide all views
        document.querySelectorAll('.content-view').forEach(view => {
            view.classList.add('hidden');
        });

        // Show target view
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) targetView.classList.remove('hidden');

        // Update nav items
        document.querySelectorAll('.nav-item').forEach(btn => {
            const target = btn.getAttribute('data-nav-target');
            if (target === viewName) {
                btn.className = 'nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm transition bg-blue-600 text-white shadow-md shadow-blue-900/40';
            } else {
                btn.className = 'nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm transition text-blue-100 hover:bg-blue-900/40 hover:text-white';
            }
        });

        // Update Page Titles
        const titles = {
            dashboard: ['Dashboard Overview', 'Real-time status and quick management for MR Enterprises storefront.'],
            hero: ['Hero Slider Manager', 'Configure top promotional slides (desktop & mobile banners, target links).'],
            categories: ['Category Manager', 'Organize store catalog into categories with images, descriptions, and sort priorities.'],
            brands: ['Brand Partner Manager', 'Manage brand logos and filter tabs (Havells, Polycab, Anchor, REO, etc.).'],
            products: ['Product Catalog Management', 'Edit prices, wholesale rates, stock quantities, and product images.'],
            gallery: ['Showroom Gallery Manager', 'Showcase physical store images with lightbox previews and WhatsApp inquiry CTAs.'],
            sync: ['Backend Bridge & Data Sync', 'Export/Import store JSON and integrate with REST API backend.']
        };

        if (titles[viewName]) {
            document.getElementById('page-title').textContent = titles[viewName][0];
            document.getElementById('page-subtitle').textContent = titles[viewName][1];
        }

        // Close mobile sidebar on navigate
        const sidebar = document.getElementById('admin-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (sidebar && backdrop && window.innerWidth < 1024) {
            sidebar.classList.add('-translate-x-full');
            backdrop.classList.add('hidden');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateBadgeCounts() {
        const counts = {
            'badge-hero-count': this.data.heroSlides.length,
            'badge-category-count': this.data.categories.length,
            'badge-brand-count': this.data.brands.length,
            'badge-product-count': this.data.products.length,
            'badge-gallery-count': this.data.gallery.length,
            'stat-products-count': this.data.products.length,
            'stat-categories-count': this.data.categories.length,
            'stat-brands-count': this.data.brands.length,
            'stat-hero-count': this.data.heroSlides.length,
            'stat-gallery-count': this.data.gallery.length
        };

        for (const [id, val] of Object.entries(counts)) {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        }
    }

    renderAll() {
        this.updateBadgeCounts();
        this.populateDropdownOptions();
        this.renderHeroSlides();
        this.renderCategories();
        this.renderBrands();
        this.renderProductsTable();
        this.renderGallery();
        this.renderDashboardRecent();
    }

    populateDropdownOptions() {
        // Products category filter & form select
        const catFilter = document.getElementById('product-category-filter');
        const prodCat = document.getElementById('prod-category');
        if (catFilter) {
            const current = catFilter.value;
            catFilter.innerHTML = '<option value="">All Categories</option>' +
                this.data.categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
            catFilter.value = current;
        }
        if (prodCat) {
            prodCat.innerHTML = this.data.categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
        }

        // Products brand filter & form select
        const brandFilter = document.getElementById('product-brand-filter');
        const prodBrand = document.getElementById('prod-brand');
        if (brandFilter) {
            const current = brandFilter.value;
            brandFilter.innerHTML = '<option value="">All Brands</option>' +
                this.data.brands.map(b => `<option value="${b.slug}">${b.name}</option>`).join('');
            brandFilter.value = current;
        }
        if (prodBrand) {
            prodBrand.innerHTML = this.data.brands.map(b => `<option value="${b.slug}">${b.name}</option>`).join('');
        }
    }

    // ====================================================
    // HERO SLIDES
    // ====================================================
    renderHeroSlides() {
        const container = document.getElementById('hero-slides-container');
        if (!container) return;

        container.innerHTML = this.data.heroSlides.map((slide, idx) => `
            <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
                <div>
                    <div class="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <span class="text-xs font-black text-slate-800 flex items-center gap-2">
                            <span class="w-5 h-5 rounded-full bg-yellow-400 text-black text-[10px] font-black flex items-center justify-center">#${slide.order || idx + 1}</span>
                            <span>Slide ID: ${slide.id}</span>
                        </span>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${slide.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                            ${slide.active ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <div class="aspect-[16/6] bg-slate-900 relative overflow-hidden group">
                        <img src="${slide.desktop}" alt="${slide.title}" class="w-full h-full object-cover">
                        <div class="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                            Desktop View
                        </div>
                    </div>

                    <div class="p-4 space-y-2 text-xs">
                        <h3 class="font-bold text-slate-900">${slide.title}</h3>
                        <div class="text-[11px] text-slate-500 font-mono truncate">
                            <i class="bi bi-link-45deg"></i> Link: ${slide.link || '#products'}
                        </div>
                        <div class="text-[11px] text-slate-500 font-mono truncate">
                            <i class="bi bi-phone"></i> Mobile: ${slide.mobile}
                        </div>
                    </div>
                </div>

                <div class="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <button type="button" onclick="adminApp.toggleHeroActive('${slide.id}')" class="text-xs font-bold ${slide.active ? 'text-amber-600 hover:text-amber-700' : 'text-emerald-600 hover:text-emerald-700'}">
                        <i class="bi ${slide.active ? 'bi-pause-circle' : 'bi-play-circle'}"></i> ${slide.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <div class="flex items-center gap-1.5">
                        <button type="button" onclick="adminApp.editHero('${slide.id}')" class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs">
                            <i class="bi bi-pencil-square"></i> Edit
                        </button>
                        <button type="button" onclick="adminApp.deleteHero('${slide.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    editHero(id) {
        const slide = this.data.heroSlides.find(s => s.id === id);
        if (!slide) return;
        document.getElementById('hero-id').value = slide.id;
        document.getElementById('hero-title').value = slide.title;
        document.getElementById('hero-desktop').value = slide.desktop;
        document.getElementById('hero-mobile').value = slide.mobile;
        document.getElementById('hero-link').value = slide.link || '#products';
        document.getElementById('hero-order').value = slide.order || 1;
        document.getElementById('hero-preview').src = slide.desktop;
        const mobPreview = document.getElementById('hero-mobile-preview');
        if (mobPreview && slide.mobile) {
            mobPreview.src = slide.mobile;
        }
        document.getElementById('modal-hero-title').textContent = 'Edit Hero Slide';
        this.openModal('hero');
    }

    saveHero(e) {
        e.preventDefault();
        const id = document.getElementById('hero-id').value || `hero_${Date.now()}`;
        const slide = {
            id,
            title: document.getElementById('hero-title').value.trim(),
            desktop: document.getElementById('hero-desktop').value.trim(),
            mobile: document.getElementById('hero-mobile').value.trim(),
            link: document.getElementById('hero-link').value.trim() || '#products',
            order: parseInt(document.getElementById('hero-order').value) || 1,
            active: true
        };

        const existingIdx = this.data.heroSlides.findIndex(s => s.id === id);
        if (existingIdx >= 0) {
            slide.active = this.data.heroSlides[existingIdx].active;
            this.data.heroSlides[existingIdx] = slide;
            this.showToast('Hero slide updated successfully!', 'success');
        } else {
            this.data.heroSlides.push(slide);
            this.showToast('New hero slide added!', 'success');
        }

        this.saveData();
        this.closeModal('hero');
        this.renderHeroSlides();
    }

    toggleHeroActive(id) {
        const slide = this.data.heroSlides.find(s => s.id === id);
        if (!slide) return;
        slide.active = !slide.active;
        this.saveData();
        this.renderHeroSlides();
        this.showToast(`Slide ${slide.active ? 'activated' : 'paused'}`, 'info');
    }

    deleteHero(id) {
        if (!confirm('Are you sure you want to delete this hero slide?')) return;
        this.data.heroSlides = this.data.heroSlides.filter(s => s.id !== id);
        this.saveData();
        this.renderHeroSlides();
        this.showToast('Hero slide deleted', 'info');
    }

    // ====================================================
    // CATEGORIES
    // ====================================================
    renderCategories() {
        const container = document.getElementById('categories-container');
        if (!container) return;

        container.innerHTML = this.data.categories.map(cat => {
            const prodCount = this.data.products.filter(p => p.category === cat.slug).length;
            return `
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                    <div>
                        <div class="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                            <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover">
                            <div class="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                                ${prodCount} Products
                            </div>
                        </div>

                        <div class="p-4 space-y-1">
                            <h3 class="font-black text-slate-900 text-sm">${cat.name}</h3>
                            <div class="text-[11px] text-amber-600 font-bold">${cat.count || 'Explore Collection'}</div>
                            <div class="text-[10px] text-slate-400 font-mono">Slug: #${cat.slug}</div>
                        </div>
                    </div>

                    <div class="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-1.5">
                        <button type="button" onclick="adminApp.editCategory('${cat.id}')" class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs">
                            <i class="bi bi-pencil-square"></i> Edit
                        </button>
                        <button type="button" onclick="adminApp.deleteCategory('${cat.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    editCategory(id) {
        const cat = this.data.categories.find(c => c.id === id);
        if (!cat) return;
        document.getElementById('cat-id').value = cat.id;
        document.getElementById('cat-name').value = cat.name;
        document.getElementById('cat-slug').value = cat.slug;
        document.getElementById('cat-count').value = cat.count || '';
        document.getElementById('cat-image').value = cat.image;
        document.getElementById('cat-preview').src = cat.image;
        document.getElementById('modal-category-title').textContent = 'Edit Category';
        this.openModal('category');
    }

    saveCategory(e) {
        e.preventDefault();
        const id = document.getElementById('cat-id').value || `cat_${Date.now()}`;
        const cat = {
            id,
            name: document.getElementById('cat-name').value.trim(),
            slug: document.getElementById('cat-slug').value.trim().toLowerCase().replace(/\s+/g, '-'),
            count: document.getElementById('cat-count').value.trim() || 'Explore Items',
            image: document.getElementById('cat-image').value.trim()
        };

        const existingIdx = this.data.categories.findIndex(c => c.id === id);
        if (existingIdx >= 0) {
            this.data.categories[existingIdx] = cat;
            this.showToast('Category updated successfully!', 'success');
        } else {
            this.data.categories.push(cat);
            this.showToast('New category created!', 'success');
        }

        this.saveData();
        this.closeModal('category');
        this.renderCategories();
        this.populateDropdownOptions();
    }

    deleteCategory(id) {
        if (!confirm('Are you sure you want to delete this category?')) return;
        this.data.categories = this.data.categories.filter(c => c.id !== id);
        this.saveData();
        this.renderCategories();
        this.populateDropdownOptions();
        this.showToast('Category deleted', 'info');
    }

    // ====================================================
    // BRANDS
    // ====================================================
    renderBrands() {
        const container = document.getElementById('brands-container');
        if (!container) return;

        container.innerHTML = this.data.brands.map(brand => {
            const count = this.data.products.filter(p => p.brand === brand.slug).length;
            return `
                <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between hover:shadow-md transition">
                    <div>
                        <div class="h-16 flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 mb-3">
                            ${brand.image ? `
                                <img src="${brand.image}" alt="${brand.name}" class="max-h-full max-w-full object-contain">
                            ` : `
                                <span class="font-black text-slate-800 text-base uppercase tracking-wider">${brand.name}</span>
                            `}
                        </div>

                        <div class="space-y-1">
                            <h3 class="font-black text-slate-900 text-sm">${brand.name}</h3>
                            <div class="text-[10px] text-slate-400 font-mono">Tab Slug: ${brand.slug}</div>
                            <div class="text-[11px] text-cyan-700 font-bold">${count} Products linked</div>
                        </div>
                    </div>

                    <div class="pt-3 border-t border-slate-100 mt-3 flex items-center justify-end gap-1.5">
                        <button type="button" onclick="adminApp.editBrand('${brand.id}')" class="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs">
                            <i class="bi bi-pencil-square"></i> Edit
                        </button>
                        <button type="button" onclick="adminApp.deleteBrand('${brand.id}')" class="px-2 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    editBrand(id) {
        const brand = this.data.brands.find(b => b.id === id);
        if (!brand) return;
        document.getElementById('brand-id').value = brand.id;
        document.getElementById('brand-name').value = brand.name;
        document.getElementById('brand-slug').value = brand.slug;
        document.getElementById('brand-image').value = brand.image || '';
        const brandPreview = document.getElementById('brand-preview');
        if (brandPreview) {
            brandPreview.src = brand.image || 'assets/images/brands/01M2F41CSD7QBZNXRSGZXFGX07.webp';
        }
        document.getElementById('modal-brand-title').textContent = 'Edit Brand';
        this.openModal('brand');
    }

    saveBrand(e) {
        e.preventDefault();
        const id = document.getElementById('brand-id').value || `brand_${Date.now()}`;
        const brand = {
            id,
            name: document.getElementById('brand-name').value.trim(),
            slug: document.getElementById('brand-slug').value.trim().toLowerCase().replace(/\s+/g, '-'),
            image: document.getElementById('brand-image').value.trim(),
            active: true
        };

        const existingIdx = this.data.brands.findIndex(b => b.id === id);
        if (existingIdx >= 0) {
            this.data.brands[existingIdx] = brand;
            this.showToast('Brand updated successfully!', 'success');
        } else {
            this.data.brands.push(brand);
            this.showToast('New brand added!', 'success');
        }

        this.saveData();
        this.closeModal('brand');
        this.renderBrands();
        this.populateDropdownOptions();
    }

    deleteBrand(id) {
        if (!confirm('Are you sure you want to delete this brand?')) return;
        this.data.brands = this.data.brands.filter(b => b.id !== id);
        this.saveData();
        this.renderBrands();
        this.populateDropdownOptions();
        this.showToast('Brand removed', 'info');
    }

    // ====================================================
    // PRODUCTS TABLE
    // ====================================================
    renderProductsTable() {
        const tbody = document.getElementById('products-table-body');
        if (!tbody) return;

        const q = (document.getElementById('product-search-input')?.value || '').toLowerCase().trim();
        const catFilter = document.getElementById('product-category-filter')?.value || '';
        const brandFilter = document.getElementById('product-brand-filter')?.value || '';
        const stockFilter = document.getElementById('product-stock-filter')?.value || '';

        const filtered = this.data.products.filter(p => {
            const matchesQ = !q || p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
            const matchesCat = !catFilter || p.category === catFilter;
            const matchesBrand = !brandFilter || p.brand === brandFilter;
            const matchesStock = !stockFilter || p.stock === stockFilter;
            return matchesQ && matchesCat && matchesBrand && matchesStock;
        });

        document.getElementById('table-filtered-count').textContent = filtered.length;

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-10 text-slate-400">
                        <i class="bi bi-inbox text-3xl block mb-2"></i>
                        No products match your filter criteria.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(p => {
            const brandObj = this.data.brands.find(b => b.slug === p.brand) || { name: p.brand };
            const catObj = this.data.categories.find(c => c.slug === p.category) || { name: p.category };
            const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

            const stockLabels = {
                in_stock: '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">In Stock</span>',
                low_stock: '<span class="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-bold">Low Stock</span>',
                out_of_stock: '<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">Out of Stock</span>'
            };

            return `
                <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                    <td class="py-3 px-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
                            </div>
                            <div class="min-w-0 max-w-xs">
                                <div class="font-bold text-slate-900 truncate">${p.title}</div>
                                <div class="text-[10px] text-slate-400 font-mono">ID: ${p.id}</div>
                            </div>
                        </div>
                    </td>
                    <td class="py-3 px-4">
                        <span class="font-bold uppercase text-slate-700">${brandObj.name}</span>
                    </td>
                    <td class="py-3 px-4">
                        <span class="text-slate-600">${catObj.name}</span>
                    </td>
                    <td class="py-3 px-4 font-black text-slate-900">
                        ₹${p.price.toLocaleString('en-IN')}
                    </td>
                    <td class="py-3 px-4 text-slate-400 line-through">
                        ₹${p.mrp.toLocaleString('en-IN')}
                        ${discount > 0 ? `<span class="ml-1 text-emerald-600 font-bold no-underline text-[10px]">(${discount}% off)</span>` : ''}
                    </td>
                    <td class="py-3 px-4">
                        ${p.badge ? `<span class="px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[9px] font-black">${p.badge}</span>` : '<span class="text-slate-300">-</span>'}
                    </td>
                    <td class="py-3 px-4">
                        ${stockLabels[p.stock] || stockLabels.in_stock}
                    </td>
                    <td class="py-3 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            <button type="button" onclick="adminApp.editProduct('${p.id}')" class="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Edit">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button type="button" onclick="adminApp.deleteProduct('${p.id}')" class="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition" title="Delete">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    editProduct(id) {
        const p = this.data.products.find(item => item.id === id);
        if (!p) return;
        document.getElementById('prod-id').value = p.id;
        document.getElementById('prod-title').value = p.title;
        document.getElementById('prod-brand').value = p.brand;
        document.getElementById('prod-category').value = p.category;
        document.getElementById('prod-price').value = p.price;
        document.getElementById('prod-mrp').value = p.mrp;
        document.getElementById('prod-badge').value = p.badge || '';
        document.getElementById('prod-stock').value = p.stock || 'in_stock';
        document.getElementById('prod-image').value = p.image;
        document.getElementById('prod-preview').src = p.image;
        document.getElementById('modal-product-title').textContent = 'Edit Product';
        this.openModal('product');
    }

    saveProduct(e) {
        e.preventDefault();
        const id = document.getElementById('prod-id').value || `prod_${Date.now()}`;
        const p = {
            id,
            title: document.getElementById('prod-title').value.trim(),
            brand: document.getElementById('prod-brand').value,
            category: document.getElementById('prod-category').value,
            price: parseFloat(document.getElementById('prod-price').value) || 0,
            mrp: parseFloat(document.getElementById('prod-mrp').value) || 0,
            badge: document.getElementById('prod-badge').value,
            stock: document.getElementById('prod-stock').value,
            image: document.getElementById('prod-image').value.trim()
        };

        const existingIdx = this.data.products.findIndex(item => item.id === id);
        if (existingIdx >= 0) {
            this.data.products[existingIdx] = p;
            this.showToast('Product updated successfully!', 'success');
        } else {
            this.data.products.unshift(p);
            this.showToast('New product added to catalog!', 'success');
        }

        this.saveData();
        this.closeModal('product');
        this.renderProductsTable();
        this.renderDashboardRecent();
    }

    deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        this.data.products = this.data.products.filter(p => p.id !== id);
        this.saveData();
        this.renderProductsTable();
        this.renderDashboardRecent();
        this.showToast('Product deleted from catalog', 'info');
    }

    // ====================================================
    // STORE GALLERY
    // ====================================================
    renderGallery() {
        const container = document.getElementById('gallery-container');
        if (!container) return;

        container.innerHTML = this.data.gallery.map(item => `
            <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                <div>
                    <div class="aspect-[16/8] bg-slate-900 relative overflow-hidden">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                        <div class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-blue-600/90 text-white text-[10px] font-bold">
                            ${item.tag}
                        </div>
                    </div>

                    <div class="p-4 space-y-1">
                        <h3 class="font-bold text-slate-900 text-xs">${item.title}</h3>
                        <p class="text-[11px] text-slate-500">${item.desc}</p>
                    </div>
                </div>

                <div class="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-1.5">
                    <button type="button" onclick="adminApp.editGallery('${item.id}')" class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs">
                        <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button type="button" onclick="adminApp.deleteGallery('${item.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    editGallery(id) {
        const item = this.data.gallery.find(g => g.id === id);
        if (!item) return;
        document.getElementById('gal-id').value = item.id;
        document.getElementById('gal-title').value = item.title;
        document.getElementById('gal-tag').value = item.tag;
        document.getElementById('gal-desc').value = item.desc || '';
        document.getElementById('gal-image').value = item.image;
        document.getElementById('gal-preview').src = item.image;
        document.getElementById('modal-gallery-title').textContent = 'Edit Gallery Item';
        this.openModal('gallery');
    }

    saveGallery(e) {
        e.preventDefault();
        const id = document.getElementById('gal-id').value || `gal_${Date.now()}`;
        const item = {
            id,
            title: document.getElementById('gal-title').value.trim(),
            tag: document.getElementById('gal-tag').value.trim(),
            desc: document.getElementById('gal-desc').value.trim(),
            image: document.getElementById('gal-image').value.trim()
        };

        const existingIdx = this.data.gallery.findIndex(g => g.id === id);
        if (existingIdx >= 0) {
            this.data.gallery[existingIdx] = item;
            this.showToast('Gallery item updated!', 'success');
        } else {
            this.data.gallery.push(item);
            this.showToast('New gallery image added!', 'success');
        }

        this.saveData();
        this.closeModal('gallery');
        this.renderGallery();
    }

    deleteGallery(id) {
        if (!confirm('Are you sure you want to delete this gallery item?')) return;
        this.data.gallery = this.data.gallery.filter(g => g.id !== id);
        this.saveData();
        this.renderGallery();
        this.showToast('Gallery item removed', 'info');
    }

    // ====================================================
    // DASHBOARD RECENT PRODUCTS
    // ====================================================
    renderDashboardRecent() {
        const tbody = document.getElementById('dashboard-recent-products');
        if (!tbody) return;

        const recent = this.data.products.slice(0, 5);
        tbody.innerHTML = recent.map(p => `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
                        </div>
                        <span class="font-bold text-slate-900 truncate max-w-[200px]">${p.title}</span>
                    </div>
                </td>
                <td class="py-3 px-4 font-bold uppercase text-slate-700">${p.brand}</td>
                <td class="py-3 px-4 text-slate-600">${p.category}</td>
                <td class="py-3 px-4 font-black text-slate-900">₹${p.price.toLocaleString('en-IN')}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded-full ${p.stock === 'in_stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'} text-[10px] font-bold">
                        ${p.stock === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                </td>
                <td class="py-3 px-4 text-right">
                    <button type="button" onclick="adminApp.editProduct('${p.id}')" class="text-xs font-bold text-blue-600 hover:text-blue-700">
                        Edit
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // ====================================================
    // MODAL HELPERS & FILE UPLOAD
    // ====================================================
    openModal(modalKey) {
        const modal = document.getElementById(`modal-${modalKey}`);
        if (!modal) return;
        modal.classList.remove('hidden');

        // If opening empty add modal, reset form and image previews
        const form = document.getElementById(`form-${modalKey}`);
        if (form && !form.querySelector('input[type="hidden"]')?.value) {
            form.reset();
            const previews = {
                hero: () => {
                    const hp = document.getElementById('hero-preview');
                    const hmp = document.getElementById('hero-mobile-preview');
                    if (hp) hp.src = 'assets/images/banners/01M2DATJWCE0W85RAQES221FXK.webp';
                    if (hmp) hmp.src = 'assets/images/banners/01M2DATJWNHQB2RS6B86DJSQWZ.webp';
                },
                category: () => {
                    const cp = document.getElementById('cat-preview');
                    if (cp) cp.src = 'assets/images/categories/01M2DDZ2M55W08YSDHWMFH1QBY.webp';
                },
                brand: () => {
                    const bp = document.getElementById('brand-preview');
                    if (bp) bp.src = 'assets/images/brands/01M2F41CSD7QBZNXRSGZXFGX07.webp';
                },
                product: () => {
                    const pp = document.getElementById('prod-preview');
                    if (pp) pp.src = 'assets/images/category-placeholder.jpg';
                },
                gallery: () => {
                    const gp = document.getElementById('gal-preview');
                    if (gp) gp.src = 'assets/images/store_gallery/01M2FVTW9JA063B748QQG10K5G.webp';
                }
            };
            if (previews[modalKey]) previews[modalKey]();
        }
    }

    closeModal(modalKey) {
        const modal = document.getElementById(`modal-${modalKey}`);
        if (!modal) return;
        modal.classList.add('hidden');

        // Clear hidden ID so next open is clean
        const hiddenId = modal.querySelector('input[type="hidden"]');
        if (hiddenId) hiddenId.value = '';
    }

    handleImageUpload(e, inputTargetId, previewImgId) {
        const file = e.target.files ? e.target.files[0] : (e.dataTransfer ? e.dataTransfer.files[0] : null);
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showToast('Please select a valid image file (PNG, JPG, WebP, SVG)', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showToast('Image size exceeds 5MB. Please choose a smaller image.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            const dataUrl = loadEvent.target.result;
            const input = document.getElementById(inputTargetId);
            const preview = document.getElementById(previewImgId);
            if (input) input.value = dataUrl;
            if (preview) preview.src = dataUrl;
            this.showToast(`Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, 'success');
        };
        reader.readAsDataURL(file);
    }

    // ====================================================
    // JSON EXPORT / IMPORT / RESET
    // ====================================================
    exportDataJSON() {
        const jsonStr = JSON.stringify(this.data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mr_enterprises_store_data_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast('store_data.json exported successfully!', 'success');
    }

    importDataJSON(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (parsed.products && parsed.categories && parsed.brands && parsed.heroSlides) {
                    this.data = parsed;
                    this.saveData();
                    this.renderAll();
                    this.showToast('Store data imported and synced successfully!', 'success');
                } else {
                    this.showToast('Invalid store data format in JSON', 'error');
                }
            } catch (err) {
                console.error(err);
                this.showToast('Failed to parse JSON file', 'error');
            }
        };
        reader.readAsText(file);
        e.target.value = ''; // Reset input
    }

    resetToFactoryDefaults() {
        if (!confirm('Are you sure you want to reset all store data back to default factory items? Any custom items will be overwritten.')) return;
        this.data = JSON.parse(JSON.stringify(DEFAULT_STORE_DATA));
        this.saveData();
        this.renderAll();
        this.showToast('Store data reset to default catalog!', 'info');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const icons = {
            success: 'bi-check-circle-fill text-emerald-400',
            error: 'bi-x-circle-fill text-red-400',
            info: 'bi-info-circle-fill text-blue-400'
        };

        const toast = document.createElement('div');
        toast.className = 'pointer-events-auto bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-bold transition-all transform translate-y-2 opacity-0 duration-200';
        toast.innerHTML = `
            <i class="bi ${icons[type] || icons.info} text-base"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-2', 'opacity-0');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.add('translate-y-2', 'opacity-0');
            setTimeout(() => {
                if (toast.parentElement) toast.parentElement.removeChild(toast);
            }, 200);
        }, 3200);
    }
}

// Global initialization
window.adminApp = new AdminApp();
