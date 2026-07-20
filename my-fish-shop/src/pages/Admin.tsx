import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";

const Admin = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const markAsDone = async (id: string) => {
    await updateDoc(doc(db, "orders", id), { status: 'done' });
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

  // تصفية الطلبات (جديدة أو مؤرشفة)
  const filteredOrders = orders.filter(o => showArchived ? o.status === 'done' : o.status !== 'done');

  return (
    <div style={{ padding: "40px", direction: 'rtl', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: "center", color: '#1e293b' }}>لوحة التحكم 📊</h1>
      
      {/* تبديل بين الجديد والأرشيف */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button onClick={() => setShowArchived(false)} style={{ padding: '10px 20px', backgroundColor: !showArchived ? '#0ea5e9' : '#e2e8f0', color: !showArchived ? 'white' : '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', marginLeft: '10px' }}>الطلبات الجديدة</button>
        <button onClick={() => setShowArchived(true)} style={{ padding: '10px 20px', backgroundColor: showArchived ? '#22c55e' : '#e2e8f0', color: showArchived ? 'white' : '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>الأرشيف</button>
      </div>

      <div>
        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#64748b' }}>لا توجد طلبات في هذا القسم.</p>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} style={{ 
              backgroundColor: '#fff', padding: '20px', marginBottom: '15px', borderRadius: '12px', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              borderRight: `8px solid ${order.branch === 'riyadh' ? '#0ea5e9' : '#22c55e'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>فرع {order.branch === 'riyadh' ? 'الرياض' : 'القطيف'}</span>
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>{new Date(order.timestamp).toLocaleString('ar-SA')}</span>
              </div>
              
              <p><strong>👤 الاسم:</strong> {order.customerName}</p>
              <p><strong>📞 الجوال:</strong> {order.customerPhone}</p>
              <p><strong>📍 العنوان:</strong> {order.customerAddress}</p>
              
              <div style={{ marginTop: '10px' }}>
                <strong>الطلبات:</strong>
                {order.items.map((item: any, idx: number) => (
                  <li key={idx} style={{ fontSize: '14px', color: '#475569' }}>{item.name} - الكمية: {item.quantity}</li>
                ))}
              </div>

              <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>الإجمالي: {order.total} ر.س</span>
                {!showArchived && (
                  <button onClick={() => markAsDone(order.id)} style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    تم التنفيذ ✅
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;