// import styles from './index.less';
import React, { useState } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { login as loginApi } from '@/services/TaiKhoan/auth.api';
import useAuth from '@/hooks/useAuth';

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
<<<<<<< HEAD
    const token = res?.data?.access_token;

    if (!token) {
      setLoading(false);
      return message.error('Không nhận được token');
    }

    localStorage.setItem('token', token);

    message.success(res.message);

    //  chuyển trang
    history.push('/');
=======
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
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

    return; 
  } catch (error) {
    message.error('Lỗi hệ thống');
  }

  setLoading(false);
  };
  return (
    <div className="auth-page login"> 
    <div className="auth-container">
      {/* LEFT */}
      <div className="auth-left" >
        <div className="auth-overlay">
          <h1>LUNARIA</h1>
          <p>
            Mỗi buổi sáng là một khởi đầu mới, khi làn da cần được đánh thức
            bằng sự dịu dàng.
          </p>
<<<<<<< HEAD
          <button>Mua ngay</button>
=======
          <button onClick={() => history.push('/products')}>Mua ngay</button>
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-form">
          <div className="auth-top">
<<<<<<< HEAD
            <button className="auth-back">← Trở lại</button>
=======
            <button className="auth-back" onClick={() => history.push('/home')}>← Trở lại</button>
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
          </div>

          <h2>Chào mừng trở lại</h2>
          <p className="auth-desc">
            Nhập thông tin để truy cập tài khoản của bạn
          </p>

<<<<<<< HEAD
          <button className="auth-google">
=======
          <button className="auth-google" onClick={() => message.info('Tính năng đăng nhập bằng Google đang được bảo trì...')}>
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
            🔵 Sign up with Google
          </button>

          <div className="auth-divider">Or use email</div>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
=======
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
          />

          <div className="auth-forgot" onClick={() => history.push('/auth/forgot-password')}>Quên mật khẩu?</div>

          <button className="auth-loginBtn" onClick={handleLogin}>Đăng nhập</button>

          <p className="auth-register">
            Bạn chưa có tài khoản? <span onClick={() => history.push('/auth/register')}>Tạo tài khoản</span>
          </p>
      </div>
    </div>
    </div>
    </div>
  );
}