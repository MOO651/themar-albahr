import React, { useState } from 'react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
      alert('تم إرسال رمز التحقق إلى رقم الجوال (محاكاة)');
    } else {
      alert('الرجاء إدخال رقم جوال صحيح');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') {
      alert('تم تسجيل الدخول بنجاح يا بطل! أهلاً بك في ثمار البحر');
    } else {
      alert('رمز التحقق غير صحيح (استخدم 1234 للتجربة)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">تسجيل الدخول - ثمار البحر</h2>
          <p className="text-sm text-gray-500 mt-1">أدخل رقم الجوال للمتابعة</p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال</label>
              <input
                type="tel"
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              إرسال رمز التحقق
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">أدخل رمز التحقق (أدخل 1234)</label>
              <input
                type="text"
                placeholder="xxxx"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-center tracking-widest text-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              تأكيد وتسجيل الدخول
            </button>
          </form>
        )}
      </div>
    </div>
  );
}