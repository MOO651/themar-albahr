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
    color: '#0f172a',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    padding: '6px 10px',
    borderRadius: '8px'
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
      gap: '10px'
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Logo" style={{ height: '45px', transition: 'transform 0.3s' }} />
        <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '1px' }}>
          ثمار <span style={{ color: '#0ea5e9' }}>البحر</span>
        </span>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={linkStyle}>الرئيسية</Link>
        <Link to="/riyadh" style={linkStyle}>الرياض</Link>
        <Link to="/qatif" style={linkStyle}>القطيف</Link>
        <Link to="/jeddah-frozen" style={linkStyle}>جدة - مجمدات</Link>
        <Link to="/jeddah-fresh" style={linkStyle}>جدة - تسوية</Link>
        
        {customerPhone ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '8px' }}>
            <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>
              👤 <span dir="ltr">{customerPhone}</span>
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
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
          <Link to="/login" style={{ 
            ...linkStyle, 
            border: '1px solid #0ea5e9',
            color: '#0ea5e9'
          }}>
            تسجيل الدخول
          </Link>
        )}

        <Link to="/cart" style={{ 
          ...linkStyle, 
          backgroundColor: '#0ea5e9', 
          color: 'white', 
          padding: '6px 14px',
          position: 'relative'
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
  );
};

export default Navbar;