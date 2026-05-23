import React, { useState } from 'react';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  BellOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  SearchOutlined
} from '@ant-design/icons';
import { Link, useLocation, history } from 'umi';
import { message } from 'antd';
import './ShopLayout.less';

const getImg = (name: string) => {
  try {
    return require(`@/assets/images/${name}`);
  } catch (err) {
    return '';
  }
};

const HeaderSearch: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [val, setVal] = useState(params.get('q') || '');

  React.useEffect(() => {
    const p = new URLSearchParams(location.search);
    setVal(p.get('q') || '');
  }, [location.search]);

  const handleSearch = () => {
    if (val.trim()) {
      history.push(`/products?q=${encodeURIComponent(val.trim())}`);
    } else {
      history.push('/products');
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}><SearchOutlined /></button>
    </div>
  );
};

const ShopLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const [forceHide, setForceHide] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(2);

  React.useEffect(() => {
    try {
      const u = localStorage.getItem('user');
      if (u) {
        setCurrentUser(JSON.parse(u));
      } else {
        setCurrentUser(null);
      }
      const notifs = localStorage.getItem('lunaria_notifications');
      if (notifs) {
        const parsed = JSON.parse(notifs);
        const count = parsed.filter((n: any) => !n.isRead).length;
        setUnreadCount(count);
      }
    } catch (e) {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setCurrentUser(null);
    message.success('Đã đăng xuất thành công');
    history.push('/home');
  };

  const handleQuickSearch = (keyword: string) => {
    setForceHide(true);
    history.push(`/products?q=${encodeURIComponent(keyword)}`);
    setTimeout(() => {
      setForceHide(false);
    }, 500);
  };

  const handleQuickTab = (tab: string) => {
    setForceHide(true);
    history.push(`/products?tab=${encodeURIComponent(tab)}`);
    setTimeout(() => {
      setForceHide(false);
    }, 500);
  };

  return (
    <div className="shop-layout">
      {/* Header */}
      <header className="shop-header-wrapper">
        <div className="top-nav-bar">
          <nav className="nav-links">
            <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
            <Link to="/about">About</Link>
            <div className="nav-item-wrapper mega-menu-wrapper">
              <Link to="/products" className={`nav-shop-link ${location.pathname === '/products' ? 'active' : ''}`}>Shop</Link>
              
              <div className={`mega-menu-dropdown ${forceHide ? 'force-hide' : ''}`}>
                <div className="mega-menu-container">
                  <div className="mega-left-content">
                    
                    {/* Top Row: 4 Columns */}
                    <div className="mega-grid-row">
                      {/* Column 1 */}
                      <div className="mega-col">
                        <a onClick={() => handleQuickTab('Làm sạch da')} className="mega-col-heading" style={{ cursor: 'pointer' }}>
                          LÀM SẠCH DA <span className="heading-arrow">›</span>
                        </a>
                        <div className="mega-sub-list">
                          <a onClick={() => handleQuickSearch('Tẩy trang')}>Tẩy trang</a>
                          <a onClick={() => handleQuickSearch('Sữa rửa mặt')}>Sữa rửa mặt</a>
                          <a onClick={() => handleQuickSearch('Toner làm sạch')}>Toner làm sạch</a>
                          <a onClick={() => handleQuickSearch('Tẩy tế bào chết')}>Tẩy tế bào chết</a>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="mega-col">
                        <a onClick={() => handleQuickTab('Cân bằng da')} className="mega-col-heading" style={{ cursor: 'pointer' }}>
                          CÂN BẰNG DA <span className="heading-arrow">›</span>
                        </a>
                        <div className="mega-sub-list">
                          <a onClick={() => handleQuickSearch('Toner dưỡng ẩm')}>Toner dưỡng ẩm</a>
                          <a onClick={() => handleQuickSearch('Xịt khoáng')}>Xịt khoáng</a>
                          <a onClick={() => handleQuickSearch('Serum cân bằng')}>Serum cân bằng</a>
                          <a onClick={() => handleQuickSearch('Nước thần')}>Nước thần</a>
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className="mega-col">
                        <a onClick={() => handleQuickTab('Dưỡng ẩm')} className="mega-col-heading" style={{ cursor: 'pointer' }}>
                          DƯỠNG ẨM <span className="heading-arrow">›</span>
                        </a>
                        <div className="mega-sub-list">
                          <a onClick={() => handleQuickSearch('Serum cấp nước')}>Serum cấp nước</a>
                          <a onClick={() => handleQuickSearch('Kem dưỡng ẩm')}>Kem dưỡng ẩm</a>
                          <a onClick={() => handleQuickSearch('Kem dưỡng mắt')}>Kem dưỡng mắt</a>
                          <a onClick={() => handleQuickSearch('Mặt nạ ngủ')}>Mặt nạ ngủ</a>
                          <a onClick={() => handleQuickSearch('Dưỡng môi')}>Dưỡng môi</a>
                        </div>
                      </div>

                      {/* Column 4 */}
                      <div className="mega-col">
                        <a onClick={() => handleQuickTab('Chống nắng')} className="mega-col-heading" style={{ cursor: 'pointer' }}>
                          CHỐNG NẮNG <span className="heading-arrow">›</span>
                        </a>
                        <div className="mega-sub-list">
                          <a onClick={() => handleQuickSearch('Kem chống nắng SPF 30')}>Kem chống nắng SPF 30</a>
                          <a onClick={() => handleQuickSearch('Kem chống nắng SPF 50')}>Kem chống nắng SPF 50</a>
                          <a onClick={() => handleQuickSearch('Chống nắng dạng xịt')}>Chống nắng dạng xịt</a>
                          <a onClick={() => handleQuickSearch('Chống nắng vật lý')}>Chống nắng vật lý</a>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: 3 Columns */}
                    <div className="mega-grid-row bottom-row">
                      {/* Column 1 */}
                      <div className="mega-col">
                        <a onClick={() => handleQuickTab('Phục hồi')} className="mega-col-heading" style={{ cursor: 'pointer' }}>
                          PHỤC HỒI DA <span className="heading-arrow">›</span>
                        </a>
                        <div className="mega-sub-list">
                          <a onClick={() => handleQuickSearch('Mặt nạ phục hồi')}>Mặt nạ phục hồi</a>
                          <a onClick={() => handleQuickSearch('Serum B5')}>Serum B5</a>
                          <a onClick={() => handleQuickSearch('Kem dưỡng ban đêm')}>Kem dưỡng ban đêm</a>
                          <a onClick={() => handleQuickSearch('Phục hồi chuyên sâu')}>Phục hồi chuyên sâu</a>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="mega-col">
                        <a onClick={() => handleQuickTab('Tất cả')} className="mega-col-heading" style={{ cursor: 'pointer' }}>
                          BỘ SẢN PHẨM <span className="heading-arrow">›</span>
                        </a>
                        <div className="mega-sub-list">
                          <a onClick={() => handleQuickSearch('Bộ làm sạch sâu')}>Bộ làm sạch sâu</a>
                          <a onClick={() => handleQuickSearch('Bộ dưỡng ẩm trắng da')}>Bộ dưỡng ẩm trắng da</a>
                          <a onClick={() => handleQuickSearch('Bộ phục hồi hư tổn')}>Bộ phục hồi hư tổn</a>
                          <a onClick={() => handleQuickSearch('Bộ chống lão hóa')}>Bộ chống lão hóa</a>
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className="mega-col">
                        <a onClick={() => handleQuickTab('Tất cả')} className="mega-col-heading" style={{ cursor: 'pointer' }}>
                          QUÀ TẶNG <span className="heading-arrow">›</span>
                        </a>
                        <div className="mega-sub-list">
                          <a onClick={() => handleQuickSearch('Set quà tặng dưới 500K')}>Set quà tặng dưới 500K</a>
                          <a onClick={() => handleQuickSearch('Set quà tặng dưới 1000K')}>Set quà tặng dưới 1000K</a>
                          <a onClick={() => handleQuickSearch('Set quà tặng cao cấp')}>Set quà tặng cao cấp</a>
                        </div>
                      </div>
                    </div>

                    <div className="mega-bottom-link">
                      <a onClick={() => handleQuickTab('Tất cả')} style={{ cursor: 'pointer' }}>TẤT CẢ SẢN PHẨM</a>
                    </div>
                  </div>

                  <div className="mega-right-images">
                    <div className="mega-promo-card" onClick={() => handleQuickTab('Quà tặng')}>
                      <img src={getImg('product-2.jpg') || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80'} alt="Mega Promo 1" />
                      <div className="promo-overlay">
                        <div className="promo-content">
                          <span className="promo-tag">HOT DEAL</span>
                          <h4>Set Quà Tặng Mùa Hè</h4>
                          <p>Tiết kiệm lên đến 30%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mega-promo-card" onClick={() => handleQuickTab('Chống nắng')}>
                      <img src={getImg('product-4.jpg') || 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80'} alt="Mega Promo 2" />
                      <div className="promo-overlay">
                        <div className="promo-content">
                          <span className="promo-tag">NEW</span>
                          <h4>Kem Chống Nắng SPF 50</h4>
                          <p>Bảo vệ da toàn diện</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blogs</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="shop-main-header">
          <div className="header-left">
            <HeaderSearch />
          </div>

          
          <div className="header-center logo">
            <img src={getImg('logo-lunaria.jpg')} alt="LUNARIA Logo" style={{ height: '40px', objectFit: 'contain' }} />
            LUNARIA
          </div>

          <div className="header-right header-actions">
            <Link to="/notifications" className="notification-bell-link" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <BellOutlined className="action-icon" style={{ color: 'inherit' }} />
              {unreadCount > 0 && <span className="header-unread-badge">{unreadCount}</span>}
            </Link>
            <Link to="/cart">
              <ShoppingCartOutlined className="action-icon" style={{ color: 'inherit' }} />
            </Link>
            <div className="user-menu-wrapper">
              <Link to={currentUser ? "/account" : "/auth/login"}>
                <UserOutlined className="action-icon" style={{ color: 'inherit' }} />
              </Link>

              <div className="user-menu-dropdown">
                {currentUser ? (
                  <div className="user-dropdown-content logged-in">
                    <div className="user-header">
                      <span className="avatar">👤</span>
                      <div className="user-info">
                        <strong>{currentUser.email.split('@')[0]}</strong>
                        <span>Thành viên Lunaria</span>
                      </div>
                    </div>
                    <div className="user-menu-list">
                      <Link to="/account" className="user-menu-item">
                        <span className="icon">📄</span> Thông tin tài khoản
                      </Link>
                      <Link to="/orders" className="user-menu-item">
                        <span className="icon">📦</span> Đơn mua của tôi
                      </Link>
                      <Link to="/notifications" className="user-menu-item">
                        <span className="icon">🔔</span> Thông báo của tôi {unreadCount > 0 && `(${unreadCount})`}
                      </Link>
                      <a onClick={handleLogout} className="user-menu-item logout">
                        <span className="icon">🚪</span> Đăng xuất
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="user-dropdown-content guest">
                    <div className="guest-header">
                      <h4>Tài khoản Lunaria</h4>
                      <p>Đăng nhập để theo dõi đơn hàng và nhận ưu đãi</p>
                    </div>
                    <div className="guest-actions">
                      <Link to="/auth/login" className="btn-login">
                        Đăng nhập
                      </Link>
                      <Link to="/auth/register" className="btn-register">
                        Đăng ký
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="shop-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="shop-footer">
        <div className="footer-content">
          <div className="brand-info">
            <div className="logo">
              <img src={getImg('logo-lunaria.jpg')} alt="LUNARIA Logo" style={{ height: '50px', objectFit: 'contain', marginBottom: '10px' }} />
              LUNARIA
            </div>
            <div className="work-hours">
              <h4>Giờ làm việc</h4>
              <p>Thứ 2-Thứ 7: 8:00 - 22:00</p>
              <p>Chủ nhật: Đóng cửa</p>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Menu</h4>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/blog">Blogs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Liên hệ</h4>
            <div className="contact-item">
              <PhoneOutlined />
              <span>0867116469</span>
            </div>
            <div className="contact-item">
              <MailOutlined />
              <span>Lunaria.tn@gmail.com</span>
            </div>
            <div className="contact-item">
              <EnvironmentOutlined />
              <span>118 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</span>
            </div>
            
            <div className="social-icons">
              <div className="social-icon"><FacebookFilled /></div>
              <div className="social-icon"><TwitterCircleFilled /></div>
              <div className="social-icon"><InstagramFilled /></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright@2026_Lunaria</p>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
