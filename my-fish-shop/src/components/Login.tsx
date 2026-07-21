import React, { useState } from 'react';
import logo from '../assets/logo.png'; // استيراد اللوجو

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
      //alert('تم إرسال رمز التحقق (محاكاة)'); // هنستبدل التنبيه البسيط ده بتصميم أفضل جوه الصفحة لو تحب
    } else {
      alert('الرجاء إدخال رقم جوال صحيح (10 أرقام)');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') {
      alert('تم تسجيل الدخول بنجاح! أهلاً بك في ثمار البحر');
      // هنا ممكن نضيف توجيه للصفحة الرئيسية بعدين
    } else {
      alert('رمز التحقق غير صحيح (استخدم 1234 للتجربة)');
    }
  };

  return (
    // خلفية رمادية فاتحة هادية
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12" dir="rtl">
      <div className="max-w-md w-full space-y-8">
        
        {/* كارت أبيض بظل خفيف (Card) */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          
          {/* منطقة اللوجو والعنوان */}
          <div className="text-center mb-10">
            <img 
              src={logo} 
              alt="ثمار البحر Logo" 
              className="mx-auto h-24 w-auto mb-6 transition-transform duration-300 hover:scale-105" 
            />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              تسجيل الدخول
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              أهلاً بك في{' '}
              <span className="font-bold text-[#0ea5e9]">ثمار البحر</span>
              ، يرجى إدخال رقم الجوال للمتابعة
            </p>
          </div>

          {!otpSent ? (
            /* فورم إدخال رقم الجوال */
            <form onSubmit={handleSendOtp} className="mt-8 space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  رقم الجوال (السعودية)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                    🇸🇦 +966
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="مثال: 5xxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // بيسمح بأرقام بس
                    maxLength={10}
                    className="appearance-none rounded-xl relative block w-full px-3 py-3 pr-20 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] focus:z-10 sm:text-sm text-right"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#0ea5e9] hover:bg-[#0284c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0ea5e9] transition-colors duration-200 shadow-md"
                >
                  إرسال رمز التحقق (OTP)
                </button>
              </div>
            </form>
          ) : (
            /* فورم إدخال رمز التحقق */
            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6 animate-fadeIn">
              <div className="text-center bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                <p className="text-sm text-[#0369a1]">
                  تم إرسال رمز التحقق إلى الرقم: <strong dir="ltr">05{phone.slice(-9)}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs text-[#0ea5e9] hover:text-[#0284c7] mt-1 underline"
                >
                  تعديل الرقم
                </button>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  أدخل رمز التحقق (OTP)
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  placeholder="xxxx"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                  className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-lg text-center tracking-[1em] shadow-inner"
                  maxLength={4}
                />
                 <p className="text-xs text-gray-500 mt-2 text-center">استخدم الرمز <strong className='text-green-600'>1234</strong> للتجربة</p>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 shadow-md"
                >
                  تأكيد وتسجيل الدخول
                </button>
              </div>
            </form>
          )}
          
          {/* منطقة تذييل الكارت */}
           <div className="mt-10 text-center border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-500">
                    بحاجة للمساعدة؟{' '}
                    <a href="/contact" className="font-medium text-[#0ea5e9] hover:text-[#0284c7]">
                        تواصل معنا
                    </a>
                </p>
            </div>
        </div>
        
        {/* حقوق الموقع في الأسفل */}
         <p className="text-center text-xs text-gray-400 mt-8">
            حقوق الطبع والنشر © 2026. جميع الحقوق محفوظة لشركة ثمار البحر
        </p>
      </div>
      
      {/* تعريف أنيميشن الظهور */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}