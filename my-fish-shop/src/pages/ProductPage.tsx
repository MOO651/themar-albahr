import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductPage = () => {
  const { addToCart } = useContext(CartContext);
  
  // قائمة المنتجات (يمكنك تغييرها لاحقاً ببيانات تأتي من الفايربيس)
  const products = [
    { id: "p1", name: "سمك هامور", price: 50 },
    { id: "p2", name: "روبيان طازج", price: 80 }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>قائمة المنتجات</h1>
      <div style={{ display: "grid", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
            <h3>{product.name}</h3>
            <p>السعر: {product.price} ريال</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => addToCart(product, 'riyadh')}
                style={{ padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                اطلب الآن (الرياض)
              </button>
              <button 
                onClick={() => addToCart(product, 'qatif')}
                style={{ padding: "10px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                اطلب الآن (القطيف)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;