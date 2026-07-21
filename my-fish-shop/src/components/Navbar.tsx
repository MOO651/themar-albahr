import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const [customerPhone, setCustomerPhone] = useState<string | null>(null);
  const navigate = useNavigate();

  // متابعة حالة تسجيل الدخول للعميل
  useEffect(() => {
    const phone = localStorage.getItem('customer_phone');
    setCustomerPhone(phone);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customer_phone');
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
      
      {/* اللوجو واسم الموقع */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Logo" style={{ height: '45px', transition: 'transform 0.3s' }} />
        <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '1px' }}>
          ثمار <span style={{ color: '#0ea5e9' }}>البحر</span>
        </span>
      </div>

      {/* الروابط والسلة وتسجيل الدخول */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9' } onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>الرئيسية</Link>
        <Link to="/riyadh" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9' } onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>الرياض</Link>
        <Link to="/qatif" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9' } onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>القطيف</Link>
        
        {/* لو مسجل دخول يظهر رقمه وزر خروج، لو مش مسجل يظهر زر تسجيل الدخول */}
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
              title="تسجيل الخروج"
            >
              خروج
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ 
            ...linkStyle, 
            border: '1px solid #0ea5e9',
            color: '#0ea5e9'
          }} 
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0ea5e9';
            e.currentTarget.style.color = 'white';
          }} 
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#0ea5e9';
          }}>
            تسجيل الدخول
          </Link>
        )}

        {/* السلة مع العداد */}
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