import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const Riyadh = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("frozen");
  const [searchTerm, setSearchTerm] = useState<string>(""); // حالة البحث

  useEffect(() => {
    // جلب منتجات الرياض (المجمدات والطازجة/التسوية) فقط من Firebase
    const q = query(
      collection(db, "products"), 
      where("category", "in", ["riyadh-frozen", "riyadh-fresh"])
    );
    
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  // فلترة المنتجات حسب التاب المختار أولاً، ثم حسب خانة البحث
  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === "frozen" ? p.category === "riyadh-frozen" : p.category === "riyadh-fresh";
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ padding: "20px", textAlign: "center", direction: "rtl" }}>
      <h1>منتجات الرياض</h1>

      {/* أزرار التنقل (التبويبات) */}
      <div style={{ marginBottom: "20px" }}>
        <button 
          onClick={() => setActiveTab("frozen")}
          style={{ 
            margin: "0 10px", padding: "12px 25px", 
            backgroundColor: activeTab === "frozen" ? "#0ea5e9" : "#cbd5e1", 
            color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", transition: "0.3s" 
          }}
        >
          المجمدات
        </button>
        <button 
          onClick={() => setActiveTab("fresh")}
          style={{ 
            margin: "0 10px", padding: "12px 25px", 
            backgroundColor: activeTab === "fresh" ? "#0ea5e9" : "#cbd5e1", 
            color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", transition: "0.3s" 
          }}
        >
          التسوية / الطازج
        </button>
      </div>

      {/* خانة البحث */}
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="ابحث داخل القسم الحالي..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "50px",
            border: "1px solid #cbd5e1",
            outline: "none",
            fontSize: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
            textAlign: "right"
          }}
        />
      </div>

      {/* عرض المنتجات المفلترة */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} branch="riyadh" />
          ))
        ) : (
          <p style={{ color: "#64748b", marginTop: "20px", width: "100%" }}>عذراً، لم نجد أي منتج مطابق للبحث في هذا القسم.</p>
        )}
      </div>
    </div>
  );
};

export default Riyadh;