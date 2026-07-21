import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    { icon: '🐟', text: 'جودة عالية' },
    { icon: '✨', text: 'نظافة وتعقيم' },
    { icon: '🚚', text: 'توصيل سريع' },
    { icon: '💎', text: 'أسعار تنافسية' }
  ];

  return (
    <div style={{ textAlign: 'center', direction: 'rtl', fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#f8fafc', paddingBottom: '50px' }}>
      
      {/* البانر مع تدرج ألوان للعنوان */}
      <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)', color: 'white', padding: '80px 20px', marginBottom: '40px' }}>
        <div style={{ width: '120px', height: '120px', backgroundColor: '#ffffff', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <img src={logo} alt="Logo" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: '3rem', margin: '0', fontWeight: '800', background: 'linear-gradient(to right, #ffffff, #e0f2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ثمار البحر
        </h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px', opacity: 0.9 }}>طعم التميز.. نأتيكم بأجود الأسماك الطازجة</p>
      </div>

      {/* الفروع */}
      <div style={{ padding: '20px', marginBottom: '40px' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '25px' }}>اختر فرعك للبدء</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link to="/riyadh" style={{ padding: '15px 40px', backgroundColor: '#0ea5e9', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', transition: '0.3s' }}>فرع الرياض</Link>
          <Link to="/qatif" style={{ padding: '15px 40px', backgroundColor: '#334155', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', transition: '0.3s' }}>فرع القطيف</Link>
        </div>
      </div>

      {/* الميزات المصغرة */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '0 20px', flexWrap: 'wrap', marginBottom: '60px' }}>
        {features.map((item, i) => (
          <div key={i} style={{ padding: '25px', borderRadius: '20px', width: '140px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>{item.text}</div>
          </div>
        ))}
      </div>

      {/* أقسام المتجر التفصيلية (من نحن، لماذا نحن، اتصل بنا) */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', marginBottom: '50px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '25px',
          textAlign: 'right'
        }}>
          
          {/* كارت من نحن */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#0ea5e9', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🐟</span> من نحن
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
              متجر ثمار البحر، وجهتك الأولى لأفضل وأفخر أنواع الأسماك الطازجة والمأكولات البحرية المنتقاة بعناية فائقة من بحارنا لتصل إلى مائدتك يومياً بأعلى معايير الجودة والنظافة.
            </p>
          </div>

          {/* كارت لماذا نحن */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#0ea5e9', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>⭐</span> لماذا نحن
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
              نتميز بالتوصيل السريع ضمن حافظات مبردة تحافظ على النضارة الكاملة، مع التطهير والتعقيم المستمر لضمان سلامتك، وأسعار تنافسية تضمن لك أفضل قيمة.
            </p>
          </div>

          {/* كارت اتصل بنا */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#0ea5e9', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📞</span> اتصل بنا
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
              نسعد بخدمتكم وتلبية طلباتكم على مدار الساعة عبر فروعنا المتاحة في الرياض والقطيف، أو من خلال خدمة الواتساب المتاحة دائماً لخدمتكم بكل فخر.
            </p>
          </div>

        </div>
      </div>

      {/* زر الواتساب العائم (Floating Button) */}
      <a 
        href="https://wa.me/966577972769" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '15px',
          borderRadius: '50%',
          fontSize: '30px',
          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
          zIndex: 1000,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: '0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        💬
      </a>

    </div>
  );
};
export default Home;