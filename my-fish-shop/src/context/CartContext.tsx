import { createContext, useState, useEffect } from "react";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [message, setMessage] = useState<string | null>(null);
  
  // سلات الفروع الثلاثة (الرياض، القطيف، جدة) من الـ localStorage
  const [riyadhItems, setRiyadhItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("riyadh_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [qatifItems, setQatifItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("qatif_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [jeddahItems, setJeddahItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("jeddah_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // حفظ سلة الرياض
  useEffect(() => {
    localStorage.setItem("riyadh_cart", JSON.stringify(riyadhItems));
  }, [riyadhItems]);

  // حفظ سلة القطيف
  useEffect(() => {
    localStorage.setItem("qatif_cart", JSON.stringify(qatifItems));
  }, [qatifItems]);

  // حفظ سلة جدة
  useEffect(() => {
    localStorage.setItem("jeddah_cart", JSON.stringify(jeddahItems));
  }, [jeddahItems]);

  // حساب إجمالي المنتجات في الفروع كلها للعداد العلوي في الـ Navbar
  const totalItems = [...riyadhItems, ...qatifItems, ...jeddahItems].reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  };

  // إضافة منتج للسلة الخاصة بالفرع بتاعه
  const addToCart = (product: any, branch: 'riyadh' | 'qatif' | 'jeddah', quantity: number) => {
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
    } else if (branch === 'qatif') {
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
    } else {
      setJeddahItems(prevItems => {
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

  // تحديث الكمية لأي فرع
  const updateQuantity = (id: string, branch: 'riyadh' | 'qatif' | 'jeddah', newQty: number) => {
    const setter = branch === 'riyadh' ? setRiyadhItems : branch === 'qatif' ? setQatifItems : setJeddahItems;
    setter((prev: any[]) => prev.map((item: any) => item.id === id ? { ...item, quantity: newQty } : item));
  };

  // حذف منتج من السلة لأي فرع
  const removeFromCart = (id: string, branch: 'riyadh' | 'qatif' | 'jeddah') => {
    const setter = branch === 'riyadh' ? setRiyadhItems : branch === 'qatif' ? setQatifItems : setJeddahItems;
    setter((prev: any[]) => prev.filter((item: any) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ 
      addToCart, 
      totalItems, 
      riyadhItems, 
      qatifItems, 
      jeddahItems, 
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