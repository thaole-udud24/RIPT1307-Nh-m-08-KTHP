import React from 'react';
import { getImg } from '../utils';

const QuoteSection: React.FC = () => {
  const bgImg = getImg('anh-quote-bg.png');
  return (
    <section 
      className="quote-section" 
      style={{ 
        background: `url(${bgImg || 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}) center/cover` 
      }}
    >
      <div className="quote-content">
        <p>"Tôi tin rằng, làn da không cần được thay đổi để trở nên đẹp hơn. Điều làn da thật sự cần là sự thấu hiểu, kiên nhẫn và những điều lành tính từ thiên nhiên. LUNARIA ra đời để đồng hành cùng làn da theo cách dịu dàng và bền vững nhất."</p>
        <div className="author">— Nhà sáng lập LUNARIA</div>
      </div>
    </section>
  );
};

export default QuoteSection;
