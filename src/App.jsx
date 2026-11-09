import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Scissors, Package, ShoppingBag, BarChart3, Users, Plus, Search, 
  AlertTriangle, Trash2, CheckCircle2, Globe, Sun, Moon, ArrowRight,
  TrendingUp, DollarSign, Layers, ShieldCheck, RefreshCw, X, CreditCard, Banknote, Smartphone
} from 'lucide-react';

/* ==========================================
   INTERNACIONALIZACIÓN Y PAÍSES (10 PAÍSES)
   ========================================== */
const COUNTRIES = [
  { code: 'ES', name: 'España', currency: 'EUR', symbol: '€', locale: 'es-ES' },
  { code: 'US', name: 'Estados Unidos', currency: 'USD', symbol: '$', locale: 'en-US' },
  { code: 'FR', name: 'Francia', currency: 'EUR', symbol: '€', locale: 'fr-FR' },
  { code: 'GB', name: 'Reino Unido', currency: 'GBP', symbol: '£', locale: 'en-GB' },
  { code: 'IT', name: 'Italia', currency: 'EUR', symbol: '€', locale: 'it-IT' },
  { code: 'JP', name: 'Japón', currency: 'JPY', symbol: '¥', locale: 'ja-JP' },
  { code: 'CA', name: 'Canadá', currency: 'CAD', symbol: '$', locale: 'en-CA' },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: '$', locale: 'en-AU' },
  { code: 'CH', name: 'Suiza', currency: 'CHF', symbol: 'CHF', locale: 'de-CH' },
  { code: 'MX', name: 'México', currency: 'MXN', symbol: '$', locale: 'es-MX' }
];

const TRANSLATIONS = {
  es: {
    brand: "Maison Atelier",
    subtitle: "Haute-Couture ERP",
    dashboard: "Dashboard",
    catalog: "Catálogo & Stock",
    pos: "Punto de Venta",
    ledger: "Ventas & CRM",
    totalRevenue: "Ingresos Totales",
    activeStock: "Stock Activo",
    activeModels: "Modelos Activos",
    lowStockAlert: "Alertas Stock Bajo",
    newProduct: "Nueva Prenda",
    searchPlaceholder: "Buscar por modelo, SKU o color...",
    sizes: "Tallas",
    colors: "Colores",
    price: "Precio",
    actions: "Acciones",
    stock: "Inventario",
    category: "Categoría",
    sku: "SKU",
    cart: "Bolsa de Venta",
    emptyCart: "La bolsa de venta está vacía",
    checkout: "Procesar Venta",
    paymentMethod: "Método de Pago",
    card: "Tarjeta",
    cash: "Efectivo",
    mobilePay: "Bizum / Móvil",
    successSale: "¡Venta completada con éxito!",
    cancel: "Cancelar",
    save: "Guardar",
    name: "Nombre del Modelo",
    client: "Cliente",
    date: "Fecha",
    total: "Total",
    status: "Estado",
    completed: "Completado",
    restock: "Reabastecer",
    adjust: "Ajustar",
    all: "Todos",
    dresses: "Vestidos",
    outerwear: "Abrigos",
    knitwear: "Punto",
    accessories: "Accesorios"
  },
  en: {
    brand: "Maison Atelier",
    subtitle: "Haute-Couture ERP",
    dashboard: "Dashboard",
    catalog: "Catalog & Stock",
    pos: "Point of Sale",
    ledger: "Sales & CRM",
    totalRevenue: "Total Revenue",
    activeStock: "Active Stock",
    activeModels: "Active Models",
    lowStockAlert: "Low Stock Alerts",
    newProduct: "New Garment",
    searchPlaceholder: "Search model, SKU or color...",
    sizes: "Sizes",
    colors: "Colors",
    price: "Price",
    actions: "Actions",
    stock: "Inventory",
    category: "Category",
    sku: "SKU",
    cart: "Shopping Bag",
    emptyCart: "Shopping bag is empty",
    checkout: "Process Checkout",
    paymentMethod: "Payment Method",
    card: "Card",
    cash: "Cash",
    mobilePay: "Mobile Pay",
    successSale: "Sale completed successfully!",
    cancel: "Cancel",
    save: "Save",
    name: "Model Name",
    client: "Client",
    date: "Date",
    total: "Total",
    status: "Status",
    completed: "Completed",
    restock: "Restock",
    adjust: "Adjust",
    all: "All",
    dresses: "Dresses",
    outerwear: "Outerwear",
    knitwear: "Knitwear",
    accessories: "Accessories"
  },
  fr: {
    brand: "Maison Atelier",
    subtitle: "ERP Haute-Couture",
    dashboard: "Tableau de Bord",
    catalog: "Catalogue & Stock",
    pos: "Point de Vente",
    ledger: "Ventes & CRM",
    totalRevenue: "Revenu Total",
    activeStock: "Stock Actif",
    activeModels: "Modèles Actifs",
    lowStockAlert: "Alertes Stock Faible",
    newProduct: "Nouvelle Pièce",
    searchPlaceholder: "Rechercher modèle, SKU ou couleur...",
    sizes: "Tailles",
    colors: "Couleurs",
    price: "Prix",
    actions: "Actions",
    stock: "Inventaire",
    category: "Catégorie",
    sku: "SKU",
    cart: "Panier d'Achat",
    emptyCart: "Le panier est vide",
    checkout: "Valider la Vente",
    paymentMethod: "Moyen de Paiement",
    card: "Carte",
    cash: "Espèces",
    mobilePay: "Paiement Mobile",
    successSale: "Vente réalisée avec succès !",
    cancel: "Annuler",
    save: "Enregistrer",
    name: "Nom du Modèle",
    client: "Client",
    date: "Date",
    total: "Total",
    status: "Statut",
    completed: "Terminé",
    restock: "Réapprovisionner",
    adjust: "Ajuster",
    all: "Tous",
    dresses: "Robes",
    outerwear: "Manteaux",
    knitwear: "Maille",
    accessories: "Accessoires"
  }
};

