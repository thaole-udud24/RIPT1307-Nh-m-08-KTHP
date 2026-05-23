import React from 'react';
import { SafetyCertificateOutlined, HeartFilled, ExperimentOutlined, SmileOutlined, StarOutlined } from '@ant-design/icons';
import { getImg } from '../utils';

const CommitmentSection: React.FC = () => {
  return (
    <section className="commitment-section">
      <div className="section-title-wrapper">
        <h2>Cam Kết Từ LUNARIA</h2>
      </div>
      <div className="commitment-grid">
        <div className="commitment-col">
          <div className="commit-box">
            <SafetyCertificateOutlined className="commit-icon" />
            <div className="commit-text">
              <h5>Thuần khiết từ thiên nhiên</h5>
              <p>Thành phần có nguồn gốc tự nhiên, được chọn lọc cẩn trọng.</p>
            </div>
          </div>
          <div className="commit-box">
            <HeartFilled className="commit-icon" />
            <div className="commit-text">
              <h5>Tôn trọng sự sống</h5>
              <p>LUNARIA cam kết không thử nghiệm trên động vật.</p>
            </div>
          </div>
          <div className="commit-box">
            <ExperimentOutlined className="commit-icon" />
            <div className="commit-text">
              <h5>Hướng đến vẻ đẹp bền vững</h5>
              <p>Bao bì và quy trình sản xuất hướng đến sự bền vững.</p>
            </div>
          </div>
        </div>
        <div className="commitment-center-img">
          <img src={getImg('anh3-commitment.png')} alt="Ảnh 3: Cam kết (Hũ kem)" />
        </div>
        <div className="commitment-col">
          <div className="commit-box">
            <SafetyCertificateOutlined className="commit-icon" />
            <div className="commit-text">
              <h5>Kiểm chứng khoa học từ da liễu</h5>
              <p>Sản phẩm được kiểm nghiệm da liễu, an toàn và phù hợp.</p>
            </div>
          </div>
          <div className="commit-box">
            <SmileOutlined className="commit-icon" />
            <div className="commit-text">
              <h5>Tinh giản để lành tính</h5>
              <p>Loại bỏ paraben, sulfate và các chất gây kích ứng.</p>
            </div>
          </div>
          <div className="commit-box">
            <StarOutlined className="commit-icon" />
            <div className="commit-text">
              <h5>Minh bạch tạo nên niềm tin</h5>
              <p>Nguồn gốc nguyên liệu và quy trình sản xuất được công bố rõ ràng.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
