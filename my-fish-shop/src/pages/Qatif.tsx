import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const Qatif = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // جلب منتجات القطيف المجمدة فقط من Firebase
    const q = query(collection(db, "products"), where("category", "==", "qatif-frozen"));
    
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  // فلترة المنتجات بناءً على خانة البحث (بيبحث بالاسم)
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: "calc(100vh - 70px)",
      background: "linear-gradient(180deg, #03045e 0%, #0077b6 50%, #48cae4 100%)",
      padding: "40px 20px", 
      textAlign: "center", 
      direction: "rtl",
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      color: "white"
    }}>
      <h1 style={{ 
        fontSize: "2.8rem", 
        fontWeight: "900", 
        marginBottom: "30px",
        textShadow: "0 3px 15px rgba(0,0,0,0.3)"
      }}>
        منتجات فرع القطيف 🌴
      </h1>

      {/* خانة البحث الزجاجية */}
      <div style={{ marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="ابحث عن نوع السمك أو المنتج... 🔍"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "14px 24px",
            width: "100%",
            maxWidth: "450px",
            borderRadius: "50px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            outline: "none",
            fontSize: "1.05rem",
            color: "#03045e",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            textAlign: "right",
            fontFamily: "'Tajawal', 'Segoe UI', sans-serif"
          }}
        />
      </div>

      {/* عرض المنتجات المفلترة */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} branch="qatif" />
          ))
        ) : (
          <p style={{ color: "#e0fbfc", marginTop: "30px", width: "100%", fontSize: "1.2rem", fontWeight: "600" }}>
            عذراً، لم نجد أي منتج بهذا الاسم. 🌊
          </p>
        )}
      </div>
    </div>
  );
};

export default Qatif;