import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const [customerPhone, setCustomerPhone] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
    navigate('/');
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    padding: '8px 14px',
    borderRadius: '8px'
  };

  return (
    <>
      <style>{`
        .nav-menu {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 26px;
          cursor: pointer;
          outline: none;
        }
        @media (max-width: 900px) {
          .hamburger-btn {
            display: block;
          }
          .nav-menu {
            display: ${menuOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            width: 100%;
            position: absolute;
            top: 100%;
            right: 0;
            background-color: rgba(3, 4, 94, 0.98);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            padding: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            align-items: stretch !important;
            text-align: center;
            gap: 12px;
          }
          .nav-menu a, .nav-menu div {
            width: 100%;
            justify-content: center;
            box-sizing: border-box;
          }
        }
      `}</style>

      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 25px',
        backgroundColor: 'rgba(3, 4, 94, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontFamily: "'Tajawal', 'Segoe UI', sans-serif"
      }}>
        
        {/* اللوجو والعنوان */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            background: 'white',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            <img src={logo} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '850', color: '#ffffff', letterSpacing: '1px' }}>
            ثمار <span style={{ color: '#48cae4' }}>البحر</span>
          </span>
        </Link>

        {/* زر القائمة للموبايل (Hamburger) */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* الروابط وأزرار التحكم */}
        <div className="nav-menu">
          <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>الرئيسية</Link>
          <Link to="/riyadh" style={linkStyle} onClick={() => setMenuOpen(false)}>الرياض</Link>
          <Link to="/qatif" style={linkStyle} onClick={() => setMenuOpen(false)}>القطيف</Link>
          <Link to="/jeddah" style={linkStyle} onClick={() => setMenuOpen(false)}>جدة</Link>
          
          {customerPhone ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: '13px', color: '#e0fbfc', fontWeight: '600' }}>
                👤 <span dir="ltr">{customerPhone}</span>
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: '2px 6px'
                }}
              >
                خروج
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{ 
              ...linkStyle, 
              border: '1px solid #48cae4',
              color: '#48cae4',
              backgroundColor: 'rgba(72, 202, 228, 0.1)',
              textAlign: 'center'
            }}>
              تسجيل الدخول
            </Link>
          )}

          {/* سلة الشراء */}
          <Link to="/cart" onClick={() => setMenuOpen(false)} style={{ 
            ...linkStyle, 
            backgroundColor: '#0077b6', 
            color: 'white', 
            padding: '9px 16px',
            position: 'relative',
            boxShadow: '0 4px 15px rgba(0, 119, 182, 0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px'
          }}>
            السلة 🛒
            {totalItems > 0 && (
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-8px', 
                backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', 
                padding: '2px 6px', fontSize: '11px', fontWeight: 'bold' 
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