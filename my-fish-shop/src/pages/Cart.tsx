import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot, setDoc, collection, addDoc } from "firebase/firestore";

const Cart = () => {
  const [riyadhItems, setRiyadhItems] = useState<any[]>([]);
  const [qatifItems, setQatifItems] = useState<any[]>([]);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  // تم إضافة حقل الاسم هنا
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    const unsubR = onSnapshot(doc(db, "carts", "cart_riyadh"), (s) => setRiyadhItems(s.exists() ? s.data().items : []));
    const unsubQ = onSnapshot(doc(db, "carts", "cart_qatif"), (s) => setQatifItems(s.exists() ? s.data().items : []));
    return () => { unsubR(); unsubQ(); };
  }, []);

  const updateQuantity = async (branch: string, productId: string, delta: number) => {
    const branchId = branch === 'riyadh' ? 'cart_riyadh' : 'cart_qatif';
    const items = branch === 'riyadh' ? [...riyadhItems] : [...qatifItems];
    const index = items.findIndex((i) => i.id === productId);
    if (index > -1) {
      items[index].quantity += delta;
      if (items[index].quantity < 1) items.splice(index, 1);
      await setDoc(doc(db, "carts", branchId), { items });
    }
  };

  const saveOrderToAdmin = async (branch: string, items: any[], total: number) => {
    try {
      await addDoc(collection(db, "orders"), {
        branch,
        items,
        total,
        customerName: customerInfo.name, // حفظ الاسم
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        timestamp: new Date().toISOString(),
        status: 'جديد'
      });
    } catch (e) {
      console.error("خطأ في حفظ الطلب: ", e);
    }
  };

  const sendToWhatsApp = (branch: string, items: any[]) => {
    const phone = branch === 'riyadh' ? '966577972769' : '966595273048';
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let text = `📦 طلب جديد من ${customerInfo.name || 'عميل جديد'}` +
      `\n\n👤 الاسم: ${customerInfo.name}` +
      `\n📞 الجوال: ${customerInfo.phone}` +
      `\n📍 العنوان: ${customerInfo.address}` +
      `\n\nالطلبات:`;

    items.forEach(i => {
      const note = notes[i.id] ? ` (ملاحظة: ${notes[i.id]})` : '';
      text += `\n- ${i.name} (x${i.quantity})${note}`;
    });

    text += `\n\n💰 الإجمالي: ${total} ر.س`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const renderSection = (items: any[], branch: string, title: string, color: string) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div style={{ flex: 1, minWidth: '350px', backgroundColor: "#fff", borderRadius: "20px", padding: "25px", boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ color: color, marginBottom: "20px", textAlign: 'center', borderBottom: `2px solid ${color}`, paddingBottom: '10px' }}>{title}</h2>
        {items.length === 0 ? <p style={{ textAlign: 'center', color: '#94a3b8' }}>السلة فارغة</p> : (
          <>
            {items.map((item: any) => (
              <div key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: '600' }}>{item.name}</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onClick={() => updateQuantity(branch, item.id, -1)} style={{ border:'none', cursor:'pointer', padding:'5px 10px', borderRadius:'5px' }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(branch, item.id, 1)} style={{ border:'none', cursor:'pointer', padding:'5px 10px', borderRadius:'5px' }}>+</button>
                  </div>
                </div>
                <input type="text" placeholder="ملاحظة إضافية" style={{ width: '100%', marginTop: '8px', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }} onChange={(e) => setNotes({...notes, [item.id]: e.target.value})}/>
              </div>
            ))}

            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
              الإجمالي: {total} ر.س
            </div>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="الاسم الكريم" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
              <input type="text" placeholder="رقم الجوال" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
              <input type="text" placeholder="العنوان بالتفصيل" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} />
            </div>

            <button onClick={() => { sendToWhatsApp(branch, items); saveOrderToAdmin(branch, items, total); }} style={{ marginTop: "20px", width: "100%", padding: "16px", backgroundColor: "#25D366", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
              إتمام الطلب عبر واتساب 💬
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>🛒 حقيبة المشتريات</h1>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }}>
        {renderSection(riyadhItems, 'riyadh', "سلة الرياض", "#0ea5e9")}
        {renderSection(qatifItems, 'qatif', "سلة القطيف", "#22c55e")}
      </div>
    </div>
  );
};
export default Cart;