import { history } from 'umi';
import { ArrowLeftOutlined, StarFilled, CheckOutlined } from '@ant-design/icons';

export default function ResetSuccess() {
  return (
    <div className="auth-page reset-success-page">
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
          <div className="auth-form">
            {/* Back */}
            <div className="auth-top">
              <button
                className="auth-back"
                onClick={() => history.push('/auth/login')}
              >
                <ArrowLeftOutlined /> Quay lại đăng nhập
              </button>
            </div>

            {/* Success content */}
            <div className="success-box">
              <div className="success-icon"><CheckOutlined /></div>

              <h2 className="success-title">Cập nhật thành công!</h2>

              <p className="success-desc">
                Mật khẩu của bạn đã được thay đổi thành công. Hãy đăng nhập lại để tiếp tục trải nghiệm.
              </p>

              <button
                className="auth-loginBtn"
                onClick={() => history.push('/auth/login')}
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}