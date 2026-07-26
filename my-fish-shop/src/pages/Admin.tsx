import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

const Admin = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // حالات إدارة المنتجات والتعديل
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("qatif-frozen");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  };

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

  const deleteOrder = async (id: string) => {
    await deleteDoc(doc(db, "orders", id));
  };

  // دالة ضغط وضبط الصورة المختارة من الجهاز لتكون خفيفة جداً ومضمونة الحفظ
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 250;
        const MAX_HEIGHT = 250;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
        setImageUrl(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // إضافة أو تعديل منتج
  const handleSaveProduct = async () => {
    if (!name || !price || !imageUrl) return alert("يرجى إدخال جميع البيانات واختيار الصورة");
    
    try {
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), {
          name,
          price: Number(price),
          category,
          imageUrl
        });
        setEditingId(null);
        showToast("تم تعديل المنتج بنجاح! ✅");
      } else {
        await addDoc(collection(db, "products"), { 
          name, 
          price: Number(price), 
          category, 
          imageUrl 
        });
        showToast("تم إضافة المنتج بنجاح! 🐟");
      }

      setName(""); 
      setPrice(""); 
      setImageUrl("");
    } catch (error) {
      alert("حدث خطأ في الحفظ، تأكد من الاتصال بالإنترنت.");
    }
  };

  const startEditing = (p: any) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category || "qatif-frozen");
    setImageUrl(p.imageUrl);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setName(""); 
    setPrice(""); 
    setImageUrl("");
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        background: "linear-gradient(180deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)",
        fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
        direction: 'rtl',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          padding: '40px 30px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '380px'
        }}>
          <h1 style={{ color: '#ffffff', marginBottom: '25px', fontSize: '1.8rem', fontWeight: '900', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>🔐 لوحة الإدارة</h1>
          <input 
            type="password" 
            placeholder="أدخل كلمة المرور" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            style={{ 
              padding: '14px 20px', 
              borderRadius: '50px', 
              border: '1px solid rgba(255, 255, 255, 0.6)', 
              marginBottom: '20px', 
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#0077b6',
              fontSize: '1.05rem',
              outline: 'none',
              textAlign: 'center',
              boxSizing: 'border-box'
            }} 
          />
          <button 
            onClick={() => password === "Themar1212" ? setIsAuthenticated(true) : alert("كلمة المرور خاطئة!")} 
            style={{ 
              padding: '12px 30px', 
              backgroundColor: '#03045e', 
              color: 'white', 
              border: '2px solid rgba(72, 202, 228, 0.6)', 
              borderRadius: '50px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              width: '100%',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            دخول 🚀
          </button>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(o => showArchived ? o.status === 'done' : o.status !== 'done');

  return (
    <div style={{ 
      padding: "30px 15px 60px 15px", 
      direction: 'rtl', 
      background: "linear-gradient(180deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)", 
      minHeight: '100vh',
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      color: '#fff',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ textAlign: "center", color: '#ffffff', marginBottom: '35px', fontSize: '2.5rem', fontWeight: '900', textShadow: '0 3px 15px rgba(0,0,0,0.2)' }}>
        لوحة التحكم والتحكم بالمنتجات 📊
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', alignItems: 'start', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* القسم الأيمن: إدارة المنتجات */}
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          padding: '25px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          color: '#1e293b'
        }}>
          <h2 style={{ color: '#0077b6', marginBottom: '20px', fontSize: '1.4rem', fontWeight: 'bold' }}>
            {editingId ? "✏️ تعديل المنتج" : "إضافة منتج جديد 🐟"}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
            <input placeholder="اسم المنتج" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }} />
            <input placeholder="السعر" type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }} />
            
            {/* اختيار صورة من الجهاز مباشرة */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>اختر صورة المنتج من الجهاز:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.9rem' }} />
            </div>

            {/* معاينة الصورة المختارة */}
            {imageUrl && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                <img src={imageUrl} alt="معاينة" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                <span style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>تم ضغط واختيار الصورة بنجاح ✅</span>
              </div>
            )}
            
            <select onChange={(e) => setCategory(e.target.value)} value={category} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', backgroundColor: '#fff' }}>
              <option value="qatif-frozen">القطيف - مجمدات</option>
              <option value="riyadh-frozen">الرياض - مجمدات</option>
              <option value="riyadh-fresh">الرياض - تسوية</option>
              <option value="jeddah-frozen">جدة - مجمدات</option>
              <option value="jeddah-fresh">جدة - الطازج</option>
            </select>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <button onClick={handleSaveProduct} style={{ flex: 1, padding: '12px', backgroundColor: editingId ? '#10b981' : '#0077b6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                {editingId ? "حفظ التعديلات" : "إضافة منتج"}
              </button>
              {editingId && (
                <button onClick={cancelEditing} style={{ padding: '12px 18px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  إلغاء
                </button>
              )}
            </div>
          </div>

          <div style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '5px' }}>
            {products.map(p => (
              <div key={p.id} style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <img src={p.imageUrl} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} alt="" />
                  <span style={{ fontSize: '13px', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name} - <strong>{p.price} ر.س</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                  <button onClick={() => startEditing(p)} style={{ padding: '6px 10px', backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>تعديل</button>
                  <button onClick={() => deleteDoc(doc(db, "products", p.id))} style={{ padding: '6px 10px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>حذف</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* القسم الأيسر: متابعة الطلبات */}
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          padding: '25px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          color: '#1e293b'
        }}>
          <h2 style={{ color: '#0077b6', marginBottom: '20px', fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center' }}>متابعة الطلبات 📦</h2>
          
          <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={() => setShowArchived(false)} style={{ padding: '10px 20px', backgroundColor: !showArchived ? '#0077b6' : '#e2e8f0', color: !showArchived ? 'white' : '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 'bold', boxShadow: !showArchived ? '0 4px 12px rgba(0,0,0,0.15)' : 'none' }}>الطلبات الجديدة</button>
            <button onClick={() => setShowArchived(true)} style={{ padding: '10px 20px', backgroundColor: showArchived ? '#10b981' : '#e2e8f0', color: showArchived ? 'white' : '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 'bold', boxShadow: showArchived ? '0 4px 12px rgba(0,0,0,0.15)' : 'none' }}>الأرشيف</button>
          </div>

          <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
            {filteredOrders.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#64748b', padding: '30px' }}>لا توجد طلبات في هذا القسم حالياً.</p>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} style={{ 
                  backgroundColor: '#f8fafc', padding: '16px', marginBottom: '15px', borderRadius: '12px', 
                  borderRight: `6px solid ${order.branch === 'riyadh' ? '#0ea5e9' : order.branch === 'jeddah' ? '#0077b6' : '#22c55e'}`,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#0077b6' }}>فرع {order.branch}</span>
                    <span style={{ color: '#94a3b8' }}>{order.timestamp ? new Date(order.timestamp).toLocaleString('ar-SA') : ''}</span>
                  </div>
                  
                  <p style={{ fontSize: '0.95rem', margin: '6px 0' }}><strong>👤 الاسم:</strong> {order.customerName}</p>
                  <p style={{ fontSize: '0.95rem', margin: '6px 0' }}><strong>📞 الجوال:</strong> {order.customerPhone}</p>
                  <p style={{ fontSize: '0.95rem', margin: '6px 0' }}><strong>📍 العنوان:</strong> {order.customerAddress}</p>
                  
                  <div style={{ marginTop: '10px', fontSize: '0.9rem', backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '8px' }}>
                    <strong style={{ display: 'block', marginBottom: '4px', color: '#334155' }}>المنتجات المطلوبة:</strong>
                    {order.items && order.items.map((item: any, idx: number) => (
                      <div key={idx} style={{ color: '#475569', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '2px 0' }}>
                        <span>• {item.name}</span>
                        <span>الكمية: {item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#03045e' }}>الإجمالي: {order.total} ر.س</span>
                    
                    <div>
                      {!showArchived ? (
                        <button onClick={() => markAsDone(order.id)} style={{ padding: '8px 14px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)' }}>
                          تم التنفيذ ✅
                        </button>
                      ) : (
                        <button onClick={() => deleteOrder(order.id)} style={{ padding: '8px 14px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)' }}>
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

      {message && (
        <div style={{
          position: "fixed", top: "20px", right: "20px", backgroundColor: "#10b981",
          color: "white", padding: "14px 24px", borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)", zIndex: 1000, fontWeight: "bold", fontSize: '1rem'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Admin;