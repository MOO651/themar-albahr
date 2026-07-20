import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const Riyadh = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("frozen");

  useEffect(() => {
    // جلب منتجات الرياض (المجمدات والتسوية) فقط من Firebase
    const q = query(
      collection(db, "products"), 
      where("category", "in", ["riyadh-frozen", "riyadh-fresh"])
    );
    
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  // فلترة المنتجات حسب التاب المختار
  const filteredProducts = products.filter(p => 
    activeTab === "frozen" ? p.category === "riyadh-frozen" : p.category === "riyadh-fresh"
  );

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>منتجات الرياض</h1>

      {/* أزرار التنقل */}
      <div style={{ marginBottom: "30px" }}>
        <button 
          onClick={() => setActiveTab("frozen")}
          style={{ 
            margin: "0 10px", padding: "12px 25px", 
            backgroundColor: activeTab === "frozen" ? "#007bff" : "#ccc", 
            color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" 
          }}
        >
          المجمدات
        </button>
        <button 
          onClick={() => setActiveTab("fresh")}
          style={{ 
            margin: "0 10px", padding: "12px 25px", 
            backgroundColor: activeTab === "fresh" ? "#007bff" : "#ccc", 
            color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" 
          }}
        >
          التسوية
        </button>
      </div>

      {/* عرض المنتجات المفلترة */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} branch="riyadh" />
        ))}
      </div>
    </div>
  );
};

export default Riyadh;