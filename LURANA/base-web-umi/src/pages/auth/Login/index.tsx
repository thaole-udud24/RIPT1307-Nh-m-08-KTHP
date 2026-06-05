// import styles from './index.less';
import React, { useState } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { login as loginApi } from '@/services/TaiKhoan/auth.api';
import useAuth from '@/hooks/useAuth';
import { GoogleOutlined, ArrowLeftOutlined, StarFilled } from '@ant-design/icons';

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    return message.error('Nhập đầy đủ thông tin');
  }

  setLoading(true);

  try {
    const res = await loginApi({ email, password });

    if (!res || res.success !== true) {
      setLoading(false);
      return message.error(res?.message || 'Đăng nhập thất bại');
    }

    //  lưu token (sau này dùng thật)
    const token = res?.data?.access_token || 'fake_token';
    // fake role
    let role = 'user'; 

    if (
      email === 'admin@gmail.com' &&
      password === '123456'
    ) {
      role = 'admin';
    }


    // lưu localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    // lưu user
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
        role,
      }),
    );

    message.success(res.message || 'Đăng nhập thành công');

    // chuyển trang theo role
    if (role === 'admin') {
      history.push('/admin');
    } else {
      history.push('/');
    }

    return; 
  } catch (error) {
    message.error('Lỗi hệ thống');
  }

  setLoading(false);
  };
  return (
    <div className="auth-page login"> 
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

              <h2>Chào mừng trở lại</h2>
              <p className="auth-desc">
                Nhập thông tin để truy cập tài khoản của bạn
              </p>

              <button className="auth-google" onClick={() => message.info('Tính năng đăng nhập bằng Google đang được bảo trì...')}>
                <GoogleOutlined className="google-icon" /> Đăng nhập với Google
              </button>

              <div className="auth-divider">hoặc sử dụng Email</div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Địa chỉ Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <div className="auth-forgot" onClick={() => history.push('/auth/forgot-password')}>Quên mật khẩu?</div>

              <button className="auth-loginBtn" onClick={handleLogin}>
                Đăng nhập
              </button>

              <p className="auth-register">
                Bạn chưa có tài khoản? <span onClick={() => history.push('/auth/register')}>Tạo tài khoản mới</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}