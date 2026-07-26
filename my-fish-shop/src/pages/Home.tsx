import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // تأكد من مسار اللوجو الصحيح لديك

// مكون الأسماك والشعاب المرجانية المتحركة
const OceanElements = () => (
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
    {/* تأثيرات حركة الأسماك - CSS Animation */}
    <style>{`
      @keyframes swimRight {
        0% { transform: translateX(-150px) translateY(0px); opacity: 0.7; }
        50% { transform: translateX(50vw) translateY(30px); opacity: 1; }
        100% { transform: translateX(110vw) translateY(-50px); opacity: 0.6; }
      }
      @keyframes swimLeft {
        0% { transform: translateX(110vw) translateY(0px); opacity: 0.7; }
        50% { transform: translateX(40vw) translateY(-20px); opacity: 1; }
        100% { transform: translateX(-150px) translateY(40px); opacity: 0.6; }
      }
      .fish-animated {
        position: absolute;
        font-size: 2rem;
        animation: swimRight 15s infinite linear;
      }
      .fish-animated-left {
        position: absolute;
        font-size: 1.5rem;
        animation: swimLeft 18s infinite linear;
        animation-delay: 5s;
      }
      .fish-group {
        position: absolute;
        width: 150px;
        height: 100px;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
        border-radius: 50%;
        animation: swimRight 25s infinite linear;
        animation-delay: 2s;
      }
      .coral-reef {
        position: absolute;
        bottom: -20px;
        font-size: 5rem;
        opacity: 0.6;
        filter: drop-shadow(0 0 10px rgba(0,0,0,0.3));
      }
    `}</style>

    {/* أسماك متحركة */}
    <div className="fish-animated" style={{ top: '15%', fontSize: '3rem' }}>🐠</div>
    <div className="fish-animated" style={{ top: '75%', fontSize: '2.5rem', animationDelay: '8s' }}>🐟</div>
    <div className="fish-animated-left" style={{ top: '35%', fontSize: '4rem' }}>🐬</div>
    <div className="fish-animated-left" style={{ top: '60%', fontSize: '1.8rem', animationDelay: '12s' }}>🐡</div>
    
    {/* مجموعة أسماك */}
    <div className="fish-group" style={{ top: '20%', left: '10%' }}>
      <span style={{ position: 'absolute', top: '20px', left: '40px', fontSize: '1.2rem' }}>🐟</span>
      <span style={{ position: 'absolute', top: '50px', left: '70px', fontSize: '1.5rem' }}>🐠</span>
      <span style={{ position: 'absolute', top: '30px', left: '100px', fontSize: '1.2rem' }}>🐟</span>
    </div>

    {/* شعاب مرجانية في الأسفل */}
    <div className="coral-reef" style={{ left: '-50px', fontSize: '10rem' }}>🪸</div>
    <div className="coral-reef" style={{ right: '10%', bottom: '-40px', fontSize: '15rem', opacity: 0.4 }}>🪸</div>
    <div className="coral-reef" style={{ left: '25%', bottom: '-60px', fontSize: '8rem', opacity: 0.5 }}>🌿</div>
  </div>
);

const Home = () => {
  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #03045e 0%, #0077b6 50%, #48cae4 100%)", // خلفية زرقاء بحرية متدرجة
      overflow: "hidden",
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      direction: "rtl",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 20px",
      color: "white"
    }}>
      
      {/* إضافة عنصر المحيط بالأسماك والشعاب */}
      <OceanElements />

      {/* محتوى الصفحة الرئيسي */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", width: "100%", maxWidth: "900px" }}>
        
        {/* الشعار بإطار أبيض مضيء وفخم */}
        <div style={{
          background: "white",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          border: "4px solid rgba(255,255,255,0.9)"
        }}>
          <img src={logo} alt="Logo" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
        </div>

        {/* العنوان الرئيسي */}
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "900",
          marginBottom: "15px",
          textShadow: "0 3px 15px rgba(0,0,0,0.3)",
          letterSpacing: "1px"
        }}>
          أهلاً بكم في ثمار البحر
        </h1>

        {/* الوصف */}
        <p style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          lineHeight: "1.6",
          marginBottom: "50px",
          opacity: "0.9",
          textShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}>
          اكتشفوا تشكيلتنا الواسعة من أجود الأسماك والمأكولات البحرية الطازجة،<br />
          تصلكم من بحارنا إلى مائدتكم بكل فخر.
        </p>

        {/* عنوان الأزرار */}
        <h3 style={{
          fontSize: "1.8rem",
          marginBottom: "30px",
          fontWeight: "700",
          color: "#caf0f8"
        }}>
          اختر الفرع الأقرب إليك للبدء
        </h3>

        {/* أزرار الفروع بتصميم لؤلؤي */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap"
        }}>
          <Link to="/riyadh" className="pearl-btn" style={{
            padding: "18px 40px",
            borderRadius: "50px",
            background: "rgba(255, 255, 255, 0.95)",
            color: "#03045e",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(0, 119, 182, 0.3)",
            border: "1px solid rgba(255, 255, 255, 1)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            🏛️ فرع الرياض
          </Link>

          <Link to="/jeddah" className="pearl-btn" style={{
            padding: "18px 40px",
            borderRadius: "50px",
            background: "rgba(255, 255, 255, 0.95)",
            color: "#03045e",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(0, 119, 182, 0.3)",
            border: "1px solid rgba(255, 255, 255, 1)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            ⚓ فرع جدة
          </Link>

          <Link to="/qatif" className="pearl-btn" style={{
            padding: "18px 40px",
            borderRadius: "50px",
            background: "rgba(255, 255, 255, 0.95)",
            color: "#03045e",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(0, 119, 182, 0.3)",
            border: "1px solid rgba(255, 255, 255, 1)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            🌴 فرع القطيف
          </Link>
        </div>

      </div>

      {/* تأثيرات حركة الأزرار */}
      <style>{`
        .pearl-btn:hover {
          background: #ffffff !important;
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 119, 182, 0.4) !important;
        }
      `}</style>

      {/* حقوق النشر */}
      <div style={{
        position: "relative",
        zIndex: 3,
        color: "#e0fbfc",
        fontSize: "0.9rem",
        fontWeight: "500",
        marginTop: "40px",
        opacity: "0.8",
        textShadow: "0 1px 5px rgba(0,0,0,0.2)"
      }}>
        جميع الحقوق محفوظة © ثمار البحر 2026
      </div>

    </div>
  );
};

export default Home;