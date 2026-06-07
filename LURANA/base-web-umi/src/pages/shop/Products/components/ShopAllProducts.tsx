import React, { useState } from 'react';
import { Pagination, Select, message } from 'antd';
import { HeartFilled, HeartOutlined, StarFilled } from '@ant-design/icons';
import { history } from 'umi';
import './ShopAllProducts.less'; 

// ✅ Chỉ nhận data THẬT từ API được truyền xuống từ trang index.tsx
interface ShopAllProductsProps {
  products: any[];
  pageSize?: number;
}

// Hàm lấy ảnh từ Object API trả về
const FALLBACK_IMAGE = 'https://placehold.co/600x600/FFF8F6/FFA78A?text=No+Image';
const getProductImage = (p: any) => {
  if (p.mainImage) return p.mainImage;
  if (p.images && p.images.length > 0) return p.images[0];
  if (p.avatar_url) return p.avatar_url;
  if (p.img) return p.img;
  return FALLBACK_IMAGE;
};

// Hàm lấy giá từ Object API (Ưu tiên lấy giá Sell của Variant đầu tiên)
const getProductPrice = (p: any) => {
  if (p.variants && p.variants.length > 0) {
    const price = p.variants[0].priceSell || p.variants[0].originalPrice || 0;
    return price.toLocaleString('vi-VN') + 'đ';
  }
  if (typeof p.price === 'number') return p.price.toLocaleString('vi-VN') + 'đ';
  return 'Liên hệ';
};

const getProductId = (p: any) => p._id || p.id || '';

// Nút thả tim (Tạm thời lưu State UI)
const HeartButton: React.FC<{ productId: string }> = ({ productId }) => {
  const [active, setActive] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài thẻ Card
    // TODO: Gọi API thêm vào wishlist thật ở đây
    setActive(!active);
  };

  return (
    <div className="heart-icon" onClick={handleClick}>
      {active ? <HeartFilled className="active-heart" /> : <HeartOutlined />}
    </div>
  );
};

const ShopAllProducts: React.FC<ShopAllProductsProps> = ({ products = [], pageSize = 12 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(pageSize);

  // Xử lý phân trang bằng mảng data thật
  const startIdx = (currentPage - 1) * limit;
  const pageProducts = products.slice(startIdx, startIdx + limit);

  // Tính toán số lượng ô trống cần bù vào để luôn đủ bố cục
  const emptyBoxesCount = limit - pageProducts.length;
  const emptyBoxes = Array.from({ length: emptyBoxesCount > 0 ? emptyBoxesCount : 0 });

  return (
    <div className="shop-all-products">
      {/* KHU VỰC GRID SẢN PHẨM (DÙNG CSS GRID THUẦN) */}
      <div className="custom-product-grid">
        
        {/* Render sản phẩm có thật */}
        {pageProducts.map((p) => {
          const pid = getProductId(p);
          
          return (
            <div 
              key={pid}
              className="shop2-product-card"
              onClick={() => history.push(`/products/${pid}`)}
            >
              <div className="card-top">
                <HeartButton productId={pid} />
                <div className="rating-badge">
                  <StarFilled /> <span>{p.rating || '5.0'}</span>
                </div>
              </div>
              
              <div className="card-img-container">
                <img 
                  src={getProductImage(p)} 
                  alt={p.name} 
                  onError={(e: any) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                />
              </div>
              
              <div className="card-info">
                <h4 className="prod-name">{p.name}</h4>
                <div className="prod-price">
                  <span>{getProductPrice(p)}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Render ô trống bù vào cho đủ lưới 4 cột */}
        {emptyBoxes.map((_, index) => (
          <div key={`empty-${index}`} className="shop2-product-card empty-card">
            <div className="empty-content"></div>
          </div>
        ))}
      </div>

      {/* KHU VỰC PHÂN TRANG */}
      {products.length > 0 && (
        <div className="custom-pagination">
          <span className="total-text">Tổng số: {products.length} sản phẩm</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Pagination 
              simple 
              current={currentPage} 
              total={products.length} 
              pageSize={limit}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              itemRender={(page, type, originalElement) => {
                if (type === 'prev') return <a>&lt;</a>;
                if (type === 'next') return <a>&gt;</a>;
                return originalElement;
              }}
            />
            <Select 
              value={limit.toString()} 
              onChange={(val) => { setLimit(parseInt(val)); setCurrentPage(1); }} 
              bordered={false} 
              className="per-page-select"
            >
              <Select.Option value="8">8 / trang</Select.Option>
              <Select.Option value="12">12 / trang</Select.Option>
              <Select.Option value="24">24 / trang</Select.Option>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopAllProducts;