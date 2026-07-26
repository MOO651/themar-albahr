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
      alignItems: 'center'
    }}>
      
      {/* 1. خلفية الفيديو السينمائية */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-1',
          filter: 'brightness(0.4)'
        }}
      >
        <source src="https://cdn.coverr.co/videos/coverr-underwater-coral-reef-and-fish-4086/1080p.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* طبقة تدرج لوني عميق */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(195deg, rgba(2, 62, 138, 0.4) 0%, rgba(0, 180, 216, 0.3) 100%)',
        zIndex: '-1'
      }}></div>

      {/* 2. شريط التنقل (Navbar) */}
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

      {/* 3. المحتوى الرئيسي */}
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
          أهلاً بكم في <span style={{ color: '#48cae4' }}>ثمار البحر</span>
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

        {/* 4. أزرار الفروع */}
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

      {/* التنسيقات والحركات الاحترافية (CSS) */}
      <style>{`
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
          color: #48cae4 !important;
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