import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-text">
          <h3>Những con số từ LUNARIA</h3>
          <p>Những giá trị được tạo nên từ sự bền bỉ, tỉ mỉ và cam kết lâu dài với làn da, được nuôi dưỡng qua thời gian, từ nghiên cứu khoa học đến từng trải nghiệm chăm sóc da hằng ngày.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <h4>10 + Năm</h4>
            <p>Nghiên cứu và phát triển</p>
          </div>
          <div className="stat-item">
            <h4>100%</h4>
            <p>Sản phẩm được kiểm nghiệm da liễu</p>
          </div>
          <div className="stat-item">
            <h4>5000 +</h4>
            <p>Khách hàng lựa chọn và tin dùng</p>
          </div>
          <div className="stat-item">
            <h4>20 +</h4>
            <p>Thành phần có nguồn gốc tự nhiên</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
