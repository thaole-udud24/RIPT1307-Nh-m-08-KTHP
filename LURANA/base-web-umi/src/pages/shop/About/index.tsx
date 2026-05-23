import React from 'react';
import { Link } from 'umi';
import {
  HeartFilled,
  SafetyCertificateOutlined,
  ExperimentOutlined,
  GlobalOutlined,
  StarFilled,
  CheckCircleFilled,
  AppstoreOutlined,
} from '@ant-design/icons';
import './index.less';

const getImg = (name: string) => {
  try {
    return require(`@/assets/images/${name}`);
  } catch {
    return '';
  }
};

const About: React.FC = () => {
  return (
    <div className="about-page">

      {/* ─── HERO ─── */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="about-hero-badge">Câu chuyện của chúng tôi</span>
          <h1>Lunaria — Vẻ đẹp <br />từ thiên nhiên</h1>
          <p>
            Được sinh ra từ tình yêu dành cho làn da Việt, Lunaria mang sứ mệnh
            mang đến những sản phẩm thuần khiết, lành tính và hiệu quả bền vững.
          </p>
        </div>
        <div className="about-hero-img-wrap">
          <img src={getImg('anh2-about.png')} alt="About Lunaria" className="about-hero-img" />
        </div>
      </section>

      {/* ─── BRAND STORY ─── */}
      <section className="about-story">
        <div className="about-container">
          <div className="story-text-block">
            <span className="section-label">Nguồn gốc thương hiệu</span>
            <h2>Từ một niềm tin nhỏ <br />trở thành hành trình lớn</h2>
            <p>
              Lunaria được sáng lập năm 2014 bởi một nhóm các nhà khoa học và chuyên gia
              da liễu với chung một tâm huyết: tạo ra dòng mỹ phẩm không chứa chất độc hại,
              thân thiện với mọi loại da — đặc biệt là làn da nhạy cảm của phụ nữ Việt.
            </p>
            <p>
              Mỗi sản phẩm Lunaria đều trải qua hàng trăm thử nghiệm lâm sàng trước khi
              đến tay khách hàng. Chúng tôi tin rằng vẻ đẹp thật sự đến từ bên trong —
              từ làn da được chăm sóc đúng cách, từ sự tự tin và từ lối sống lành mạnh.
            </p>
            <Link to="/products" className="about-cta-btn">Khám phá sản phẩm</Link>
          </div>

          <div className="story-stats-block">
            {[
              { num: '10+', label: 'Năm nghiên cứu & phát triển' },
              { num: '5000+', label: 'Khách hàng tin dùng' },
              { num: '100%', label: 'Kiểm nghiệm da liễu' },
              { num: '20+', label: 'Thành phần tự nhiên' },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <h3>{s.num}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="about-values">
        <div className="about-container">
          <div className="section-header">
            <span className="section-label">Giá trị cốt lõi</span>
            <h2>Những điều chúng tôi tin tưởng</h2>
          </div>
          <div className="values-grid">
            {[
              {
                icon: <AppstoreOutlined />,
                title: 'Thuần Tự Nhiên',
                desc: 'Tất cả thành phần đều có nguồn gốc thiên nhiên, được chọn lọc kỹ càng từ những vùng trồng trọt sạch.',
              },
              {
                icon: <SafetyCertificateOutlined />,
                title: 'An Toàn Tuyệt Đối',
                desc: 'Không parabens, không sulfate, không chất bảo quản độc hại. 100% đã qua kiểm định da liễu.',
              },
              {
                icon: <ExperimentOutlined />,
                title: 'Khoa Học Hiện Đại',
                desc: 'Kết hợp tinh hoa từ thiên nhiên với công nghệ bào chế tiên tiến để tối ưu hiệu quả.',
              },
              {
                icon: <HeartFilled />,
                title: 'Yêu Thương Làn Da',
                desc: 'Mỗi sản phẩm được tạo ra với sự quan tâm sâu sắc đến cảm nhận và sức khỏe làn da.',
              },
              {
                icon: <GlobalOutlined />,
                title: 'Bền Vững',
                desc: 'Chúng tôi cam kết sản xuất có trách nhiệm, bảo vệ môi trường và chuỗi cung ứng bền vững.',
              },
              {
                icon: <StarFilled />,
                title: 'Chất Lượng Vượt Trội',
                desc: 'Tiêu chuẩn quốc tế được áp dụng trong từng khâu sản xuất, đảm bảo mỗi sản phẩm hoàn hảo.',
              },
            ].map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="about-timeline">
        <div className="about-container">
          <div className="section-header">
            <span className="section-label">Hành trình phát triển</span>
            <h2>Những cột mốc đáng nhớ</h2>
          </div>
          <div className="timeline">
            {[
              { year: '2014', title: 'Thành lập Lunaria', desc: 'Ra đời với 3 sản phẩm chăm sóc da đầu tiên, bán tại cửa hàng nhỏ ở Hà Nội.' },
              { year: '2016', title: 'Mở rộng dòng sản phẩm', desc: 'Giới thiệu dòng Trang Điểm và Chăm Sóc Tóc, phục vụ hơn 500 khách hàng thân thiết.' },
              { year: '2018', title: 'Ra mắt website thương mại điện tử', desc: 'Chính thức bán hàng online, tiếp cận khách hàng trên toàn quốc.' },
              { year: '2020', title: 'Chứng nhận quốc tế', desc: 'Đạt chứng nhận ISO 22716 về sản xuất mỹ phẩm an toàn từ tổ chức quốc tế.' },
              { year: '2023', title: '5000+ khách hàng tin dùng', desc: 'Cột mốc 5000 khách hàng thân thiết, mở rộng hệ thống phân phối toàn quốc.' },
              { year: '2026', title: 'Hướng tới tương lai', desc: 'Ra mắt nền tảng số mới, cá nhân hóa trải nghiệm chăm sóc da cho từng khách hàng.' },
            ].map((item, idx) => (
              <div key={item.year} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-dot"><CheckCircleFilled /></div>
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="about-team">
        <div className="about-container">
          <div className="section-header">
            <span className="section-label">Đội ngũ</span>
            <h2>Những con người đằng sau Lunaria</h2>
          </div>
          <div className="team-grid">
            {[
              { name: 'Nguyễn Minh Anh', role: 'Nhà sáng lập & CEO', avatar: 'default-avatar.png' },
              { name: 'Trần Hương Giang', role: 'Giám đốc R&D', avatar: 'default-avatar.png' },
              { name: 'Lê Phương Linh', role: 'Chuyên gia Da liễu', avatar: 'default-avatar.png' },
              { name: 'Phạm Quốc Huy', role: 'Giám đốc Marketing', avatar: 'default-avatar.png' },
            ].map((m) => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">
                  <img src={getImg(m.avatar)} alt={m.name} />
                </div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <span className="section-label light">Bắt đầu hành trình</span>
          <h2>Làn da khỏe mạnh<br />bắt đầu từ hôm nay</h2>
          <p>Khám phá hơn 50 sản phẩm thuần tự nhiên được hàng nghìn khách hàng tin dùng.</p>
          <Link to="/products" className="about-cta-btn white">Mua ngay</Link>
        </div>
      </section>

    </div>
  );
};

export default About;
