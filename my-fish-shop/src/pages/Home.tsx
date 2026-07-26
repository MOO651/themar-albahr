import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #00b4d8 0%, #48cae4 50%, #90e0ef 100%)",
      overflow: "hidden",
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      direction: "rtl",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "30px 20px"
    }}>
      
      {/* طبقة إضاءة شفافة لإعطاء إشراقة بحرية */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,180,216,0.1) 100%)",
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
        padding: "10px 20px",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        borderRadius: "50px",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/" style={{ color: "#03045e", fontWeight: "bold", textDecoration: "none" }}>الرئيسية</Link>
          <Link to="/riyadh" style={{ color: "#03045e", textDecoration: "none" }}>الرياض</Link>
          <Link to="/jeddah" style={{ color: "#03045e", textDecoration: "none" }}>جدة</Link>
          <Link to="/qatif" style={{ color: "#03045e", textDecoration: "none" }}>القطيف</Link>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link to="/login" style={{ color: "#03045e", textDecoration: "none", fontWeight: "500" }}>تسجيل الدخول</Link>
          <Link to="/cart" style={{ backgroundColor: "#0077b6", color: "white", padding: "8px 20px", borderRadius: "20px", textDecoration: "none", fontWeight: "bold" }}>السلة 🛒</Link>
        </div>
      </div>

      {/* محتوى الصفحة الرئيسي */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", width: "100%", marginTop: "3vh" }}>
        
        {/* الشعار */}
        <div style={{
          background: "white",
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          border: "3px solid rgba(255,255,255,0.8)"
        }}>
          <img src={logo} alt="Logo" style={{ width: "65%", height: "65%", objectFit: "contain" }} />
        </div>

        {/* العنوان الرئيسي */}
        <h1 style={{
          color: "#03045e",
          fontSize: "3rem",
          fontWeight: "900",
          marginBottom: "10px",
          textShadow: "0 2px 10px rgba(255,255,255,0.6)"
        }}>
          ثمار البحر
        </h1>

        <p style={{
          color: "#023e8a",
          fontSize: "1.2rem",
          fontWeight: "600",
          letterSpacing: "1px",
          marginBottom: "40px"
        }}>
          طعم التميز.. نأتيكم بأجود الأسماك الطازجة
        </p>

        {/* أزرار الفروع */}
        <div>
          <h3 style={{ color: "#03045e", marginBottom: "25px", fontWeight: "700", fontSize: "1.3rem" }}>
            اختر فرعك للبدء
          </h3>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            <Link to="/riyadh" className="shell-btn" style={{
              padding: "15px 35px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.85)",
              color: "#03045e",
              fontSize: "1.1rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(0, 119, 182, 0.2)",
              border: "1px solid rgba(255, 255, 255, 1)",
              transition: "all 0.3s ease"
            }}>
              🐚 فرع الرياض
            </Link>

            <Link to="/jeddah" className="shell-btn" style={{
              padding: "15px 35px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.85)",
              color: "#03045e",
              fontSize: "1.1rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(0, 119, 182, 0.2)",
              border: "1px solid rgba(255, 255, 255, 1)",
              transition: "all 0.3s ease"
            }}>
              🐚 فرع جدة
            </Link>

            <Link to="/qatif" className="shell-btn" style={{
              padding: "15px 35px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.85)",
              color: "#03045e",
              fontSize: "1.1rem",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(0, 119, 182, 0.2)",
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
          box-shadow: 0 12px 30px rgba(3, 4, 94, 0.3) !important;
        }
      `}</style>

      {/* حقوق النشر */}
      <div style={{ position: "relative", zIndex: 3, color: "#023e8a", fontSize: "0.9rem", fontWeight: "600", marginTop: "20px" }}>
        جميع الحقوق محفوظة © ثمار البحر 2026
      </div>

    </div>
  );
};

export default Home;