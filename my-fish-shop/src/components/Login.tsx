import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [needsPhone, setNeedsPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedPhone = localStorage.getItem('customer_phone');
    if (savedPhone) {
      navigate('/');
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCurrentUser(user);

      // فحص هل المستخدم مسجل رقمه من قبل في الـ localStorage
      const savedUserPhones = JSON.parse(localStorage.getItem('users_phones') || '{}');
      
      if (savedUserPhones[user.email!]) {
        // لو عنده رقم قديم، نسجله وندخله على طول
        localStorage.setItem('customer_phone', savedUserPhones[user.email!]);
        window.dispatchEvent(new Event('authChange'));
        setSuccessMessage('تم تسجيل الدخول بنجاح! جاري تحويلك...');
        setTimeout(() => navigate('/'), 1200);
      } else {
        // لو أول مرة، نظهر له شاشة إدخال رقم الجوال إجبارياً
        setLoading(false);
        setNeedsPhone(true);
      }

    } catch (error) {
      console.error('خطأ في تسجيل الدخول بجوجل:', error);
      alert('فشل تسجيل الدخول، حاول مرة أخرى.');
      setLoading(false);
    }
  };

  const handleSavePhoneAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 9) {
      alert('الرجاء إدخال رقم جوال صحيح');
      return;
    }

    const formattedPhone = '+966' + phoneNumber.replace(/^0+/, '');
    
    // حفظ الرقم الحالي ورطبه بالإيميل
    localStorage.setItem('customer_phone', formattedPhone);
    
    if (currentUser && currentUser.email) {
      const savedUserPhones = JSON.parse(localStorage.getItem('users_phones') || '{}');
      savedUserPhones[currentUser.email] = formattedPhone;
      localStorage.setItem('users_phones', JSON.stringify(savedUserPhones));
    }

    window.dispatchEvent(new Event('authChange'));
    setSuccessMessage('تم حفظ رقم الجوال وتسجيل الدخول بنجاح!');

    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '20px',
      direction: 'rtl'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        padding: '30px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        
        <div style={{ marginBottom: '25px' }}>
          <img 
            src={logo} 
            alt="ثمار البحر" 
            style={{ height: '70px', margin: '0 auto 15px auto', objectFit: 'contain' }} 
          />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>
            {needsPhone ? 'إدخال رقم الجوال إجباري' : 'تسجيل الدخول'}
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            {needsPhone ? 'يرجى إدخال رقم جوالك لنتمكن من إتمام طلباتك والتواصل معك' : 'أهلاً بك في ثمار البحر'}
          </p>
        </div>

        {successMessage && (
          <div style={{
            backgroundColor: '#f0fdf4',
            color: '#166534',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #dcfce7',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            {successMessage}
          </div>
        )}

        {!needsPhone ? (
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              opacity: loading ? 0.7 : 1
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.18 21.38 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.19C.43 8.15 0 9.89 0 11.7s.43 3.55 1.19 5.09l4.08-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.18 2.62 1.19 6.61l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            {loading ? 'جاري تسجيل الدخول...' : 'التسجيل باستخدام جوجل'}
          </button>
        ) : (
          <form onSubmit={handleSavePhoneAndProceed} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'right' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                رقم الجوال الشخصي (إجباري)
              </label>
              <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff' }}>
                <span style={{ padding: '10px 12px', backgroundColor: '#f1f5f9', color: '#475569', fontSize: '14px', borderLeft: '1px solid #cbd5e1' }}>
                  +966 🇸🇦
                </span>
                <input
                  type="tel"
                  placeholder="5xxxxxxxx"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={10}
                  style={{ width: '100%', padding: '10px 14px', border: 'none', outline: 'none', fontSize: '14px', direction: 'ltr', textAlign: 'right' }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#0ea5e9',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              حفظ والمتابعة إلى المتجر
            </button>
          </form>
        )}

      </div>
    </div>
  );
}