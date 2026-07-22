import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const Cart = () => {
  const { riyadhItems, qatifItems, jeddahItems, updateQuantity, removeFromCart } = useContext(CartContext) as any;
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  
  // فصل بيانات العميل لكل فرع لوحده تماماً
  const [riyadhCustomer, setRiyadhCustomer] = useState({ name: '', phone: '', address: '' });
  const [qatifCustomer, setQatifCustomer] = useState({ name: '', phone: '', address: '' });
  const [jeddahCustomer, setJeddahCustomer] = useState({ name: '', phone: '', address: '' });

  const handleQuantityChange = (branch: 'riyadh' | 'qatif' | 'jeddah', productId: string, delta: number) => {
    let items;
    if (branch === 'riyadh') items = riyadhItems;
    else if (branch === 'qatif') items = qatifItems;
    else items = jeddahItems;

    const currentItem = items.find((i: any) => i.id === productId);
    if (currentItem) {
      const newQty = currentItem.quantity + delta;
      if (newQty < 1) {
        removeFromCart(productId, branch);
      } else {
        updateQuantity(productId, branch, newQty);
      }
    }
  };

  const saveOrderToAdmin = async (branch: string, items: any[], total: number, customer: any) => {
    try {
      await addDoc(collection(db, "orders"), {
        branch,
        items,
        total,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        timestamp: new Date().toISOString(),
        status: 'جديد'
      });
    } catch (e) {
      console.error("خطأ في حفظ الطلب: ", e);
    }
  };

  const sendToWhatsApp = (branch: string, items: any[], customer: any) => {
    let phone = '966577972769'; // رقم الرياض
    if (branch === 'qatif') phone = '966595273048'; // رقم القطيف
    else if (branch === 'jeddah') phone = '966560350663'; // رقم جدة

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let text = `📦 طلب جديد من فرع (${branch}) - ${customer.name || 'عميل جديد'}` +
      `\n\n👤 الاسم: ${customer.name}` +
      `\n📞 الجوال: ${customer.phone}` +
      `\n📍 العنوان: ${customer.address}` +
      `\n\nالطلبات:`;

    items.forEach(i => {
      const note = notes[i.id] ? ` (ملاحظة: ${notes[i.id]})` : '';
      text += `\n- ${i.name} (x${i.quantity})${note}`;
    });

    text += `\n\n💰 الإجمالي: ${total} ر.س`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const renderSection = (items: any[], branch: 'riyadh' | 'qatif' | 'jeddah', title: string, color: string) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let customer, setCustomer;
    if (branch === 'riyadh') {
      customer = riyadhCustomer;
      setCustomer = setRiyadhCustomer;
    } else if (branch === 'qatif') {
      customer = qatifCustomer;
      setCustomer = setQatifCustomer;
    } else {
      customer = jeddahCustomer;
      setCustomer = setJeddahCustomer;
    }

    return (
      <div style={{ 
        backgroundColor: "#fff", 
        borderRadius: "20px", 
        padding: "24px", 
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px', borderBottom: `2px solid ${color}`, paddingBottom: '12px' }}>
            <h2 style={{ color: color, fontSize: '20px', fontWeight: '800', margin: 0 }}>
              {title}
            </h2>
            <span style={{ backgroundColor: color, color: '#fff', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' }}>
              {items.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
          </div>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛒</div>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>السلة فارغة في هذا الفرع</p>
              <p style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '5px' }}>أضف بعض منتجات الأسماك الطازجة للبدء!</p>
            </div>
          ) : (
            <>
              <div style={{ maxHeight: '260px', overflowY: 'auto', marginBottom: '15px', paddingRight: '4px' }}>
                {items.map((item: any) => (
                  <div key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>{item.name}</div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button onClick={() => handleQuantityChange(branch, item.id, -1)} style={{ border:'none', cursor:'pointer', width:'28px', height:'28px', borderRadius:'6px', backgroundColor: '#f1f5f9', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(branch, item.id, 1)} style={{ border:'none', cursor:'pointer', width:'28px', height:'28px', borderRadius:'6px', backgroundColor: '#f1f5f9', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      placeholder="ملاحظة إضافية (تنظيف، تقطيع...)" 
                      style={{ width: '100%', marginTop: '8px', padding: '7px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', outline: 'none', backgroundColor: '#fafafa' }} 
                      onChange={(e) => setNotes({...notes, [item.id]: e.target.value})}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', color: '#334155' }}>
                <span>الإجمالي:</span>
                <span style={{ color: color, fontSize: '18px' }}>{total} ر.س</span>
              </div>

              <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="الاسم الكريم *" 
                  value={customer.name} 
                  style={{ padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px' }} 
                  onChange={(e) => setCustomer({...customer, name: e.target.value})} 
                />
                <input 
                  type="text" 
                  placeholder="رقم الجوال *" 
                  value={customer.phone} 
                  style={{ padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px' }} 
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})} 
                />
                <input 
                  type="text" 
                  placeholder="العنوان بالتفصيل *" 
                  value={customer.address} 
                  style={{ padding: '11px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px' }} 
                  onChange={(e) => setCustomer({...customer, address: e.target.value})} 
                />
              </div>

              <button 
                onClick={() => {
                  if(!customer.name || !customer.phone) {
                    alert("يرجى إدخال الاسم ورقم الجوال على الأقل لإتمام الطلب");
                    return;
                  }
                  sendToWhatsApp(branch, items, customer); 
                  saveOrderToAdmin(branch, items, total, customer); 
                }} 
                style={{ 
                  marginTop: "18px", 
                  width: "100%", 
                  padding: "13px", 
                  backgroundColor: "#25D366", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "10px", 
                  cursor: "pointer", 
                  fontWeight: "bold", 
                  fontSize: "14px",
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                  transition: '0.2s'
                }}
              >
                إتمام الطلب عبر واتساب 💬
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#f8fafc", minHeight: "100vh", direction: 'rtl' }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "35px", color: '#1e293b', fontWeight: '800', fontSize: '28px' }}>🛒 حقيبة المشتريات</h1>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "25px", 
          alignItems: 'start' 
        }}>
          {renderSection(riyadhItems, 'riyadh', "سلة الرياض", "#0ea5e9")}
          {renderSection(qatifItems, 'qatif', "سلة القطيف", "#22c55e")}
          {renderSection(jeddahItems, 'jeddah', "سلة جدة", "#f59e0b")}
        </div>
      </div>
    </div>
  );
};

export default Cart;