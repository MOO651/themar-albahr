import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const Cart = () => {
  const { riyadhItems, qatifItems, jeddahItems, updateQuantity, removeFromCart } = useContext(CartContext) as any;
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  
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
        total: Number(total.toFixed(2)),
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
    let phone = '966577972769';
    if (branch === 'qatif') phone = '966595273048';
    else if (branch === 'jeddah') phone = '966560350663';

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

    text += `\n\n💰 الإجمالي: ${total.toFixed(2)} ر.س`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const renderSection = (items: any[], branch: 'riyadh' | 'qatif' | 'jeddah', title: string, accentColor: string) => {
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
        backgroundColor: "rgba(255, 255, 255, 0.95)", 
        borderRadius: "20px", 
        padding: "24px", 
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        border: '1px solid rgba(255, 255, 255, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease',
        backdropFilter: 'blur(10px)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '12px' }}>
            <h2 style={{ color: '#0077b6', fontSize: '22px', fontWeight: '900', margin: 0 }}>
              {title}
            </h2>
            <span style={{ backgroundColor: accentColor, color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
              {items.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
          </div>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b' }}>
              <div style={{ fontSize: '45px', marginBottom: '10px' }}>🛒</div>
              <p style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: '#1e293b' }}>السلة فارغة في هذا الفرع</p>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '5px' }}>أضف بعض منتجات الأسماك للبدء!</p>
            </div>
          ) : (
            <>
              <div style={{ maxHeight: '260px', overflowY: 'auto', marginBottom: '15px', paddingRight: '4px' }}>
                {items.map((item: any) => (
                  <div key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: '800', color: '#0077b6', fontSize: '15px' }}>{item.name}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={() => handleQuantityChange(branch, item.id, -1)} style={{ border:'none', cursor:'pointer', width:'30px', height:'30px', borderRadius:'8px', backgroundColor: '#0077b6', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>-</button>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center', color: '#0077b6' }}>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(branch, item.id, 1)} style={{ border:'none', cursor:'pointer', width:'30px', height:'30px', borderRadius:'8px', backgroundColor: '#0077b6', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>+</button>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      placeholder="ملاحظة إضافية (تنظيف، تقطيع...)" 
                      style={{ width: '100%', marginTop: '8px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none', backgroundColor: '#f8fafc', color: '#0077b6' }} 
                      onChange={(e) => setNotes({...notes, [item.id]: e.target.value})}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '15px', padding: '14px', backgroundColor: '#f1f5f9', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', color: '#0077b6' }}>
                <span>الإجمالي:</span>
                <span style={{ color: accentColor, fontSize: '20px', fontWeight: '900' }}>{total.toFixed(2)} ر.س</span>
              </div>

              <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="الاسم الكريم *" 
                  value={customer.name} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', backgroundColor: '#fff', color: '#0077b6' }} 
                  onChange={(e) => setCustomer({...customer, name: e.target.value})} 
                />
                <input 
                  type="text" 
                  placeholder="رقم الجوال *" 
                  value={customer.phone} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', backgroundColor: '#fff', color: '#0077b6' }} 
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})} 
                />
                <input 
                  type="text" 
                  placeholder="العنوان بالتفصيل *" 
                  value={customer.address} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', backgroundColor: '#fff', color: '#0077b6' }} 
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
                  padding: "14px", 
                  backgroundColor: "#25D366", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "12px", 
                  cursor: "pointer", 
                  fontWeight: "bold", 
                  fontSize: "15px",
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                  transition: 'all 0.3s ease'
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
    <div style={{ 
      minHeight: "calc(100vh - 70px)",
      background: "linear-gradient(180deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)",
      padding: "40px 20px", 
      direction: 'rtl',
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px", color: '#ffffff', fontWeight: '900', fontSize: '2.8rem', textShadow: "0 3px 15px rgba(0,0,0,0.3)" }}>
          🛒 حقيبة المشتريات
        </h1>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "25px", 
          alignItems: 'start' 
        }}>
          {renderSection(riyadhItems, 'riyadh', "سلة الرياض", "#0077b6")}
          {renderSection(qatifItems, 'qatif', "سلة القطيف", "#0096c7")}
          {renderSection(jeddahItems, 'jeddah', "سلة جدة", "#48cae4")}
        </div>
      </div>
    </div>
  );
};

export default Cart;