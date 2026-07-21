const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#f1f5f9', 
      padding: '30px 20px', 
      marginTop: '40px', 
      fontSize: '0.9rem', 
      color: '#64748b',
      borderTop: '1px solid #e2e8f0'
    }}>
      {/* الأقسام المؤقتة */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '40px', 
        marginBottom: '20px', 
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: '#1e293b'
      }}>
        <span style={{ cursor: 'pointer' }}>من نحن</span>
        <span style={{ cursor: 'pointer' }}>اتصل بنا</span>
        <span style={{ cursor: 'pointer' }}>لماذا نحن</span>
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
        <p style={{ margin: '5px 0' }}>جميع الحقوق محفوظة © 2026 - شركة ثمار البحر</p>
        <p style={{ margin: '5px 0' }}>السجل التجاري: 123456789 | الرقم الضريبي: 300xxxxxxx</p>
      </div>
    </footer>
  );
};

export default Footer;