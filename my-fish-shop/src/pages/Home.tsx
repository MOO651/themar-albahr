import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      // خلفية دمجت اللون المشرق الفاتح مع تدرج بحري ناعم
      background: "linear-gradient(135deg, #00b4d8 0%, #48cae4 40%, #0077b6 100%)",
      overflow: "hidden",
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      direction: "rtl",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "30px 20px"
    }}>
      
      {/* عناصر جمالية تعبيرية للأسماك والشعب والصدف بتصميم شفاف ومشرق */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px)",
        backgroundSize: "30px 30px",
        pointerEvents: "none",
        zIndex: 1
      }}></div>

      {/* شريط التنقل العلوي */}
      <div style={{
        position: "relative",
        zIndex: 3,
        width: "100%",
        maxWidth: "1100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 25px",
        background: "rgba(255, 255, 255, 0.35)",
        backdropFilter: "blur(12px)",
        borderRadius: "50px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <Link to="/" style={{ color: "#03045e", fontWeight: "bold", textDecoration: "none" }}>الرئيسية</Link>
          <Link to="/riyadh" style={{ color: "#03045e", textDecoration: "none", fontWeight: "500" }}>الرياض</Link>
          <Link to="/jeddah" style={{ color: "#03045e", textDecoration: "none", fontWeight: "500" }}>جدة</Link>
          <Link to="/qatif" style={{ color: "#03045e", textDecoration: "none", fontWeight: "500" }}>القطيف</Link>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link to="/login" style={{ color: "#03045e", textDecoration: "none", fontWeight: "600" }}>تسجيل الدخول</Link>
          <Link to="/cart" style={{ backgroundColor: "#0077b6", color: "white", padding: "8px 22px", borderRadius: "20px", textDecoration: "none", fontWeight: "bold", boxShadow: "0 4px 15px rgba(0,119,182,0.3)" }}>السلة 🛒</Link>
        </div>
      </div>

      {/* محتوى الصفحة الرئيسي */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", width: "100%", marginTop: "2vh" }}>
        
        {/* الشعار */}
        <div style={{
          background: "white",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
          border: "4px solid rgba(255,255,255,0.9)"
        }}>
          <img src={logo} alt="Logo" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
        </div>

        {/* العنوان الرئيسي */}
        <h1 style={{
          color: "#ffffff",
          fontSize: "3.2rem",
          fontWeight: "900",
          marginBottom: "10px",
          textShadow: "0 3px 15px rgba(0,0,0,0.2)"
        }}>
          ثمار البحر
        </h1>

        <p style={{
          color: "#e0fbfc",
          fontSize: "1.25rem",
          fontWeight: "600",
          letterSpacing: "1px",
          marginBottom: "40px",
          textShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          طعم التميز.. نأتيكم بأجود الأسماك الطازجة
        </p>

        {/* أزرار الفروع بتصميم صدف فخم ومضيء */}
        <div>
          <h3 style={{ color: "#ffffff", marginBottom: "25px", fontWeight: "700", fontSize: "1.4rem", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            اختر فرعك للبدء
          </h3>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            maxWidth: "750px",
            margin: "0 auto"
          }}>
            <Link to="/riyadh" className="shell-btn" style={{
              padding: "16px 38px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.9)",
              color: "#03045e",
              fontSize: "1.15rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 1)",
              transition: "all 0.3s ease"
            }}>
              🐚 فرع الرياض
            </Link>

            <Link to="/jeddah" className="shell-btn" style={{
              padding: "16px 38px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.9)",
              color: "#03045e",
              fontSize: "1.15rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 1)",
              transition: "all 0.3s ease"
            }}>
              🐚 فرع جدة
            </Link>

            <Link to="/qatif" className="shell-btn" style={{
              padding: "16px 38px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.9)",
              color: "#03045e",
              fontSize: "1.15rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 1)",
              transition: "all 0.3s ease"
            }}>
              🐚 فرع القطيف
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        .shell-btn:hover {
          background: #03045e !important;
          color: #ffffff !important;
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(3, 4, 94, 0.35) !important;
        }
      `}</style>

      {/* حقوق النشر */}
      <div style={{ position: "relative", zIndex: 3, color: "#e0fbfc", fontSize: "0.9rem", fontWeight: "600", marginTop: "20px", textShadow: "0 1px 5px rgba(0,0,0,0.2)" }}>
        جميع الحقوق محفوظة © ثمار البحر 2026
      </div>

    </div>
  );
};

export default Home;