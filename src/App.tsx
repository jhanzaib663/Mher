import React, { useState, useMemo, useCallback } from 'react';
import { PRODUCTS } from './data/products';
import { CATEGORIES } from './data/categories';
import { Product, CartItem, FilterOptions } from './types';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { BrandStrip } from './components/BrandStrip';
import { CategoryCard } from './components/CategoryCard';
import { ProductGrid } from './components/ProductGrid';
import { PromoBanner } from './components/PromoBanner';
import { BenefitsStrip } from './components/BenefitsStrip';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { ContactModal } from './components/ContactModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Initial cart with 2 items to match the reference screenshot badge (count: 2)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Nike Air Force 1 '07
      size: 9.5,
      quantity: 1,
    },
    {
      product: PRODUCTS[3], // New Balance 530
      size: 9,
      quantity: 1,
    },
  ]);

  // Initial wishlist items (e.g. Air Jordan 1 Mid)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set([PRODUCTS[2].id])
  );

  // Active navigation tab
  const [activeNav, setActiveNav] = useState('All');

  // Filters State
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    brand: 'All',
    gender: 'All',
    searchQuery: '',
    sortBy: 'featured',
    priceRange: [0, 500],
    onlySale: false,
  });

  // Modal / Drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (type: ToastMessage['type'], title: string, message?: string) => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query across name, brand, category, gender
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesGender = product.gender.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesGender) {
          return false;
        }
      }

      // Category filter (case-insensitive)
      if (
        filters.category !== 'All' &&
        product.category.toLowerCase() !== filters.category.toLowerCase()
      ) {
        return false;
      }

      // Brand filter
      if (
        filters.brand !== 'All' &&
        product.brand.toLowerCase() !== filters.brand.toLowerCase()
      ) {
        return false;
      }

      // Gender filter (e.g. 'Men' matches 'Men' and 'Unisex'; 'Kids' matches 'Kids')
      if (filters.gender !== 'All') {
        if (filters.gender === 'Kids') {
          if (product.gender !== 'Kids') return false;
        } else if (filters.gender === 'Men') {
          if (product.gender !== 'Men' && product.gender !== 'Unisex') return false;
        } else if (filters.gender === 'Women') {
          if (product.gender !== 'Women' && product.gender !== 'Unisex') return false;
        }
      }

      // Sale only
      if (filters.onlySale && !product.isSale) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' preserves curated mock order
    });
  }, [filters]);

  // Wishlist products array
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.has(p.id));
  }, [wishlistIds]);

  // Total cart items count
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  // Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        addToast('wishlist', 'Removed from Wishlist', product.name);
      } else {
        next.add(product.id);
        addToast('wishlist', 'Added to Wishlist', product.name);
      }
      return next;
    });
  };

  const handleAddToCart = (product: Product, size: number, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    addToast('cart', 'Added to Shopping Bag', `${product.name} (US ${size})`);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[2] || product.sizes[0] || 9;
    handleAddToCart(product, defaultSize, 1);
  };

  const handleUpdateCartQuantity = (productId: string, size: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: number) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleMoveWishlistToCart = (product: Product) => {
    const defaultSize = product.sizes[2] || product.sizes[0] || 9;
    handleAddToCart(product, defaultSize, 1);
    handleToggleWishlist(product);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      brand: 'All',
      gender: 'All',
      searchQuery: '',
      sortBy: 'featured',
      priceRange: [0, 500],
      onlySale: false,
    });
    setActiveNav('All');
  };

  const scrollToProducts = () => {
    const el = document.getElementById('featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBrands = () => {
    const el = document.getElementById('top-brands');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavSelect = (item: string) => {
    setActiveNav(item);
    if (item === 'Sale') {
      setFilters((prev) => ({ ...prev, onlySale: true, gender: 'All', category: 'All' }));
      scrollToProducts();
    } else if (item === 'New Arrivals') {
      setFilters((prev) => ({ ...prev, onlySale: false, gender: 'All', category: 'All' }));
      scrollToProducts();
    } else if (item === 'Brands') {
      scrollToBrands();
    } else if (item === 'Men' || item === 'Women' || item === 'Kids') {
      setFilters((prev) => ({ ...prev, gender: item, onlySale: false }));
      scrollToProducts();
    } else {
      handleResetFilters();
    }
  };

  const handleSelectCategory = (categorySlug: Product['category']) => {
    if (filters.category.toLowerCase() === categorySlug.toLowerCase()) {
      setFilters((prev) => ({ ...prev, category: 'All' }));
    } else {
      setFilters((prev) => ({ ...prev, category: categorySlug }));
      scrollToProducts();
    }
  };

  const handleSelectBrand = (brandSlug: Product['brand']) => {
    if (filters.brand.toLowerCase() === brandSlug.toLowerCase()) {
      setFilters((prev) => ({ ...prev, brand: 'All' }));
    } else {
      setFilters((prev) => ({ ...prev, brand: brandSlug }));
      scrollToProducts();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans selection:bg-[#C7F000] selection:text-black">
      {/* 1. Header with Search, Wishlist, Cart & Account */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => {
          setFilters((prev) => ({ ...prev, searchQuery: query }));
          if (query) scrollToProducts();
        }}
        onSelectNav={handleNavSelect}
        activeNav={activeNav}
      />

      {/* Main Container constrained to standard max-width 1440px with responsive side padding */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* 2. Dramatic Focal Point Hero Carousel */}
        <HeroSlider
          onShopNow={scrollToProducts}
          onExploreBrands={scrollToBrands}
        />

        {/* 3. Top Brands Row */}
        <div id="top-brands" className="scroll-mt-20">
          <BrandStrip
            selectedBrand={filters.brand}
            onSelectBrand={handleSelectBrand}
            onViewAll={() => {
              setFilters((prev) => ({ ...prev, brand: 'All' }));
              scrollToProducts();
            }}
          />
        </div>

        {/* 4. Shop By Category (7 cards in a row) */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101112]">
              SHOP BY CATEGORY
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isSelected={filters.category.toLowerCase() === cat.slug.toLowerCase()}
                onSelect={handleSelectCategory}
              />
            ))}
          </div>
        </section>

        {/* 5. Featured Products Grid (5 columns desktop, full filter system, wishlist, quick add) */}
        <ProductGrid
          products={filteredProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={handleQuickAdd}
          filters={filters}
          onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
          onResetFilters={handleResetFilters}
          onViewAll={handleResetFilters}
        />

        {/* 6. Promotional Banners (Just Dropped & Up to 40% Off) */}
        <PromoBanner
          onShopNewArrivals={() => {
            setFilters((prev) => ({ ...prev, category: 'All', brand: 'All', onlySale: false }));
            scrollToProducts();
          }}
          onShopSale={() => {
            setFilters((prev) => ({ ...prev, onlySale: true }));
            scrollToProducts();
          }}
        />

        {/* 7. Benefits / Trust Strip */}
        <BenefitsStrip />
      </main>

      {/* 8. Comprehensive Dark Footer */}
      <Footer
        onNavClick={handleNavSelect}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onCompleteOrder={() => {
          setCartItems([]);
        }}
      />

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenWishlist={() => {
          setIsWishlistOpen(true);
        }}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
