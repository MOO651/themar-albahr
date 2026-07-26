import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

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
      .nav-link:hover {
        color: #90e0ef !important;
      }
      .nav-login:hover {
        background: rgba(255, 255, 255, 0.2) !important;
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
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #03045e 0%, #0077b6 50%, #48cae4 100%)',
      overflow: 'hidden',
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      direction: 'rtl',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      color: 'white'
    }}>
      
      <OceanElements />

      {/* شريط التنقل (Navbar) العلوي المتناسق */}
      <nav style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '50px',
        padding: '12px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        marginTop: '10px'
      }}>
        {/* اللوجو واسم المتجر */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            background: 'white',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            <img src={logo} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
          </div>
          <span style={{ color: 'white', fontSize: '1.3rem', fontWeight: '800', letterSpacing: '0.5px' }}>ثمار البحر</span>
        </Link>

        {/* روابط التصفح */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/" className="nav-link" style={{ color: 'white', textDecoration: 'none', fontSize: '1.05rem', fontWeight: '600', transition: 'color 0.3s' }}>الرئيسية</Link>
          <Link to="/riyadh" className="nav-link" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: '500', transition: 'color 0.3s' }}>فرع الرياض</Link>
          <Link to="/jeddah" className="nav-link" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: '500', transition: 'color 0.3s' }}>فرع جدة</Link>
          <Link to="/qatif" className="nav-link" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: '500', transition: 'color 0.3s' }}>فرع القطيف</Link>
        </div>

        {/* أزرار الدخول والسلة */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="nav-login" style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.4)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}>
            دخول
          </button>
          <Link to="/cart" style={{
            background: '#ffffff',
            color: '#03045e',
            padding: '8px 22px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}>
            السلة (0)
          </Link>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', width: '100%', maxWidth: '900px', margin: 'auto 0' }}>
        
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          marginBottom: '15px',
          textShadow: '0 3px 15px rgba(0,0,0,0.3)',
          letterSpacing: '1px'
        }}>
          أهلاً بكم في ثمار البحر
        </h1>

        <p style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          lineHeight: '1.6',
          marginBottom: '40px',
          opacity: '0.9',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          اكتشفوا تشكيلتنا الواسعة من أجود الأسماك والمأكولات البحرية الطازجة،<br />
          تصلكم من بحارنا إلى مائدتكم بكل فخر.
        </p>

        <h3 style={{
          fontSize: '1.8rem',
          marginBottom: '25px',
          fontWeight: '700',
          color: '#caf0f8'
        }}>
          اختر الفرع الأقرب إليك للبدء
        </h3>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '25px',
          flexWrap: 'wrap'
        }}>
          <Link to="/riyadh" className="pearl-btn" style={{
            padding: '16px 35px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#03045e',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(0, 119, 182, 0.3)',
            border: '1px solid rgba(255, 255, 255, 1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🏛️ فرع الرياض
          </Link>

          <Link to="/jeddah" className="pearl-btn" style={{
            padding: '16px 35px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#03045e',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(0, 119, 182, 0.3)',
            border: '1px solid rgba(255, 255, 255, 1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ⚓ فرع جدة
          </Link>

          <Link to="/qatif" className="pearl-btn" style={{
            padding: '16px 35px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#03045e',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(0, 119, 182, 0.3)',
            border: '1px solid rgba(255, 255, 255, 1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🌴 فرع القطيف
          </Link>
        </div>

      </div>

      {/* حقوق النشر في الأسفل */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        color: '#e0fbfc',
        fontSize: '0.9rem',
        fontWeight: '500',
        opacity: '0.8',
        textShadow: '0 1px 5px rgba(0,0,0,0.2)',
        marginBottom: '10px'
      }}>
        جميع الحقوق محفوظة © ثمار البحر 2026
      </div>

    </div>
  );
};

export default Home;