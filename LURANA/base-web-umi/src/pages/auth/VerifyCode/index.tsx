import React, { useState, useRef } from 'react';
import { history, useLocation } from 'umi';
import { message } from 'antd';
import { verifyCode, resendCode } from '@/services/TaiKhoan/auth.api';
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons';

export default function VerifyCode() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const location = useLocation();
  const emailFromUrl = new URLSearchParams(location.search).get('email');
  const [email, setEmail] = useState(emailFromUrl || '');
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<any[]>([]);

  const handleChange = (value: string, index: number) => {
    const val = value.slice(-1);

    if (!/^[0-9]?$/.test(val)) return;
    
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    console.log("CODE FINAL:", code);

    if (code.length < 4 || !email) {
      return message.error('Nhập đầy đủ thông tin');
    }

    setLoading(true);

    try {
      const res = await verifyCode({ email, code });
      console.log("VERIFY RESPONSE:", res);

      if (res && res.success === false) {
        setLoading(false);
        message.error(res?.message || 'Xác thực thất bại');
        return;
      }

      message.success('Xác thực thành công');

      // chuyển sang reset password
      history.push(
        `/auth/reset-password?email=${encodeURIComponent(email)}&code=${code}`
      );

      return; 
    } catch (err) {
      message.error('Lỗi hệ thống');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      return message.error('Nhập email trước');
    }

    await resendCode({ email });
    message.success('Đã gửi lại mã');
  };

  return (
    <div className="auth-page verify-code">
      <div className="auth-container">
        {/* LEFT PANEL */}
        <div className="auth-left">
          <div className="auth-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="auth-overlay">
            <h1 className="logo-animated-text">LUNARIA</h1>
            <p>
              Chúng tôi đã gửi mã xác nhận đến hòm thư Email của bạn để đảm bảo an toàn tài khoản.
            </p>
            <div className="auth-features">
              <div className="feature-item">
                <StarFilled className="feature-icon" />
                <span>100% Nguyên liệu hữu cơ lành tính</span>
              </div>
              <div className="feature-item">
                <StarFilled className="feature-icon" />
                <span>Công thức sinh học tiên tiến độc quyền</span>
              </div>
              <div className="feature-item">
                <StarFilled className="feature-icon" />
                <span>Nuôi dưỡng làn da căng mọng tự nhiên</span>
              </div>
            </div>
            <button className="auth-explore-btn" onClick={() => history.push('/products')}>Mua ngay</button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
          <div className="auth-form">
            <div className="auth-top">
              <button
                className="auth-back"
                onClick={() => history.push('/auth/forgot-password')}
              >
                <ArrowLeftOutlined /> Quay lại
              </button>
            </div>

            <h2>Xác thực tài khoản</h2>
            <p className="auth-desc">
              Nhập mã OTP gồm 4 chữ số được gửi tới Email của bạn
            </p>

            {/* OTP INPUT */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  maxLength={1}
                  style={{
                    width: 56,
                    height: 56,
                    textAlign: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    borderRadius: 12,
                    border: '1.5px solid #e2e8f0',
                    background: '#f8fafc',
                    color: '#1e293b',
                    margin: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className="otp-input-box"
                />
              ))}
            </div>

            <div className="input-group">
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                style={{ cursor: 'not-allowed', opacity: 0.7 }}
              />
            </div>

            <button
              className="auth-loginBtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Đang xác thực...' : 'Xác thực mã OTP'}
            </button>

            <button
              style={{
                width: '100%',
                height: 48,
                marginTop: 12,
                borderRadius: 12,
                border: '1.5px solid #e2e8f0',
                background: '#fff',
                color: '#64748b',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFA78A';
                e.currentTarget.style.color = '#FFA78A';
                e.currentTarget.style.background = '#fff5f2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.background = '#fff';
              }}
              onClick={handleResend}
            >
              Gửi lại mã xác nhận
            </button>

            <p className="auth-register">
              Nhầm lẫn?{' '}
              <span onClick={() => history.push('/auth/login')}>
                Đăng nhập
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}