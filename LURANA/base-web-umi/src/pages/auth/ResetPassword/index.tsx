import React, { useState } from 'react';
import { history, useLocation } from 'umi';
import { message } from 'antd';
import { resetPassword } from '@/services/TaiKhoan/auth.api';
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons';

export default function ResetPassword() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const email = params.get('email') || '';
  const code = (params.get('code') || '').trim();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const pwd = password.trim();
    const confirmPwd = confirmPassword.trim();

    if (!pwd || !confirmPwd) {
      return message.error('Vui lòng nhập đầy đủ thông tin');
    }

    if (pwd !== confirmPwd) {
      return message.error('Mật khẩu không khớp');
    }

    setLoading(true);

    try {
        const res = await resetPassword({
        email,
        password: pwd,
      });

      console.log('RES:', res);

      if (!res?.success) {
        message.error(res?.message || 'Đổi mật khẩu thất bại');
        return;
      }

      message.success('Đổi mật khẩu thành công');

      // chuyển sang trang thành công (hoặc login)
      history.push('/auth/reset-success');
    } catch (err) {
      message.error('Lỗi hệ thống');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page reset-password">
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
            <p>Thiết lập mật khẩu mới cho tài khoản của bạn để tiếp tục mua sắm các sản phẩm cao cấp.</p>
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

            <h2>Đặt lại mật khẩu</h2>
            <p className="auth-desc">
              Nhập mật khẩu mới cho tài khoản của bạn bên dưới
            </p>

            <div className="input-group">
              <input
                type="email"
                value={email}
                disabled
                style={{ cursor: 'not-allowed', opacity: 0.7 }}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="auth-loginBtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
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