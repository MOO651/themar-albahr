import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد أدوات التوجيه
import logo from '../assets/logo.png';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); // تهيئة أداة التوجيه

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setOtpSent(true);
      setSuccessMessage('');
    } else {
      alert('الرجاء إدخال رقم جوال صحيح');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') {
      // 1. حفظ رقم العميل في التخزين المحلي للمتجر
      localStorage.setItem('customer_phone', '05' + phone.slice(-9));
      
      // 2. إظهار رسالة النجاح
      setSuccessMessage('تم تسجيل الدخول بنجاح! جاري تحويلك للرئيسية...');

      // 3. التحويل التلقائي للصفحة الرئيسية بعد ثانية ونصف
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } else {
      alert('رمز التحقق غير صحيح (استخدم 1234 للتجربة)');
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
        
        {/* اللوجو والعنوان */}
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

        {/* إشعار النجاح العصري */}
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
              إرسال رمز التحقق
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #dcfce7', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0 }}>
                تم إرسال الرمز إلى: <strong dir="ltr">05{phone.slice(-9)}</strong>
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
                placeholder="1234"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                maxLength={4}
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
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', textAlign: 'center' }}>
                استخدم الرمز <strong style={{ color: '#16a34a' }}>1234</strong> للتجربة
              </p>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              تأكيد وتسجيل الدخول
            </button>
          </form>
        )}
      </div>
    </div>
  );
}