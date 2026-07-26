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

  const linkStyle = {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    padding: '6px 10px',
    borderRadius: '8px',
    whiteSpace: 'nowrap' as const
  };

  return (
    <>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 15px',
        backgroundColor: 'rgba(3, 4, 94, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto'
      }}>
        
        {/* اللوجو والعنوان */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            background: 'white',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            <img src={logo} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '17px', fontWeight: '850', color: '#ffffff', letterSpacing: '0.5px' }}>
            ثمار <span style={{ color: '#48cae4' }}>البحر</span>
          </span>
        </Link>

        {/* الروابط وأزرار التحكم ظاهرة دائماً */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'nowrap'
        }}>
          <Link to="/" style={linkStyle}>الرئيسية</Link>
          <Link to="/riyadh" style={linkStyle}>الرياض</Link>
          <Link to="/qatif" style={linkStyle}>القطيف</Link>
          <Link to="/jeddah" style={linkStyle}>جدة</Link>
          
          {customerPhone ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '5px 8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: '11px', color: '#e0fbfc', fontWeight: '600' }} dir="ltr">
                👤 {customerPhone}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: '2px 4px'
                }}
              >
                خروج
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ 
              ...linkStyle, 
              border: '1px solid #48cae4',
              color: '#48cae4',
              backgroundColor: 'rgba(72, 202, 228, 0.1)',
              fontSize: '13px',
              padding: '5px 10px'
            }}>
              دخول
            </Link>
          )}

          {/* سلة الشراء */}
          <Link to="/cart" style={{ 
            ...linkStyle, 
            backgroundColor: '#0077b6', 
            color: 'white', 
            padding: '7px 12px',
            position: 'relative',
            boxShadow: '0 4px 15px rgba(0, 119, 182, 0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            fontSize: '13px'
          }}>
            السلة 🛒
            {totalItems > 0 && (
              <span style={{ 
                position: 'absolute', top: '-6px', right: '-6px', 
                backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', 
                padding: '1px 5px', fontSize: '10px', fontWeight: 'bold' 
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