import { useContext } from 'react'; // استيراد useContext
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CartContext } from '../context/CartContext'; // استيراد الـ Context

const Navbar = () => {
  // استدعاء totalItems من الـ Context
  const { totalItems } = useContext(CartContext);

  const linkStyle = {
    textDecoration: 'none',
    color: '#0f172a',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    padding: '8px 12px',
    borderRadius: '8px'
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 60px', 
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src={logo} alt="Logo" style={{ height: '55px', transition: 'transform 0.3s' }} />
        <span style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '1px' }}>
          ثمار <span style={{ color: '#0ea5e9' }}>البحر</span>
        </span>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9' } onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>الرئيسية</Link>
        <Link to="/riyadh" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9' } onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>فرع الرياض</Link>
        <Link to="/qatif" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9' } onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>فرع القطيف</Link>
        
        {/* السلة مع العداد */}
        <Link to="/cart" style={{ 
          ...linkStyle, 
          backgroundColor: '#0ea5e9', 
          color: 'white', 
          padding: '8px 20px',
          position: 'relative' // ضروري عشان الدائرة الحمراء
        }}>
          السلة 🛒
          {totalItems > 0 && (
            <span style={{ 
              position: 'absolute', top: '-8px', right: '-8px', 
              backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', 
              padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' 
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