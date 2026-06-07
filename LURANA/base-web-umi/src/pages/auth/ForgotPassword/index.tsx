import React, { useState } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { forgotPassword } from '@/services/TaiKhoan/auth.api';
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      return message.error('Vui lòng nhập email');
    }

    setLoading(true);

    try {
      const res = await forgotPassword({ email });
      console.log("API RESPONSE:", res);

      if (!res || res.success === false) {
      message.error(res?.message || 'Có lỗi xảy ra');
      return;
      }

      message.success('Đã gửi email xác nhận');

      localStorage.setItem('resetEmail', email);

      //  CHUYỂN SANG ENTER CODE + truyền email
      history.push(`/auth/verify-code?email=${encodeURIComponent(email)}`);

    } catch (err) {
      console.log("ERROR FULL:", err); 
      message.error('Lỗi hệ thống');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth-page forgot-password">
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
              Chúng tôi sẽ giúp bạn lấy lại quyền truy cập nhanh chóng và an toàn nhất.
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
                onClick={() => history.push('/auth/login')}
              >
                <ArrowLeftOutlined /> Quay lại đăng nhập
              </button>
            </div>

            <h2>Quên mật khẩu</h2>
            <p className="auth-desc">
              Nhập địa chỉ Email của bạn để nhận mã xác minh đặt lại mật khẩu
            </p>

            <div className="input-group">
              <input
                type="email"
                placeholder="Địa chỉ Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="auth-loginBtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Đang gửi...' : 'Gửi mã xác minh'}
            </button>

            <p className="auth-register">
              Nhớ mật khẩu?{' '}
              <span onClick={() => history.push('/auth/login')}>
                Đăng nhập ngay
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}