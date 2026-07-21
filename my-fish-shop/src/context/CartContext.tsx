import { createContext, useState, useEffect } from "react";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [message, setMessage] = useState<string | null>(null);
  
  // بنجيب السلة الخاصة بالفرعين من الـ localStorage لو موجودة، أو نبدأ بسلة فاضية
  const [riyadhItems, setRiyadhItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("riyadh_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [qatifItems, setQatifItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("qatif_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // حفظ سلة الرياض في localStorage كل ما تتغير
  useEffect(() => {
    localStorage.setItem("riyadh_cart", JSON.stringify(riyadhItems));
  }, [riyadhItems]);

  // حفظ سلة القطيف في localStorage كل ما تتغير
  useEffect(() => {
    localStorage.setItem("qatif_cart", JSON.stringify(qatifItems));
  }, [qatifItems]);

  // حساب إجمالي المنتجات في السلتين مع بعض عشان العداد العلوي
  const totalItems = [...riyadhItems, ...qatifItems].reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  };

  // إضافة منتج للسلة الخاصة بالفرع بتاعه على هذا الجهاز فقط
  const addToCart = (product: any, branch: 'riyadh' | 'qatif', quantity: number) => {
    if (branch === 'riyadh') {
      setRiyadhItems(prevItems => {
        const index = prevItems.findIndex((i: any) => i.id === product.id);
        if (index > -1) {
          const updated = [...prevItems];
          updated[index].quantity += quantity;
          return updated;
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });
    } else {
      setQatifItems(prevItems => {
        const index = prevItems.findIndex((i: any) => i.id === product.id);
        if (index > -1) {
          const updated = [...prevItems];
          updated[index].quantity += quantity;
          return updated;
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });
    }

    showToast(`تمت إضافة ${product.name} للسلة بنجاح!`);
  };

  // دالة لتحديث أو حذف العناصر لو محتاجها في صفحة السلة
  const updateQuantity = (id: string, branch: 'riyadh' | 'qatif', newQty: number) => {
    const setter = branch === 'riyadh' ? setRiyadhItems : setQatifItems;
    setter(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id: string, branch: 'riyadh' | 'qatif') => {
    const setter = branch === 'riyadh' ? setRiyadhItems : setQatifItems;
    setter(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ 
      addToCart, 
      totalItems, 
      riyadhItems, 
      qatifItems, 
      updateQuantity, 
      removeFromCart 
    }}>
      {children}
      
      {message && (
        <div style={{
          position: "fixed", top: "20px", right: "20px", backgroundColor: "#22c55e",
          color: "white", padding: "12px 24px", borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 1000, fontWeight: "bold", fontSize: "15px"
        }}>
          {message}
        </div>
      )}
    </CartContext.Provider>
  );
};