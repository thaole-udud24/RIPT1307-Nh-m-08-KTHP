import React, { useState } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { register as registerApi } from '@/services/TaiKhoan/auth.api';
import { GoogleOutlined, ArrowLeftOutlined, StarFilled } from '@ant-design/icons';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password) {
      return message.error('Vui lòng nhập đầy đủ thông tin');
    }

    setLoading(true);

    try {
      const res = await registerApi({ name, email, password });

      if (!res.success) {
        return message.error(res.message);
      }

      message.success(res.message);
      history.push('/auth/login');
    } catch (error) {
      message.error('Lỗi hệ thống');
    }

    setLoading(false);
  };

  return (
    <div className="auth-page register">
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
              Mỗi buổi sáng là một khởi đầu mới, khi làn da cần được đánh thức
              bằng sự dịu dàng và yêu thương.
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
          <div className="auth-form-wrapper">
            <div className="auth-form-card">
              <div className="auth-top">
                <button className="auth-back" onClick={() => history.push('/home')}>
                  <ArrowLeftOutlined /> Trở về trang chủ
                </button>
              </div>

              <h2>Tạo tài khoản mới</h2>
              <p className="auth-desc">
                Điền thông tin bên dưới để đăng ký tài khoản mua sắm
              </p>

              <button className="auth-google" onClick={() => message.info('Tính năng đăng ký bằng Google đang được bảo trì...')}>
                <GoogleOutlined className="google-icon" /> Đăng ký với Google
              </button>

              <div className="auth-divider">hoặc sử dụng Email</div>

              <div className="input-group">
                <input
                  name="name"
                  type="text"
                  placeholder="Họ và tên"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  name="email"
                  type="email"
                  placeholder="Địa chỉ Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                />
              </div>

              <button
                className="auth-loginBtn"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </button>

              <p className="auth-register">
                Bạn đã có tài khoản?{' '}
                <span onClick={() => history.push('/auth/login')}>
                  Đăng nhập ngay
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
