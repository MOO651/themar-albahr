import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useContext(CartContext);

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
        
        {/* زر تسجيل الدخول */}
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