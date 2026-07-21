import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { auth } from '../firebase/config'; // تم تعديل المسار ليتوافق مع config.ts
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedPhone = localStorage.getItem('customer_phone');
    if (savedPhone) {
      navigate('/');
    }
  }, [navigate]);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) {
      alert('الرجاء إدخال رقم جوال صحيح');
      return;
    }

    setLoading(true);
    try {
      setupRecaptcha();
      const recaptchaVerifier = (window as any).recaptchaVerifier;
      const formattedPhone = '+966' + phone.replace(/^0+/, '');

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      (window as any).confirmationResult = confirmationResult;
      
      setLoading(false);
      setOtpSent(true);
      setSuccessMessage('');
    } catch (error) {
      console.error('خطأ في إرسال الرمز:', error);
      alert('فشل إرسال رمز التحقق، تأكد من الرقم أو حاول لاحقاً.');
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const confirmationResult = (window as any).confirmationResult;
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const fullPhone = user.phoneNumber || ('+966' + phone.slice(-9));
      localStorage.setItem('customer_phone', fullPhone);
      
      window.dispatchEvent(new Event('authChange'));
      setSuccessMessage('تم تسجيل الدخول بنجاح! جاري تحويلك للرئيسية...');

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      console.error('رمز التحقق خطأ:', error);
      alert('رمز التحقق غير صحيح، تأكد من الكود المرسل.');
      setLoading(false);
    }
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
        
        <div style={{ marginBottom: '20px' }}>
          <img 
            src={logo} 
            alt="ثمار البحر" 
            style={{ height: '70px', margin: '0 auto 15px auto', objectFit: 'contain' }} 
          />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>
            تسجيل الدخول
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            أهلاً بك في <span style={{ color: '#0ea5e9', fontWeight: '600' }}>ثمار البحر</span>
          </p>
        </div>

        <div id="recaptcha-container"></div>

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

        {!otpSent ? (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'right' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                رقم الجوال
              </label>
              <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff' }}>
                <span style={{ padding: '10px 12px', backgroundColor: '#f1f5f9', color: '#475569', fontSize: '14px', borderLeft: '1px solid #cbd5e1' }}>
                  +966 🇸🇦
                </span>
                <input
                  type="tel"
                  placeholder="5xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={10}
                  style={{ width: '100%', padding: '10px 14px', border: 'none', outline: 'none', fontSize: '14px', direction: 'ltr', textAlign: 'right' }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
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
                marginTop: '10px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #dcfce7', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0 }}>
                تم إرسال الرمز الحقيقي إلى الرقم: <strong dir="ltr">05{phone.slice(-9)}</strong>
              </p>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                style={{ background: 'none', border: 'none', color: '#0ea5e9', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', marginTop: '4px' }}
              >
                تعديل الرقم
              </button>
            </div>

            <div style={{ textAlign: 'right' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                أدخل رمز التحقق (OTP)
              </label>
              <input
                type="text"
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                maxLength={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '18px',
                  textAlign: 'center',
                  letterSpacing: '8px',
                  outline: 'none'
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'جاري التحقق...' : 'تأكيد وتسجيل الدخول'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}