/* ==========================================
   SANITIZACIÓN Y VALIDACIÓN DE SEGURIDAD
   ========================================== */
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
};

const validateSku = (sku) => /^[A-Z0-9\-_]{3,20}$/.test(sku);
const validatePrice = (price) => !isNaN(price) && Number(price) > 0;
const validateStock = (stock) => Number.isInteger(Number(stock)) && Number(stock) >= 0;

export default function App() {
  // Estados Globales & Preferencias
  const [lang, setLang] = useState('es');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Estado de Datos con persistencia segura en localStorage
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return [
      { id: '1', name: 'Vestido Midi Seda Pura', category: 'dresses', sku: 'VS-001', price: 680, sizes: ['XS', 'S', 'M', 'L'], colors: ['Noir', 'Ecru'], stock: 14 },
      { id: '2', name: 'Abrigo Lana Cachemira', category: 'outerwear', sku: 'AC-002', price: 1250, sizes: ['S', 'M', 'L'], colors: ['Camel', 'Antracita'], stock: 5 },
      { id: '3', name: 'Cardigan Punto Merinó', category: 'knitwear', sku: 'PM-003', price: 340, sizes: ['XS', 'S', 'M'], colors: ['Marfil', 'Obsidiana'], stock: 22 },
      { id: '4', name: 'Bolso Tote Piel Nappa', category: 'accessories', sku: 'BT-004', price: 890, sizes: ['Única'], colors: ['Cognac', 'Noir'], stock: 8 }
    ];
  });

  const [sales, setSales] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_sales');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading sales from localStorage', e);
    }
    return [
      { id: 's1', date: '2026-06-01', client: 'Elena Vance', items: [{ name: 'Vestido Midi Seda Pura', qty: 1, price: 680 }], total: 680, payment: 'card', status: 'completed' },
      { id: 's2', date: '2026-06-02', client: 'Marc Laurent', items: [{ name: 'Cardigan Punto Merinó', qty: 2, price: 340 }], total: 680, payment: 'mobilePay', status: 'completed' }
    ];
  });

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Formulario nuevo producto
  const [newProd, setNewProd] = useState({ name: '', category: 'dresses', sku: '', price: '', sizes: 'S, M, L', colors: 'Noir, Ecru', stock: '10' });

  // Sincronizar persistencia
  useEffect(() => {
    try {
      localStorage.setItem('maison_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_sales', JSON.stringify(sales));
    } catch (e) {
      console.error('Error saving sales', e);
    }
  }, [sales]);

  // Manejo de Tema Oscuro en HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  const showNotify = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  }, []);

  // Formato de moneda internacional
  const formatMoney = useCallback((amount) => {
    try {
      return new Intl.NumberFormat(country.locale, {
        style: 'currency',
        currency: country.currency
      }).format(amount);
    } catch {
      return `${country.symbol} ${Number(amount).toFixed(2)}`;
    }
  }, [country]);

  // Cálculos Memoizados para Rendimiento Óptimo
  const totalRevenue = useMemo(() => sales.reduce((acc, s) => acc + s.total, 0), [sales]);
  const activeStockCount = useMemo(() => products.reduce((acc, p) => acc + Number(p.stock), 0), [products]);
  const lowStockItems = useMemo(() => products.filter(p => p.stock <= 5), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.colors.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  // Acciones de Carrito & POS
  const addToCart = useCallback((product) => {
    if (product.stock <= 0) {
      showNotify("Stock agotado para este artículo.");
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          showNotify("No hay más stock disponible.");
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, [showNotify]);

  const updateCartQty = useCallback((id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        if (newQty <= 0) return null;
        const prod = products.find(p => p.id === id);
        if (prod && newQty > prod.stock) {
          showNotify("Límite de stock alcanzado.");
          return item;
        }
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(Boolean));
  }, [products, showNotify]);

  const handleCheckout = useCallback((paymentMethod) => {
    if (cart.length === 0) return;
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const newSale = {
      id: 's_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      client: 'Cliente Atelier VIP',
      items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total,
      payment: paymentMethod,
      status: 'completed'
    };

    // Descontar stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.qty) };
      }
      return p;
    }));

    setSales(prev => [newSale, ...prev]);
    setCart([]);
    showNotify(t.successSale);
  }, [cart, showNotify, t.successSale]);

  const adjustStock = useCallback((id, amount) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = Math.max(0, p.stock + amount);
        return { ...p, stock: updated };
      }
      return p;
    }));
  }, []);

  const handleCreateProduct = useCallback((e) => {
    e.preventDefault();
    const cleanName = sanitizeInput(newProd.name);
    const cleanSku = sanitizeInput(newProd.sku).toUpperCase();
    const priceNum = parseFloat(newProd.price);
    const stockNum = parseInt(newProd.stock, 10);

    if (!cleanName || !cleanSku) {
      showNotify("Por favor completa los campos obligatorios.");
      return;
    }
    if (!validateSku(cleanSku)) {
      showNotify("SKU inválido (Usa formato alfanumérico 3-20 caracteres).");
      return;
    }
    if (!validatePrice(priceNum)) {
      showNotify("Precio inválido.");
      return;
    }
    if (!validateStock(stockNum)) {
      showNotify("Stock inválido.");
      return;
    }

    const item = {
      id: 'p_' + Date.now(),
      name: cleanName,
      category: newProd.category,
      sku: cleanSku,
      price: priceNum,
      sizes: newProd.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: newProd.colors.split(',').map(c => c.trim()).filter(Boolean),
      stock: stockNum
    };

    setProducts(prev => [item, ...prev]);
    setIsModalOpen(false);
    setNewProd({ name: '', category: 'dresses', sku: '', price: '', sizes: 'S, M, L', colors: 'Noir, Ecru', stock: '10' });
    showNotify("Prenda registrada correctamente en catálogo.");
  }, [newProd, showNotify]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      
      {/* NOTIFICACIÓN FLOTANTE */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3 text-sm animate-fade-in border border-stone-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER EXCLUSIVO HAUTE-COUTURE */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md bg-opacity-90 transition-colors ${darkMode ? 'bg-stone-900/90 border-stone-800' : 'bg-white/90 border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 flex items-center justify-center shadow-md">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-serif tracking-widest font-semibold uppercase">{t.brand}</h1>
              <p className="text-[10px] tracking-widest uppercase text-stone-500 dark:text-stone-400 font-sans">{t.subtitle}</p>
            </div>
          </div>

          {/* Navegación Principal */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-sm border border-stone-200 dark:border-stone-700">
            {[
              { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
              { id: 'catalog', label: t.catalog, icon: Package },
              { id: 'pos', label: t.pos, icon: ShoppingBag },
              { id: 'ledger', label: t.ledger, icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all rounded-sm ${
                    isActive 
                      ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-sm' 
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controles: País/Divisa, Idioma y Modo */}
          <div className="flex items-center gap-3">
            
            {/* Selector de País & Divisa */}
            <div className="flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 rounded-sm px-2.5 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <select 
                value={country.code}
                onChange={(e) => {
                  const found = COUNTRIES.find(c => c.code === e.target.value);
                  if (found) setCountry(found);
                }}
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code} className="bg-stone-900 text-white">
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Idioma */}
            <div className="border border-stone-300 dark:border-stone-700 rounded-sm px-2 py-1 text-xs">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent font-medium focus:outline-none cursor-pointer uppercase"
              >
                <option value="es" className="bg-stone-900 text-white">ES</option>
                <option value="en" className="bg-stone-900 text-white">EN</option>
                <option value="fr" className="bg-stone-900 text-white">FR</option>
              </select>
            </div>

            {/* Toggle Modo Oscuro / Claro */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 border border-stone-300 dark:border-stone-700 rounded-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Cambiar Modo"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>
          </div>

        </div>
      </header>

      {/* NAVEGACIÓN MÓVIL INFERIOR */}
      <div className="md:hidden flex justify-around border-b border-stone-200 dark:border-stone-800 p-2 bg-white dark:bg-stone-900 sticky top-20 z-30">
        {[
          { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
          { id: 'catalog', label: t.catalog, icon: Package },
          { id: 'pos', label: t.pos, icon: ShoppingBag },
          { id: 'ledger', label: t.ledger, icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 text-[10px] uppercase tracking-wider ${
                isActive ? 'text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* ================= TAB 1: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-serif font-medium tracking-wide">Executive Overview</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Métricas en tiempo real del taller y rendimiento comercial.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-all rounded-sm shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{t.newProduct}</span>
              </button>
            </div>

            {/* Tarjetas KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-6 border rounded-sm transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-4">
                  <span className="text-xs uppercase tracking-widest font-medium">{t.totalRevenue}</span>
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="text-3xl font-serif font-semibold">{formatMoney(totalRevenue)}</div>
                <div className="mt-2 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+12.4% este mes</span>
                </div>
              </div>

              <div className={`p-6 border rounded-sm transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-4">
                  <span className="text-xs uppercase tracking-widest font-medium">{t.activeStock}</span>
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-3xl font-serif font-semibold">{activeStockCount} unidades</div>
                <div className="mt-2 text-stone-500 dark:text-stone-400 text-xs">Inventario global distribuido</div>
              </div>

              <div className={`p-6 border rounded-sm transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-4">
                  <span className="text-xs uppercase tracking-widest font-medium">{t.activeModels}</span>
                  <Package className="w-4 h-4" />
                </div>
                <div className="text-3xl font-serif font-semibold">{products.length} modelos</div>
                <div className="mt-2 text-stone-500 dark:text-stone-400 text-xs">Colección activa de alta costura</div>
              </div>

              <div className={`p-6 border rounded-sm transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 mb-4">
                  <span className="text-xs uppercase tracking-widest font-medium">{t.lowStockAlert}</span>
                  <AlertTriangle className={`w-4 h-4 ${lowStockItems.length > 0 ? 'text-amber-500' : ''}`} />
                </div>
                <div className={`text-3xl font-serif font-semibold ${lowStockItems.length > 0 ? 'text-amber-500' : ''}`}>
                  {lowStockItems.length}
                </div>
                <div className="mt-2 text-stone-500 dark:text-stone-400 text-xs">Requieren reabastecimiento</div>
              </div>
            </div>

            {/* Alertas y Stock Crítico */}
            {lowStockItems.length > 0 && (
              <div className={`p-6 border rounded-sm ${darkMode ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/50 border-amber-200'}`}>
                <h3 className="text-base font-serif font-medium mb-3 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Atención: Prendas con Stock Crítico (≤ 5 unidades)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lowStockItems.map(item => (
                    <div key={item.id} className={`p-4 border rounded-sm flex items-center justify-between ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-amber-100'}`}>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-stone-500">SKU: {item.sku}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-amber-600 font-bold text-sm">{item.stock} u.</span>
                        <button 
                          onClick={() => adjustStock(item.id, 5)}
                          className="px-2.5 py-1 text-xs bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-sm hover:opacity-85"
                          title="+5 unidades"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: CATÁLOGO Y STOCK ================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-serif font-medium tracking-wide">{t.catalog}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Gestión de matriz de tallas, colores y existencias en tiempo real.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-all rounded-sm shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{t.newProduct}</span>
              </button>
            </div>

            {/* Filtros y Buscador */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input 
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                    darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {[
                  { id: 'all', label: t.all },
                  { id: 'dresses', label: t.dresses },
                  { id: 'outerwear', label: t.outerwear },
                  { id: 'knitwear', label: t.knitwear },
                  { id: 'accessories', label: t.accessories }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 text-xs uppercase tracking-wider rounded-sm border transition-colors whitespace-nowrap ${
                      selectedCategory === cat.id 
                        ? 'bg-stone-900 text-stone-100 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 font-medium' 
                        : darkMode ? 'border-stone-800 text-stone-400 hover:text-stone-100' : 'border-stone-300 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabla de Catálogo */}
            <div className={`border rounded-sm overflow-hidden ${darkMode ? 'border-stone-800 bg-stone-900' : 'border-stone-200 bg-white shadow-xs'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[11px] uppercase tracking-wider font-semibold ${darkMode ? 'border-stone-800 text-stone-400 bg-stone-950/50' : 'border-stone-200 text-stone-500 bg-stone-50'}`}>
                      <th className="p-4">{t.name} / {t.sku}</th>
                      <th className="p-4">{t.category}</th>
                      <th className="p-4">{t.sizes} & {t.colors}</th>
                      <th className="p-4">{t.price}</th>
                      <th className="p-4">{t.stock}</th>
                      <th className="p-4 text-right">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-stone-500">No se encontraron prendas en el catálogo.</td>
                      </tr>
                    ) : (
                      filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium font-serif text-sm">{product.name}</div>
                            <div className="text-[11px] text-stone-500 uppercase tracking-widest">SKU: {product.sku}</div>
                          </td>
                          <td className="p-4 uppercase text-[11px] tracking-wider text-stone-500">
                            {product.category}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {product.sizes.map(s => <span key={s} className="px-1.5 py-0.5 border border-stone-300 dark:border-stone-700 rounded-[2px] text-[10px]">{s}</span>)}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-1">{product.colors.join(', ')}</div>
                          </td>
                          <td className="p-4 font-semibold font-serif text-sm">
                            {formatMoney(product.price)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${product.stock <= 5 ? 'text-amber-500' : ''}`}>
                                {product.stock} u.
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => adjustStock(product.id, 1)}
                                className="p-1.5 border border-stone-300 dark:border-stone-700 rounded-sm hover:bg-stone-100 dark:hover:bg-stone-800"
                                title="Añadir 1 unidad"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => adjustStock(product.id, -1)}
                                className="p-1.5 border border-stone-300 dark:border-stone-700 rounded-sm hover:bg-stone-100 dark:hover:bg-stone-800"
                                title="Descontar 1 unidad"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PUNTO DE VENTA (POS) ================= */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            
            {/* Lista de selección de POS */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-serif font-medium tracking-wide">{t.pos}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Selecciona artículos para procesar la venta inmediata.</p>
              </div>

              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input 
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                    darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className={`p-5 border rounded-sm cursor-pointer transition-all hover:border-stone-900 dark:hover:border-stone-100 flex flex-col justify-between ${
                      darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-stone-500">SKU: {product.sku}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${product.stock > 5 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                          {product.stock} disp.
                        </span>
                      </div>
                      <h3 className="font-serif font-medium text-base mt-2">{product.name}</h3>
                      <div className="text-xs text-stone-500 mt-1">{product.colors.join(', ')}</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                      <span className="font-serif font-semibold text-base">{formatMoney(product.price)}</span>
                      <span className="text-xs uppercase font-medium tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1">
                        Agregar <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen del Carrito / Checkout */}
            <div className={`p-6 border rounded-sm flex flex-col justify-between h-fit ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
              <div>
                <h3 className="text-lg font-serif font-medium border-b pb-3 mb-4 border-stone-200 dark:border-stone-800 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.cart}</span>
                </h3>

                {cart.length === 0 ? (
                  <div className="py-12 text-center text-stone-500 text-xs">{t.emptyCart}</div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between text-xs gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-stone-500">{formatMoney(item.price)} x {item.qty}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => updateCartQty(item.id, -1)} className="w-6 h-6 border rounded-sm flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800">-</button>
                          <span className="w-6 text-center font-semibold">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} className="w-6 h-6 border rounded-sm flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-4">
                  <div className="flex items-center justify-between text-base font-serif font-semibold">
                    <span>{t.total}:</span>
                    <span>{formatMoney(cart.reduce((acc, i) => acc + (i.price * i.qty), 0))}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">{t.paymentMethod}</div>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => handleCheckout('card')}
                        className="flex flex-col items-center gap-1 p-2.5 border rounded-sm text-xs hover:border-stone-900 dark:hover:border-stone-100 transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>{t.card}</span>
                      </button>
                      <button 
                        onClick={() => handleCheckout('cash')}
                        className="flex flex-col items-center gap-1 p-2.5 border rounded-sm text-xs hover:border-stone-900 dark:hover:border-stone-100 transition-colors"
                      >
                        <Banknote className="w-4 h-4" />
                        <span>{t.cash}</span>
                      </button>
                      <button 
                        onClick={() => handleCheckout('mobilePay')}
                        className="flex flex-col items-center gap-1 p-2.5 border rounded-sm text-xs hover:border-stone-900 dark:hover:border-stone-100 transition-colors"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>{t.mobilePay}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 4: VENTAS & CRM ================= */}
        {activeTab === 'ledger' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-serif font-medium tracking-wide">{t.ledger}</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Historial de transacciones de alta costura y registro de clientes.</p>
            </div>

            <div className={`border rounded-sm overflow-hidden ${darkMode ? 'border-stone-800 bg-stone-900' : 'border-stone-200 bg-white shadow-xs'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[11px] uppercase tracking-wider font-semibold ${darkMode ? 'border-stone-800 text-stone-400 bg-stone-950/50' : 'border-stone-200 text-stone-500 bg-stone-50'}`}>
                      <th className="p-4">ID / {t.date}</th>
                      <th className="p-4">{t.client}</th>
                      <th className="p-4">Detalle de Prendas</th>
                      <th className="p-4">{t.paymentMethod}</th>
                      <th className="p-4">{t.total}</th>
                      <th className="p-4 text-right">{t.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
                    {sales.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-stone-500">No hay ventas registradas todavía.</td>
                      </tr>
                    ) : (
                      sales.map(sale => (
                        <tr key={sale.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/50 transition-colors">
                          <td className="p-4">
                            <div className="font-mono font-medium">{sale.id}</div>
                            <div className="text-[11px] text-stone-500">{sale.date}</div>
                          </td>
                          <td className="p-4 font-medium">{sale.client}</td>
                          <td className="p-4">
                            {sale.items.map((it, idx) => (
                              <div key={idx} className="text-stone-600 dark:text-stone-300">
                                {it.qty}x {it.name} ({formatMoney(it.price)})
                              </div>
                            ))}
                          </td>
                          <td className="p-4 uppercase text-[10px] tracking-wider text-stone-500">
                            {sale.payment}
                          </td>
                          <td className="p-4 font-semibold font-serif text-sm">
                            {formatMoney(sale.total)}
                          </td>
                          <td className="p-4 text-right">
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-[2px] text-[10px] uppercase font-medium">
                              {t.completed}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL NUEVA PRENDA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 border rounded-sm shadow-2xl relative ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-medium mb-4">{t.newProduct}</h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-stone-500 mb-1 font-medium">{t.name}</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej. Vestido Alta Costura Terciopelo"
                  value={newProd.name}
                  onChange={(e) => setNewProd({...newProd, name: e.target.value})}
                  className={`w-full p-2.5 border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-300'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-stone-500 mb-1 font-medium">{t.category}</label>
                  <select 
                    value={newProd.category}
                    onChange={(e) => setNewProd({...newProd, category: e.target.value})}
                    className={`w-full p-2.5 border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-300'}`}
                  >
                    <option value="dresses">{t.dresses}</option>
                    <option value="outerwear">{t.outerwear}</option>
                    <option value="knitwear">{t.knitwear}</option>
                    <option value="accessories">{t.accessories}</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-stone-500 mb-1 font-medium">{t.sku}</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. TC-005"
                    value={newProd.sku}
                    onChange={(e) => setNewProd({...newProd, sku: e.target.value})}
                    className={`w-full p-2.5 border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-300'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-stone-500 mb-1 font-medium">{t.price} ({country.symbol})</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required
                    placeholder="450"
                    value={newProd.price}
                    onChange={(e) => setNewProd({...newProd, price: e.target.value})}
                    className={`w-full p-2.5 border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-300'}`}
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-stone-500 mb-1 font-medium">{t.stock}</label>
                  <input 
                    type="number" 
                    required
                    placeholder="10"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({...newProd, stock: e.target.value})}
                    className={`w-full p-2.5 border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-300'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-stone-500 mb-1 font-medium">{t.sizes} (sep. comas)</label>
                  <input 
                    type="text" 
                    value={newProd.sizes}
                    onChange={(e) => setNewProd({...newProd, sizes: e.target.value})}
                    className={`w-full p-2.5 border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-300'}`}
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-stone-500 mb-1 font-medium">{t.colors} (sep. comas)</label>
                  <input 
                    type="text" 
                    value={newProd.colors}
                    onChange={(e) => setNewProd({...newProd, colors: e.target.value})}
                    className={`w-full p-2.5 border rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-900 ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-300'}`}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-sm hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-sm font-medium hover:opacity-90"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
