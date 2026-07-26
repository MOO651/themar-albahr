import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const [customerPhone, setCustomerPhone] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkUserSession = () => {
    const phone = localStorage.getItem('customer_phone');
    setCustomerPhone(phone);
  };

  useEffect(() => {
    checkUserSession();
    window.addEventListener('storage', checkUserSession);
    window.addEventListener('authChange', checkUserSession);

    return () => {
      window.removeEventListener('storage', checkUserSession);
      window.removeEventListener('authChange', checkUserSession);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customer_phone');
    window.dispatchEvent(new Event('authChange'));
    setCustomerPhone(null);
    navigate('/');
  };

  return (
    <>
      <style>{`
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: rgba(3, 4, 94, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          zIndex: 1000;
          font-family: 'Tajawal', 'Segoe UI', sans-serif;
          width: 100%;
          box-sizing: border-box;
        }
        .nav-links-wrapper {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none; /* إخفاء شريط التمرير لفايرفوكس */
        }
        .nav-links-wrapper::-webkit-scrollbar {
          display: none; /* إخفاء شريط التمرير لكروم وسفاري */
        }
        .nav-item {
          text-decoration: none;
          color: '#ffffff';
          font-size: 13px;
          font-weight: 600;
          transition: all 0.3s ease;
          padding: 5px 8px;
          borderRadius: 6px;
          white-space: nowrap;
          color: #ffffff;
        }
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        @media (max-width: 768px) {
          .navbar-container {
            padding: 6px 8px;
          }
          .brand-title {
            font-size: 14px !important;
          }
          .brand-logo-box {
            width: 30px !important;
            height: 30px !important;
          }
          .nav-item {
            font-size: 11px !important;
            padding: 4px 6px !important;
          }
          .cart-badge-btn {
            font-size: 11px !important;
            padding: 5px 8px !important;
          }
        }
      `}</style>

      <nav className="navbar-container">
        {/* اللوجو والعنوان */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', flexShrink: 0 }}>
          <div className="brand-logo-box" style={{
            background: 'white',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <img src={logo} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
          </div>
          <span className="brand-title" style={{ fontSize: '16px', fontWeight: '850', color: '#ffffff', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>
            ثمار <span style={{ color: '#48cae4' }}>البحر</span>
          </span>
        </Link>

        {/* الروابط وأزرار التحكم متناسقة وظاهرة أفقياً */}
        <div className="nav-links-wrapper">
          <Link to="/" className="nav-item">الرئيسية</Link>
          <Link to="/riyadh" className="nav-item">الرياض</Link>
          <Link to="/qatif" className="nav-item">القطيف</Link>
          <Link to="/jeddah" className="nav-item">جدة</Link>
          
          {customerPhone ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '3px 6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', color: '#e0fbfc', fontWeight: '600' }} dir="ltr">
                👤 {customerPhone}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  fontSize: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: '1px 2px'
                }}
              >
                خروج
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-item" style={{ 
              border: '1px solid #48cae4',
              color: '#48cae4',
              backgroundColor: 'rgba(72, 202, 228, 0.1)',
              flexShrink: 0
            }}>
              دخول
            </Link>
          )}

          {/* سلة الشراء */}
          <Link to="/cart" className="cart-badge-btn" style={{ 
            textDecoration: 'none',
            backgroundColor: '#0077b6', 
            color: 'white', 
            padding: '6px 10px',
            borderRadius: '6px',
            position: 'relative',
            boxShadow: '0 3px 10px rgba(0, 119, 182, 0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3px',
            fontSize: '12px',
            fontWeight: '600',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}>
            السلة 🛒
            {totalItems > 0 && (
              <span style={{ 
                position: 'absolute', top: '-5px', right: '-5px', 
                backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', 
                padding: '1px 4px', fontSize: '9px', fontWeight: 'bold' 
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;