import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  const branches = [
    { name: 'فرع الرياض', link: '/riyadh', icon: '🏛️' },
    { name: 'فرع جدة', link: '/jeddah', icon: '⚓' },
    { name: 'فرع القطيف', link: '/qatif', icon: '🌴' }
  ];

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      direction: 'rtl',
      fontFamily: "'Tajawal', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #03045e 0%, #0077b6 50%, #00b4d8 100%)'
    }}>
      
      {/* تأثيرات أسماك متحركة ووقاعات في الخلفية */}
      <div className="ocean-background-effect">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="swimming-fish">🐠</div>
        <div className="swimming-fish-2">🐟</div>
        <div className="swimming-fish-3">🐬</div>
      </div>

      {/* شريط التنقل (Navbar) */}
      <nav style={{
        position: 'absolute',
        top: '20px',
        width: '90%',
        maxWidth: '1200px',
        zIndex: '10',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
          <img src={logo} alt="Logo" style={{ height: '50px', width: 'auto' }} />
          <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}>ثمار البحر</span>
        </Link>

        <div style={{ display: 'flex', gap: '30px' }}>
          {['الرئيسية', 'عن المتجر', 'المدونة'].map((item) => (
            <a key={item} href="#" className="nav-link-item" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="nav-login-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: 'white', padding: '10px 25px', borderRadius: '25px', cursor: 'pointer', fontSize: '1rem' }}>
            دخول
          </button>
          <Link to="/cart" style={{ background: '#48cae4', color: '#03045e', padding: '10px 25px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 15px rgba(72, 202, 228, 0.4)' }}>
            السلة (0)
          </Link>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <div style={{
        position: 'relative',
        zIndex: '5',
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        marginTop: '10vh'
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '900',
          marginBottom: '20px',
          textShadow: '0 4px 15px rgba(0,0,0,0.3)',
          animation: 'fadeInDown 1s ease'
        }}>
          أهلاً بكم في <span style={{ color: '#90e0ef' }}>ثمار البحر</span>
        </h1>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          marginBottom: '60px',
          opacity: '0.9',
          maxWidth: '600px',
          margin: '0 auto 60px',
          animation: 'fadeInUp 1s ease'
        }}>
          اكتشفوا تشكيلتنا الواسعة من أجود الأسماك والمأكولات البحرية الطازجة، تصلكم من بحارنا إلى مائدتكم بكل فخر.
        </p>

        {/* أزرار الفروع */}
        <div style={{ animation: 'fadeInUp 1.5s ease' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', fontWeight: '700', color: '#caf0f8' }}>اختر الفرع الأقرب إليك للبدء</h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            {branches.map((branch) => (
              <Link
                key={branch.name}
                to={branch.link}
                className="branch-pearl-btn"
                style={{
                  padding: '20px 50px',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#03045e',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <span style={{ fontSize: '1.6rem' }}>{branch.icon}</span>
                {branch.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* حركات الأسماك، الفقاعات والتصميم الجبار */}
      <style>{`
        .ocean-background-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes swimRight {
          0% { transform: translateX(-100px) translateY(0); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateX(110vw) translateY(-50px); opacity: 0; }
        }

        @keyframes swimLeft {
          0% { transform: translateX(110vw) translateY(0); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateX(-100px) translateY(50px); opacity: 0; }
        }

        @keyframes riseBubble {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }

        .swimming-fish {
          position: absolute;
          font-size: 3rem;
          top: 20%;
          animation: swimRight 12s linear infinite;
        }

        .swimming-fish-2 {
          position: absolute;
          font-size: 2.5rem;
          top: 60%;
          animation: swimLeft 15s linear infinite;
          animation-delay: 3s;
        }

        .swimming-fish-3 {
          position: absolute;
          font-size: 3.5rem;
          top: 40%;
          animation: swimRight 18s linear infinite;
          animation-delay: 6s;
        }

        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          left: 15%;
          animation: riseBubble 7s ease-in infinite;
        }
        .bubble:nth-child(2) { left: 45%; width: 15px; height: 15px; animation-duration: 9s; animation-delay: 2s; }
        .bubble:nth-child(3) { left: 75%; width: 25px; height: 25px; animation-duration: 6s; animation-delay: 1s; }
        .bubble:nth-child(4) { left: 90%; width: 10px; height: 10px; animation-duration: 11s; animation-delay: 4s; }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-link-item {
          transition: color 0.3s ease;
        }
        .nav-link-item:hover {
          color: #90e0ef !important;
        }
        .nav-login-btn {
          transition: all 0.3s ease;
        }
        .nav-login-btn:hover {
          background: white !important;
          color: #03045e !important;
        }
        .branch-pearl-btn {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .branch-pearl-btn:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          background: #ffffff !important;
        }
      `}</style>

    </div>
  );
};

export default Home;