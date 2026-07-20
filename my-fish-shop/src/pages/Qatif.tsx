import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const Qatif = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // جلب منتجات القطيف المجمدة فقط من Firebase
    const q = query(collection(db, "products"), where("category", "==", "qatif-frozen"));
    
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>منتجات القطيف (المجمدات)</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} branch="qatif" />
        ))}
      </div>
    </div>
  );
};

export default Qatif;