import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const Qatif = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // 1. حالة البحث الجديدة

  useEffect(() => {
    // جلب منتجات القطيف المجمدة فقط من Firebase
    const q = query(collection(db, "products"), where("category", "==", "qatif-frozen"));
    
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  // 2. فلترة المنتجات بناءً على خانة البحث (بيبحث بالاسم)
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>منتجات القطيف (المجمدات)</h1>

      {/* خانة البحث الشيك */}
      <div style={{ margin: "25px 0" }}>
        <input
          type="text"
          placeholder="ابحث عن نوع السمك أو المنتج..."
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

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} branch="qatif" />
          ))
        ) : (
          <p style={{ color: "#64748b", marginTop: "20px" }}>عذراً، لم نجد أي منتج بهذا الاسم.</p>
        )}
      </div>
    </div>
  );
};

export default Qatif;