const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#f1f5f9', 
      padding: '30px 20px', 
      marginTop: '40px', 
      fontSize: '0.9rem', 
      color: '#64748b',
      borderTop: '1px solid #e2e8f0',
      textAlign: 'center',
      direction: 'rtl'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* زر موقعنا على الخريطة المضاف حديثاً */}
        <div style={{ marginBottom: '15px' }}>
          <a 
            href="https://maps.app.goo.gl/bdbDFUZYofukC1Zf8" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '8px 16px', 
              backgroundColor: '#0ea5e9', 
              color: 'white', 
              borderRadius: '6px', 
              textDecoration: 'none', 
              fontSize: '13px', 
              fontWeight: 'bold' 
            }}
          >
            📍 موقعنا على الخريطة (فرع القطيف)
          </a>
        </div>

        <div style={{ fontSize: '0.8rem' }}>
          <p style={{ margin: '5px 0' }}>جميع الحقوق محفوظة © 2026 - شركة ثمار البحر</p>
          <p style={{ margin: '5px 0' }}>السجل التجاري: 123456789 | الرقم الضريبي: 300xxxxxxx</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;