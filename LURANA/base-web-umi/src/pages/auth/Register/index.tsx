import React, { useState } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { register as registerApi } from '@/services/TaiKhoan/auth.api';

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

        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-overlay">
            <h1>LUNARIA</h1>
            <p>
              Mỗi buổi sáng là một khởi đầu mới, khi làn da cần được đánh thức
              bằng sự dịu dàng.
            </p>
<<<<<<< HEAD
<<<<<<< HEAD
            <button>Mua ngay</button>
=======
            <button onClick={() => history.push('/products')}>Mua ngay</button>
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
=======
            <button onClick={() => history.push('/products')}>Mua ngay</button>
>>>>>>> origin/main
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-form">

            <button
              className="auth-back"
<<<<<<< HEAD
<<<<<<< HEAD
              onClick={() => history.push('/auth/login')}
=======
              onClick={() => history.push('/home')}
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
=======
              onClick={() => history.push('/home')}
>>>>>>> origin/main
            >
              ← Trở lại
            </button>

            <h2>TẠO TÀI KHOẢN CỦA BẠN</h2>
            <p className="auth-desc">
              Tạo tài khoản mua sắm của bạn
            </p>

<<<<<<< HEAD
<<<<<<< HEAD
            <button className="auth-google">
=======
            <button className="auth-google" onClick={() => message.info('Tính năng đăng ký bằng Google đang được bảo trì...')}>
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
=======
            <button className="auth-google" onClick={() => message.info('Tính năng đăng ký bằng Google đang được bảo trì...')}>
>>>>>>> origin/main
              🔵 Sign up with Google
            </button>

            <div className="auth-divider">Or use email</div>

            <input
              name="name"
              placeholder="Họ và tên"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
<<<<<<< HEAD
<<<<<<< HEAD
=======
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
=======
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
>>>>>>> origin/main
            />

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
                Đăng nhập
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
