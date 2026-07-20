import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

const Admin = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // حالات إدارة المنتجات
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("qatif-frozen");
  const [imageUrl, setImageUrl] = useState("");

  // جلب الطلبات
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  // جلب المنتجات
  useEffect(() => {
    return onSnapshot(collection(db, "products"), (s) => 
      setProducts(s.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const markAsDone = async (id: string) => {
    await updateDoc(doc(db, "orders", id), { status: 'done' });
  };

  // حذف طلب من الأرشيف
  const deleteOrder = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب نهائياً من الأرشيف؟")) {
      await deleteDoc(doc(db, "orders", id));
    }
  };

  const addProduct = async () => {
    if (!name || !price || !imageUrl) return alert("يرجى إدخال جميع البيانات بما فيها رابط الصورة");
    await addDoc(collection(db, "products"), { name, price: Number(price), category, imageUrl });
    setName(""); setPrice(""); setImageUrl("");
  };

  // شاشة تسجيل الدخول
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
        <h1 style={{ color: '#1e293b' }}>🔐 لوحة الإدارة</h1>
        <input 
          type="password" 
          placeholder="أدخل كلمة المرور" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px', width: '250px' }} 
        />
        <button 
          onClick={() => password === "1234" ? setIsAuthenticated(true) : alert("كلمة المرور خاطئة!")} 
          style={{ padding: '10px 30px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          دخول
        </button>
      </div>
    );
  }

  const filteredOrders = orders.filter(o => showArchived ? o.status === 'done' : o.status !== 'done');

  return (
    <div style={{ padding: "30px", direction: 'rtl', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: "center", color: '#1e293b', marginBottom: '30px' }}>لوحة التحكم والتحكم بالمنتجات 📊</h1>
      
      {/* تقسيم الصفحة لقسمين رئيسيين بجانب بعض */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px', alignItems: 'start' }}>
        
        {/* القسم الأيمن: إدارة المنتجات */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '15px', fontSize: '20px' }}>إدارة المنتجات 🐟</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <input placeholder="اسم المنتج" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            <input placeholder="السعر" type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            <input placeholder="رابط الصورة" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            
            <select onChange={(e) => setCategory(e.target.value)} value={category} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
              <option value="qatif-frozen">القطيف - مجمدات</option>
              <option value="riyadh-frozen">الرياض - مجمدات</option>
              <option value="riyadh-fresh">الرياض - تسوية</option>
            </select>
            
            <button onClick={addProduct} style={{ padding: '10px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>إضافة منتج</button>
          </div>

          <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {products.map(p => (
              <div key={p.id} style={{ padding: '8px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={p.imageUrl} style={{ width: '35px', height: '35px', borderRadius: '4px', objectFit: 'cover' }} alt="" />
                  <span style={{ fontSize: '14px' }}>{p.name} - <strong>{p.price} ر.س</strong></span>
                </div>
                <button onClick={() => deleteDoc(doc(db, "products", p.id))} style={{ padding: '4px 8px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>حذف</button>
              </div>
            ))}
          </div>
        </div>

        {/* القسم الأيسر: متابعة الطلبات */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '15px', fontSize: '20px', textAlign: 'center' }}>متابعة الطلبات 📦</h2>
          
          {/* تبديل بين الجديد والأرشيف */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={() => setShowArchived(false)} style={{ padding: '8px 15px', backgroundColor: !showArchived ? '#0ea5e9' : '#e2e8f0', color: !showArchived ? 'white' : '#64748b', border: 'none', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px', fontSize: '14px' }}>الطلبات الجديدة</button>
            <button onClick={() => setShowArchived(true)} style={{ padding: '8px 15px', backgroundColor: showArchived ? '#22c55e' : '#e2e8f0', color: showArchived ? 'white' : '#64748b', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>الأرشيف</button>
          </div>

          <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
            {filteredOrders.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '16px', color: '#64748b', padding: '20px' }}>لا توجد طلبات في هذا القسم.</p>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} style={{ 
                  backgroundColor: '#f8fafc', padding: '15px', marginBottom: '12px', borderRadius: '8px', 
                  borderRight: `6px solid ${order.branch === 'riyadh' ? '#0ea5e9' : '#22c55e'}`,
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '8px', fontSize: '13px' }}>
                    <span style={{ fontWeight: 'bold' }}>فرع {order.branch === 'riyadh' ? 'الرياض' : 'القطيف'}</span>
                    <span style={{ color: '#94a3b8' }}>{order.timestamp ? new Date(order.timestamp).toLocaleString('ar-SA') : ''}</span>
                  </div>
                  
                  <p style={{ fontSize: '14px', margin: '4px 0' }}><strong>👤 الاسم:</strong> {order.customerName}</p>
                  <p style={{ fontSize: '14px', margin: '4px 0' }}><strong>📞 الجوال:</strong> {order.customerPhone}</p>
                  <p style={{ fontSize: '14px', margin: '4px 0' }}><strong>📍 العنوان:</strong> {order.customerAddress}</p>
                  
                  <div style={{ marginTop: '8px', fontSize: '13px' }}>
                    <strong>الطلبات:</strong>
                    {order.items && order.items.map((item: any, idx: number) => (
                      <li key={idx} style={{ color: '#475569' }}>{item.name} - الكمية: {item.quantity}</li>
                    ))}
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>الإجمالي: {order.total} ر.س</span>
                    
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {!showArchived ? (
                        <button onClick={() => markAsDone(order.id)} style={{ padding: '6px 12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                          تم التنفيذ ✅
                        </button>
                      ) : (
                        <button onClick={() => deleteOrder(order.id)} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                          حذف نهائي 🗑️
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;