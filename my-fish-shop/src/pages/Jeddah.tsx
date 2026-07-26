import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const Jeddah = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("frozen");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const q = query(
      collection(db, "products"), 
      where("category", "in", ["jeddah-frozen", "jeddah-fresh"])
    );
    
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesTab = activeTab === "frozen" ? p.category === "jeddah-frozen" : p.category === "jeddah-fresh";
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ 
      minHeight: "calc(100vh - 70px)",
      background: "linear-gradient(180deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)",
      padding: "30px 15px", 
      textAlign: "center", 
      direction: "rtl",
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      color: "white"
    }}>
      <style>{`
        /* تحسين التجاوب للشاشات الصغيرة والموبايل */
        @media (max-width: 768px) {
          .branch-title {
            font-size: 2.1rem !important;
          }
          .tabs-container {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 0 10px;
          }
          .tab-btn {
            width: 100% !important;
            text-align: center !important;
          }
          .search-container {
            padding: 0 10px;
          }
          .search-input {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <h1 className="branch-title" style={{ 
        fontSize: "2.8rem", 
        fontWeight: "900", 
        marginBottom: "25px",
        textShadow: "0 3px 15px rgba(0,0,0,0.2)"
      }}>
        منتجات فرع جدة ⚓
      </h1>

      {/* أزرار التنقل (التبويبات) */}
      <div className="tabs-container" style={{ marginBottom: "25px", display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        <button 
          onClick={() => setActiveTab("frozen")}
          className="tab-btn"
          style={{ 
            padding: "12px 30px", 
            backgroundColor: activeTab === "frozen" ? "#ffffff" : "rgba(255, 255, 255, 0.15)", 
            color: activeTab === "frozen" ? "#0077b6" : "#ffffff", 
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            borderRadius: "50px", 
            cursor: "pointer", 
            fontSize: "1.1rem", 
            fontWeight: "bold", 
            boxShadow: activeTab === "frozen" ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
            transition: "all 0.3s ease" 
          }}
        >
          ❄️ المجمدات
        </button>
        <button 
          onClick={() => setActiveTab("fresh")}
          className="tab-btn"
          style={{ 
            padding: "12px 30px", 
            backgroundColor: activeTab === "fresh" ? "#ffffff" : "rgba(255, 255, 255, 0.15)", 
            color: activeTab === "fresh" ? "#0077b6" : "#ffffff", 
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            borderRadius: "50px", 
            cursor: "pointer", 
            fontSize: "1.1rem", 
            fontWeight: "bold", 
            boxShadow: activeTab === "fresh" ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
            transition: "all 0.3s ease" 
          }}
        >
          🐟 الطازج
        </button>
      </div>

      {/* خانة البحث */}
      <div className="search-container" style={{ marginBottom: "35px", padding: "0 10px" }}>
        <input
          type="text"
          placeholder="ابحث داخل القسم الحالي... 🔍"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{
            padding: "14px 24px",
            width: "100%",
            maxWidth: "450px",
            borderRadius: "50px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            outline: "none",
            fontSize: "1.05rem",
            color: "#0077b6",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            textAlign: "right",
            fontFamily: "'Tajawal', 'Segoe UI', sans-serif"
          }}
        />
      </div>

      {/* عرض المنتجات المفلترة شبكياً */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
        gap: "20px", 
        maxWidth: "1200px", 
        margin: "0 auto",
        padding: "0 10px"
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} branch="jeddah" />
          ))
        ) : (
          <p style={{ color: "#e0fbfc", marginTop: "30px", gridColumn: "1 / -1", fontSize: "1.2rem", fontWeight: "600" }}>
            عذراً، لم نجد أي منتج مطابق للبحث في هذا القسم. 🌊
          </p>
        )}
      </div>
    </div>
  );
};

export default Jeddah;