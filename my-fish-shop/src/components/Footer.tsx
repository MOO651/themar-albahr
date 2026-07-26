const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'rgba(0, 119, 182, 0.85)', 
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '30px 20px', 
      marginTop: 'auto', 
      fontSize: '0.9rem', 
      color: '#e0fbfc',
      borderTop: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
      textAlign: 'center',
      direction: 'rtl',
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif"
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* زر موقعنا على الخريطة */}
        <div style={{ marginBottom: '15px' }}>
          <a 
            href="https://maps.app.goo.gl/bdbDFUZYofukC1Zf8" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '10px 20px', 
              backgroundColor: '#00b4d8', 
              color: 'white', 
              borderRadius: '50px', 
              textDecoration: 'none', 
              fontSize: '14px', 
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0, 180, 216, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            📍 موقعنا على الخريطة (فرع القطيف)
          </a>
        </div>

        {/* بيانات الحقوق والسجل */}
        <div style={{ fontSize: '0.85rem', opacity: '0.95' }}>
          <p style={{ margin: '6px 0' }}>جميع الحقوق محفوظة © 2026 - شركة ثمار البحر</p>
          <p style={{ margin: '6px 0', fontSize: '0.8rem', color: '#caf0f8' }}>
            السجل التجاري: 123456789 | الرقم الضريبي: 300xxxxxxx
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;