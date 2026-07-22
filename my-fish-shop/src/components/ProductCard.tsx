import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product, branch }: { product: any; branch: 'riyadh' | 'qatif' | 'jeddah' }) => {
  const { addToCart } = useContext(CartContext);
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const increment = () => setCount(count + 1);
  const decrement = () => { if (count > 1) setCount(count - 1); };

  return (
    <div 
      className="product-card" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        border: "none", 
        padding: "20px", 
        borderRadius: "20px", 
        textAlign: "center", 
        width: "250px", 
        margin: "15px",
        backgroundColor: "#ffffff",
        boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.15)" : "0 4px 10px rgba(0,0,0,0.05)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: isHovered ? "translateY(-10px)" : "translateY(0)"
      }}
    >
      <div className="image-container" style={{ 
        width: "100%", height: "180px", backgroundColor: "#f8f9fa", 
        marginBottom: "20px", borderRadius: "15px", display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "hidden"
      }}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#adb5bd" }}>بدون صورة</span>
        )}
      </div>

      <h3 style={{ margin: "10px 0", fontSize: "20px", color: "#1e293b", fontWeight: "700" }}>{product.name}</h3>
      
      {/* عرض السعر بالأرقام العربية والتنسيق الصحيح */}
      <p style={{ margin: "5px 0", fontSize: "18px", color: "#0ea5e9", fontWeight: "bold" }}>
        {Number(product.price).toLocaleString('ar-SA')} ر.س
      </p>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "20px 0" }}>
        <button onClick={decrement} style={{ padding: "5px 15px", borderRadius: "8px", border: "none", backgroundColor: "#e2e8f0", cursor: "pointer" }}>-</button>
        <span style={{ fontSize: "18px", fontWeight: "bold", minWidth: "30px" }}>{count}</span>
        <button onClick={increment} style={{ padding: "5px 15px", borderRadius: "8px", border: "none", backgroundColor: "#e2e8f0", cursor: "pointer" }}>+</button>
      </div>

      <button 
        onClick={() => addToCart(product, branch, count)}
        style={{ 
          padding: "12px 0", backgroundColor: "#0ea5e9", color: "white", 
          border: "none", borderRadius: "12px", cursor: "pointer",
          width: "100%", fontSize: "16px", fontWeight: "bold",
          transition: "transform 0.2s, background-color 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0284c7"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#0ea5e9"}
      >
        إضافة للسلة
      </button>
    </div>
  );
};

export default ProductCard;