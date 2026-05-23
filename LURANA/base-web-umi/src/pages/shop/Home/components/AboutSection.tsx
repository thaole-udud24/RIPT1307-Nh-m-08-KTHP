import React, { useState } from 'react';
import { Button } from 'antd';
import { getImg } from '../utils';

const AboutSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="about-section">
      <div className="about-img">
        <img src={getImg('anh2-about.png')} alt="Ảnh 2: Về chúng tôi" />
      </div>
      <div className="about-text-wrapper">
        <div className="about-text">
          <h2>Vẻ đẹp bắt đầu từ sự thấu hiểu</h2>
          <p>
            Mỗi buổi sáng là một khởi đầu mới, khi làn da cần được đánh thức bằng sự dịu dàng.
            LUNARIA Beauty đồng hành cùng bạn từ những bước chăm sóc đầu tiên, giúp làn da 
            tươi tắn, cân bằng và sẵn sàng cho một ngày tràn đầy năng lượng.
            Bởi một ngày đẹp luôn bắt đầu từ cảm giác dễ chịu trên làn da.
          </p>
          {isExpanded && (
            <div className="expanded-content">
              <p>
                Chúng tôi tin rằng chăm sóc da không chỉ là một thói quen, mà là khoảnh khắc bạn trân trọng và lắng nghe chính mình. LUNARIA Beauty lựa chọn cẩn trọng những thành phần tinh túy từ thiên nhiên, kết hợp cùng công nghệ tiên tiến để mang lại hiệu quả vượt trội mà vẫn an toàn, lành tính cho mọi loại da.
              </p>
              <p>
                Hãy để mỗi giọt tinh chất, mỗi lớp kem dưỡng của LUNARIA trở thành lời thì thầm yêu thương, nuôi dưỡng vẻ đẹp tự nhiên rạng rỡ từ sâu bên trong. Dù cuộc sống có bận rộn, làn da của bạn vẫn luôn xứng đáng được chăm chút và tỏa sáng theo cách riêng nhất.
              </p>
            </div>
          )}
          <Button 
            type="primary" 
            className="read-more-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Thu gọn' : 'Đọc thêm'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
