import React from 'react';
import { Link } from 'react-router-dom';

const OceanElements: React.FC = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'hidden'
  }}>
    <style>{`
      @keyframes fishPathA {
        0% { transform: translate(10vw, 20vh) scaleX(1); }
        25% { transform: translate(75vw, 30vh) scaleX(1); }
        50% { transform: translate(85vw, 75vh) scaleX(-1); }
        75% { transform: translate(15vw, 70vh) scaleX(-1); }
        100% { transform: translate(10vw, 20vh) scaleX(1); }
      }
      @keyframes fishPathB {
        0% { transform: translate(80vw, 65vh) scaleX(-1); }
        25% { transform: translate(25vw, 80vh) scaleX(-1); }
        50% { transform: translate(10vw, 25vh) scaleX(1); }
        75% { transform: translate(70vw, 20vh) scaleX(1); }
        100% { transform: translate(80vw, 65vh) scaleX(-1); }
      }
      @keyframes fishPathC {
        0% { transform: translate(45vw, 50vh) scaleX(1); }
        33% { transform: translate(80vw, 40vh) scaleX(1); }
        66% { transform: translate(20vw, 45vh) scaleX(-1); }
        100% { transform: translate(45vw, 50vh) scaleX(1); }
      }
      @keyframes fishPathD {
        0% { transform: translate(30vw, 15vh) scaleX(1); }
        50% { transform: translate(60vw, 85vh) scaleX(-1); }
        100% { transform: translate(30vw, 15vh) scaleX(1); }
      }
      .fish-node { 
        position: absolute; 
        will-change: transform; 
      }
      .path-a { animation: fishPathA 16s ease-in-out infinite; }
      .path-b { animation: fishPathB 20s ease-in-out infinite; }
      .path-c { animation: fishPathC 14s ease-in-out infinite; }
      .path-d { animation: fishPathD 22s ease-in-out infinite; }
      .pearl-btn:hover {
        background: #ffffff !important;
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 30px rgba(0, 119, 182, 0.4) !important;
      }

      /* تحسينات التجاوب الشاملة للموبايل */
      @media (max-width: 768px) {
        .main-title {
          font-size: 2.2rem !important;
        }
        .main-desc {
          font-size: 1rem !important;
          padding: 0 10px;
        }
        .section-title {
          font-size: 1.25rem !important;
        }
        .branches-container {
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 12px !important;
          padding: 0 15px;
        }
        .pearl-btn {
          width: 100% !important;
          justify-content: center !important;
        }
      }
    `}</style>

    <div className="fish-node path-a" style={{ fontSize: '3rem', top: 0, left: 0 }}>🐠</div>
    <div className="fish-node path-b" style={{ fontSize: '2.5rem', top: 0, left: 0, animationDelay: '-2s' }}>🐟</div>
    <div className="fish-node path-c" style={{ fontSize: '3.5rem', top: 0, left: 0, animationDelay: '-5s' }}>🐬</div>
    <div className="fish-node path-d" style={{ fontSize: '2.2rem', top: 0, left: 0, animationDelay: '-8s' }}>🐡</div>
    
    <div className="fish-node path-b" style={{ fontSize: '2.8rem', top: 0, left: 0, animationDelay: '-3s' }}>🦐</div>
    <div className="fish-node path-a" style={{ fontSize: '2.1rem', top: 0, left: 0, animationDelay: '-7s' }}>🐟</div>
    <div className="fish-node path-c" style={{ fontSize: '3.2rem', top: 0, left: 0, animationDelay: '-10s' }}>🐠</div>
    <div className="fish-node path-d" style={{ fontSize: '3.8rem', top: 0, left: 0, animationDelay: '-4s' }}>🐳</div>

    <div className="fish-node path-c" style={{ fontSize: '2.4rem', top: 0, left: 0, animationDelay: '-1s' }}>🐟</div>
    <div className="fish-node path-d" style={{ fontSize: '2.6rem', top: 0, left: 0, animationDelay: '-6s' }}>🐠</div>
    <div className="fish-node path-a" style={{ fontSize: '2.9rem', top: 0, left: 0, animationDelay: '-11s' }}>🐡</div>
    <div className="fish-node path-b" style={{ fontSize: '3.1rem', top: 0, left: 0, animationDelay: '-9s' }}>🐬</div>

    <div style={{ position: 'absolute', bottom: '-15px', right: '2%', fontSize: '9rem', opacity: 0.65, zIndex: 2 }}>🪸</div>
    <div style={{ position: 'absolute', bottom: '-25px', left: '2%', fontSize: '11rem', opacity: 0.65, zIndex: 2 }}>🪸</div>
    <div style={{ position: 'absolute', bottom: '-10px', right: '25%', fontSize: '7rem', opacity: 0.5, zIndex: 2 }}>🌿</div>
    <div style={{ position: 'absolute', bottom: '-10px', left: '25%', fontSize: '7rem', opacity: 0.5, zIndex: 2 }}>🌿</div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div style={{
      position: 'relative',
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(180deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)',
      overflow: 'hidden',
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      direction: 'rtl',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '30px 15px',
      color: 'white'
    }}>
      
      <OceanElements />

      {/* المحتوى الرئيسي */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', width: '100%', maxWidth: '900px', margin: '10px 0' }}>
        
        <h1 className="main-title" style={{
          fontSize: '3.2rem',
          fontWeight: '900',
          marginBottom: '15px',
          textShadow: '0 3px 15px rgba(0,0,0,0.3)',
          letterSpacing: '1px'
        }}>
          أهلاً بكم في ثمار البحر 🌊
        </h1>

        <p className="main-desc" style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          lineHeight: '1.6',
          marginBottom: '30px',
          opacity: '0.95',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          اكتشفوا تشكيلتنا الواسعة من أجود الأسماك والمأكولات البحرية الطازجة،<br />
          تصلكم من بحارنا إلى مائدتكم بكل فخر.
        </p>

        <h3 className="section-title" style={{
          fontSize: '1.5rem',
          marginBottom: '20px',
          fontWeight: '700',
          color: '#e0fbfc'
        }}>
          اختر الفرع الأقرب إليك للبدء
        </h3>

        {/* أزرار الفروع */}
        <div className="branches-container" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
          marginBottom: '35px'
        }}>
          <Link to="/riyadh" className="pearl-btn" style={{
            padding: '14px 28px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#0077b6',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(0, 119, 182, 0.3)',
            border: '1px solid rgba(255, 255, 255, 1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🏛️ فرع الرياض
          </Link>

          <Link to="/jeddah" className="pearl-btn" style={{
            padding: '14px 28px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#0077b6',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(0, 119, 182, 0.3)',
            border: '1px solid rgba(255, 255, 255, 1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⚓ فرع جدة
          </Link>

          <Link to="/qatif" className="pearl-btn" style={{
            padding: '14px 28px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#0077b6',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(0, 119, 182, 0.3)',
            border: '1px solid rgba(255, 255, 255, 1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🌴 فرع القطيف
          </Link>
        </div>

        {/* قسم مميزات المتجر */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '15px',
          maxWidth: '850px',
          margin: '0 auto',
          padding: '0 10px'
        }}>
          <div style={featureCardStyle}>
            <div style={{ fontSize: '26px', marginBottom: '6px' }}>🐟</div>
            <h4 style={{ margin: '5px 0', fontSize: '1rem', color: '#0077b6' }}>طازج يومياً</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#555' }}>نختار لك أجود الأسماك بعناية فائقة.</p>
          </div>

          <div style={featureCardStyle}>
            <div style={{ fontSize: '26px', marginBottom: '6px' }}>✂️</div>
            <h4 style={{ margin: '5px 0', fontSize: '1rem', color: '#0077b6' }}>تنظيف وتقطيع</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#555' }}>تجهيز الأسماك حسب رغبتك مجاناً.</p>
          </div>

          <div style={featureCardStyle}>
            <div style={{ fontSize: '26px', marginBottom: '6px' }}>🚀</div>
            <h4 style={{ margin: '5px 0', fontSize: '1rem', color: '#0077b6' }}>توصيل سريع</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#555' }}>نوصل طلبك محافظاً على جودته وبرودته.</p>
          </div>
        </div>

      </div>

      {/* حقوق النشر في الأسفل */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        color: '#e0fbfc',
        fontSize: '0.8rem',
        fontWeight: '500',
        opacity: '0.85',
        textShadow: '0 1px 5px rgba(0,0,0,0.2)',
        marginTop: '15px'
      }}>
        جميع الحقوق محفوظة © ثمار البحر 2026
      </div>

    </div>
  );
};

// ستايل كروت المميزات المضافة
const featureCardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.92)',
  borderRadius: '15px',
  padding: '14px',
  textAlign: 'center' as const,
  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.4)'
};

export default Home;