import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

const ProductManager = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("qatif-frozen");
  const [imageUrl, setImageUrl] = useState(""); // إضافة حالة لرابط الصورة

  useEffect(() => {
    return onSnapshot(collection(db, "products"), (s) => 
      setProducts(s.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const addProduct = async () => {
    // ضفنا imageUrl للتحقق
    if (!name || !price || !imageUrl) return alert("يرجى إدخال جميع البيانات بما فيها رابط الصورة");
    await addDoc(collection(db, "products"), { name, price: Number(price), category, imageUrl });
    setName(""); setPrice(""); setImageUrl(""); // تصفير الحقول بعد الإضافة
  };

  return (
    <div style={{ padding: "40px", direction: 'rtl' }}>
      <h1>إدارة المنتجات 🐟</h1>
      <div style={{ marginBottom: "20px", background: "#f1f5f9", padding: "15px", borderRadius: "10px" }}>
        <input placeholder="اسم المنتج" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="السعر" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="رابط الصورة" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ marginRight: '10px' }} />
        
        <select onChange={(e) => setCategory(e.target.value)} value={category} style={{ marginRight: '10px' }}>
          <option value="qatif-frozen">القطيف - مجمدات</option>
          <option value="riyadh-frozen">الرياض - مجمدات</option>
          <option value="riyadh-fresh">الرياض - تسوية</option>
        </select>
        
        <button onClick={addProduct} style={{ marginRight: '10px' }}>إضافة منتج</button>
      </div>

      {products.map(p => (
        <div key={p.id} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
          {/* عرض مصغر للصورة في صفحة الإدارة */}
          <img src={p.imageUrl} style={{ width: '50px', height: '50px', marginLeft: '10px' }} />
          {p.name} - {p.price} ر.س ({p.category})
          <button onClick={() => deleteDoc(doc(db, "products", p.id))} style={{ marginRight: '10px', color: 'red' }}>حذف</button>
        </div>
      ))}
    </div>
  );
};
export default ProductManager;