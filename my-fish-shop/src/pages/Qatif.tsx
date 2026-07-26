import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const Qatif = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const q = query(collection(db, "products"), where("category", "==", "qatif-frozen"));
    
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
      background: "linear-gradient(180deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)",
      padding: "20px 10px", 
      textAlign: "center", 
      direction: "rtl",
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      color: "white",
      boxSizing: "border-box"
    }}>
      <style>{`
        /* تحسين التجاوب للشاشات الصغيرة والموبايل */
        @media (max-width: 768px) {
          .branch-title {
            font-size: 1.8rem !important;
          }
          .search-container {
            width: 100% !important;
            padding: 0 5px !important;
            box-sizing: border-box !important;
          }
          .search-input {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      <h1 className="branch-title" style={{ 
        fontSize: "2.8rem", 
        fontWeight: "900", 
        marginBottom: "20px",
        textShadow: "0 3px 15px rgba(0,0,0,0.2)"
      }}>
        منتجات فرع القطيف 🌴
      </h1>

      {/* خانة البحث الزجاجية */}
      <div className="search-container" style={{ marginBottom: "35px", width: "100%", display: "flex", justifyContent: "center", padding: "0 10px", boxSizing: "border-box" }}>
        <input
          type="text"
          placeholder="ابحث عن نوع السمك أو المنتج... 🔍"
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
            fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
            boxSizing: "border-box"
          }}
        />
      </div>

      {/* عرض المنتجات المفلترة شبكياً */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", 
        gap: "20px", 
        maxWidth: "1200px", 
        margin: "0 auto",
        padding: "0 10px",
        boxSizing: "border-box"
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} branch="qatif" />
          ))
        ) : (
          <p style={{ color: "#e0fbfc", marginTop: "30px", gridColumn: "1 / -1", fontSize: "1.2rem", fontWeight: "600" }}>
            عذراً، لم نجد أي منتج بهذا الاسم. 🌊
          </p>
        )}
      </div>
    </div>
  );
};

export default Qatif;