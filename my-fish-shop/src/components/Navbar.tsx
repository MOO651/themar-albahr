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
          flex-direction: column;
          padding: 8px 10px;
          background-color: rgba(3, 4, 94, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          width: 100%;
          box-sizing: border-box;
          font-family: 'Tajawal', 'Segoe UI', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .navbar-main-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 6px;
        }
        .navbar-links-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          padding-top: 6px;
        }
        .nav-link-item {
          text-decoration: none;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          text-align: center;
          flex: 1;
          white-space: nowrap;
        }
        .nav-link-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        @media (min-width: 768px) {
          .navbar-container {
            flex-direction: row;
            justify-content: space-between;
            padding: 10px 20px;
          }
          .navbar-main-row {
            margin-bottom: 0;
            width: auto;
          }
          .navbar-links-row {
            border-top: none;
            padding-top: 0;
            width: auto;
            gap: 12px;
          }
          .nav-link-item {
            flex: unset;
            font-size: 14px;
          }
        }
      `}</style>

      <nav className="navbar-container">
        {/* السطر الأول: اللوجو واسم المتجر + أزرار الدخول والسلة */}
        <div className="navbar-main-row">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <img src={logo} alt="Logo" style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: '850', color: '#ffffff', whiteSpace: 'nowrap' }}>
              ثمار <span style={{ color: '#48cae4' }}>البحر</span>
            </span>
          </Link>

          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {customerPhone ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '3px 6px', borderRadius: '6px' }}>
                <span style={{ fontSize: '10px', color: '#e0fbfc', fontWeight: '600' }} dir="ltr">
                  👤 {customerPhone}
                </span>
                <button
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  خروج
                </button>
              </div>
            ) : (
              <Link to="/login" style={{ 
                textDecoration: 'none', border: '1px solid #48cae4', color: '#48cae4',
                backgroundColor: 'rgba(72, 202, 228, 0.1)', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', fontWeight: '600'
              }}>
                دخول
              </Link>
            )}

            <Link to="/cart" style={{ 
              textDecoration: 'none', backgroundColor: '#0077b6', color: 'white', 
              padding: '4px 9px', borderRadius: '6px', position: 'relative', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px'
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
        </div>

        {/* السطر الثاني: الفروع والصفحة الرئيسية متساوية وموزعة بعرض الشاشة تماماً */}
        <div className="navbar-links-row">
          <Link to="/" className="nav-link-item">الرئيسية</Link>
          <Link to="/riyadh" className="nav-link-item">الرياض</Link>
          <Link to="/qatif" className="nav-link-item">القطيف</Link>
          <Link to="/jeddah" className="nav-link-item">جدة</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;