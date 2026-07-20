import { createContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [message, setMessage] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0); // العداد الجديد

  // متابعة السلتين عشان نحدث العدد تلقائياً
  useEffect(() => {
    const unsubR = onSnapshot(doc(db, "carts", "cart_riyadh"), (_) => updateCount());
    const unsubQ = onSnapshot(doc(db, "carts", "cart_qatif"), (_) => updateCount());
    return () => { unsubR(); unsubQ(); };
  }, []);

  const updateCount = async () => {
    const snapR = await getDoc(doc(db, "carts", "cart_riyadh"));
    const snapQ = await getDoc(doc(db, "carts", "cart_qatif"));
    
    const itemsR = snapR.exists() ? snapR.data().items : [];
    const itemsQ = snapQ.exists() ? snapQ.data().items : [];
    
    const total = [...itemsR, ...itemsQ].reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  };

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  };

  const addToCart = async (product: any, branch: 'riyadh' | 'qatif', quantity: number) => {
    const branchId = branch === 'riyadh' ? 'cart_riyadh' : 'cart_qatif';
    const docRef = doc(db, "carts", branchId);
    
    try {
      const docSnap = await getDoc(docRef);
      let currentItems = docSnap.exists() ? docSnap.data().items : [];
      
      const index = currentItems.findIndex((i: any) => i.id === product.id);
      if (index > -1) {
        currentItems[index].quantity += quantity;
      } else {
        currentItems.push({ ...product, quantity: quantity });
      }
      
      await setDoc(docRef, { items: currentItems });
      showToast(`تمت إضافة ${product.name} للسلة بنجاح!`);
    } catch (error) {
      console.error("خطأ:", error);
    }
  };

  return (
    // ضفنا totalItems هنا عشان نقدر نستخدمه في أي مكان
    <CartContext.Provider value={{ addToCart, totalItems }}>
      {children}
      
      {message && (
        <div style={{
          position: "fixed", top: "20px", right: "20px", backgroundColor: "#28a745",
          color: "white", padding: "15px 25px", borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)", zIndex: 1000
        }}>
          {message}
        </div>
      )}
    </CartContext.Provider>
  );
};