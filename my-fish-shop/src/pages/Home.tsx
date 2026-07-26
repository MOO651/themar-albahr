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
    <div style={{ textAlign: 'center', direction: 'rtl', fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#f0f9ff', paddingBottom: '50px', minHeight: '100vh' }}>
      
      {/* البانر مع تدرج ألوان بحري فاتح ومشرق */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', 
        color: 'white', 
        padding: '80px 20px', 
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(14, 165, 233, 0.2)'
      }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          backgroundColor: '#ffffff', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 20px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)' 
        }}>
          <img src={logo} alt="Logo" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
        </div>
        <h1 style={{ 
          fontSize: '3rem', 
          margin: '0', 
          fontWeight: '800', 
          background: 'linear-gradient(to right, #ffffff, #e0f2fe)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          ثمار البحر
        </h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px', color: '#e0f2fe', fontWeight: '500' }}>طعم التميز.. نأتيكم بأجود الأسماك الطازجة</p>
      </div>

      {/* الفروع (الرياض، جدة، القطيف) */}
      <div style={{ padding: '20px', marginBottom: '40px' }}>
        <h2 style={{ color: '#0369a1', marginBottom: '25px', fontWeight: '700' }}>اختر فرعك للبدء</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link to="/riyadh" style={{ padding: '15px 40px', backgroundColor: '#0ea5e9', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(14,165,233,0.3)', transition: '0.3s' }}>فرع الرياض</Link>
          <Link to="/jeddah" style={{ padding: '15px 40px', backgroundColor: '#0284c7', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(2,132,199,0.3)', transition: '0.3s' }}>فرع جدة</Link>
          <Link to="/qatif" style={{ padding: '15px 40px', backgroundColor: '#0369a1', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(3,105,161,0.3)', transition: '0.3s' }}>فرع القطيف</Link>
        </div>
      </div>

      {/* الميزات المصغرة */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '0 20px', flexWrap: 'wrap', marginBottom: '60px' }}>
        {features.map((item, i) => (
          <div key={i} style={{ padding: '25px', borderRadius: '20px', width: '140px', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(14,165,233,0.08)', border: '1px solid #e0f2fe' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0369a1' }}>{item.text}</div>
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
          <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(14,165,233,0.06)', border: '1px solid #bae6fd' }}>
            <h3 style={{ color: '#0284c7', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🐟</span> من نحن
            </h3>
            <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
              متجر ثمار البحر، وجهتك الأولى لأفضل وأفخر أنواع الأسماك الطازجة والمأكولات البحرية المنتقاة بعناية فائقة من بحارنا لتصل إلى مائدتك يومياً بأعلى معايير الجودة والنظافة.
            </p>
          </div>

          {/* كارت لماذا نحن */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(14,165,233,0.06)', border: '1px solid #bae6fd' }}>
            <h3 style={{ color: '#0284c7', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>⭐</span> لماذا نحن
            </h3>
            <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
              نتميز بالتوصيل السريع ضمن حافظات مبردة تحافظ على النضارة الكاملة، مع التطهير والتعقيم المستمر لضمان سلامتك، وأسعار تنافسية تضمن لك أفضل قيمة.
            </p>
          </div>

          {/* كارت اتصل بنا مع زر الخريطة */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(14,165,233,0.06)', border: '1px solid #bae6fd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: '#0284c7', marginBottom: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📞</span> اتصل بنا
              </h3>
              <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                نسعد بخدمتكم وتلبية طلباتكم على مدار الساعة عبر فروعنا المتاحة في الرياض وجدة والقطيف، أو من خلال خدمة الواتساب المتاحة دائماً لخدمتكم بكل فخر.
              </p>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <a 
                href="https://maps.app.goo.gl/bdbDFUZYofukC1Zf8" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  padding: '10px 18px', 
                  backgroundColor: '#0ea5e9', 
                  color: 'white', 
                  borderRadius: '10px', 
                  textDecoration: 'none', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                  transition: '0.3s'
                }}
              >
                📍 موقعنا على الخريطة (فرع القطيف)
              </a>
            </div>
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
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
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