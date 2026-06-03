import React, { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { useParams, history } from 'umi';
import CategoryTabs from '../Products/components/CategoryTabs';
import ShopNewsletter from '../Products/components/ShopNewsletter';
import ProductImages from './components/ProductImages';
import AddToCartBar from './components/AddToCartBar';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import { getProductDetail } from '@/services/SanPham/products.api';
import type { ProductType } from '@/types/catalog';
import './index.less';

const getDefaultProduct = (id: number): ProductType => {
  const mockNames: Record<number, string> = {
    1: 'Kem dưỡng ẩm Ceramide',
    2: 'Serum Vitamin C Brightening',
    3: 'Sữa rửa mặt trà xanh',
    4: 'Toner cấp ẩm Hyaluronic',
    5: 'Kem chống nắng SPF50+',
  };

  const name = mockNames[id] || `Sản phẩm cao cấp #${id}`;
  const price = id === 1 ? 450000 : id === 2 ? 450000 : id === 3 ? 180000 : id === 4 ? 260000 : id === 5 ? 390000 : 320000;
  
  const imgIndex = ((id - 1) % 8) + 1; // 1 to 8
  const images = [
    `anh-san-pham-${imgIndex}.png`,
    `anh-san-pham-${imgIndex === 8 ? 1 : imgIndex + 1}.png`,
    `anh-san-pham-${imgIndex === 1 ? 8 : imgIndex - 1}.png`,
  ];

  const categoryMap: Record<number, string> = {
    1: 'Dưỡng ẩm',
    2: 'Phục hồi',
    3: 'Làm sạch da',
    4: 'Cân bằng da',
    5: 'Chống nắng',
  };
  const category = categoryMap[id] || 'Làm sạch da';

  const skinTypeMap: Record<number, string> = {
    1: 'Da khô, da nhạy cảm',
    2: 'Mọi loại da, đặc biệt là da thâm sạm',
    3: 'Da dầu mụn, da thường',
    4: 'Da khô, da thiếu ẩm',
    5: 'Da nhạy cảm, mọi loại da',
  };
  const skinType = skinTypeMap[id] || 'Da nhạy cảm';

  return {
    id,
    name,
    price,
    weight: id === 1 ? 300 : id === 2 ? 30 : id === 3 ? 30 : id === 4 ? 300 : id === 5 ? 30 : 32,
    importPrice: price * 0.6,
    stock: 50,
    images,
    active: true,
    category,
    skinType,
    description: `${name} là dòng sản phẩm chăm sóc da cao cấp, được nghiên cứu và phát triển nhằm mang lại giải pháp tối ưu cho làn da của bạn. Với công thức chứa các dưỡng chất lành tính và an toàn, sản phẩm giúp cải thiện rõ rệt các khuyết điểm, đồng thời nuôi dưỡng làn da khỏe mạnh từ sâu bên trong.`,
    detail: `Sản phẩm đã được kiểm nghiệm da liễu, không chứa cồn, không chứa paraben và các hóa chất gây hại, tuyệt đối an toàn cho cả những làn da nhạy cảm nhất. Kết cấu mỏng nhẹ, thẩm thấu nhanh, mang lại cảm giác dễ chịu và thông thoáng suốt cả ngày dài.`,
  };
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const parsedId = Number(id);
      
      if (isNaN(parsedId)) {
        // Fallback for generic /productdetail
        setProduct(getDefaultProduct(1));
        setLoading(false);
        return;
      }

      try {
        const res = await getProductDetail(parsedId);
        if (res.success && res.data) {
          setProduct(res.data);
        } else {
          setProduct(getDefaultProduct(parsedId));
        }
      } catch (err) {
        setProduct(getDefaultProduct(parsedId));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleCategoryChange = (tab: string) => {
    setActiveCategory(tab);
    history.push(`/products?tab=${tab}`);
  };

  if (loading) {
    return (
      <div className="product-detail-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" style={{ color: '#ff8e73' }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Không tìm thấy sản phẩm yêu cầu!</h2>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Category Tabs Bar */}
      <CategoryTabs activeTab={activeCategory} onTabChange={handleCategoryChange} />

      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="product-breadcrumb">
          <span>Shop</span> &gt; <span>{product.category || 'Làm sạch da'}</span> &gt; <span>{product.skinType || 'Da nhạy cảm'}</span> &gt; <span className="current">{product.name}</span>
        </div>

        {/* Main Product Info Section (Images + Summary/AddToCart) */}
        <div className="product-main-overview">
          <Row gutter={[48, 48]} align="top">
            {/* Left: Images Gallery */}
            <Col xs={24} md={12}>
              <ProductImages images={product.images} />
            </Col>

            {/* Right: Summary & Add to Cart */}
            <Col xs={24} md={12}>
              <AddToCartBar 
                productId={product.id}
                productName={product.name}
                sku={`CS-0005-${product.id}`}
                price={`${product.price.toLocaleString('vi-VN')}đ`}
                numericPrice={product.price}
                image={product.images && product.images.length > 0 ? product.images[0] : 'anh-san-pham-1.png'}
                rating={5.0}
              />
            </Col>
          </Row>
        </div>

        {/* Product Tabs (Description, Info, Reviews) */}
        <ProductTabs 
          description={product.description}
          detail={product.detail}
          skinType={product.skinType}
          weight={product.weight}
        />

        {/* Related Products */}
        <RelatedProducts />
      </div>

      {/* Newsletter */}
      <ShopNewsletter />
    </div>
  );
};

export default ProductDetail;
