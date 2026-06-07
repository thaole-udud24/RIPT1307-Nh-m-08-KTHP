import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox, Slider, Spin, Empty } from 'antd';
import { useLocation, history } from 'umi';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import CategoryTabs from './components/CategoryTabs';
import ShopHeroBanner from './components/ShopHeroBanner';
import ShopAllProducts from './components/ShopAllProducts'; // ✅ Gọi đúng component đã fix CSS Grid
import ShopGallery from './components/ShopGallery';
import ShopNewsletter from './components/ShopNewsletter';
import { getProducts } from '@/services/SanPham/products.customer.api';
import { getCategories } from '@/services/DanhMuc/categories.customer.api';
import { getSkinTypes } from '@/services/LoaiDa/skin-types.customer.api';

import './index.less';

const Products: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
  const [dynamicSkinTypes, setDynamicSkinTypes] = useState<any[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  useEffect(() => {
    const fetchMasterData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes, skinRes] = await Promise.all([
          getProducts({ limit: 100 }),
          getCategories(),   // ← public route
          getSkinTypes(),    // ← public route
        ]);
        setAllProducts(prodRes?.data || prodRes?.items || prodRes || []);
        setDynamicCategories(catRes?.data || catRes?.items || (Array.isArray(catRes) ? catRes : []));
        setDynamicSkinTypes(skinRes?.data || skinRes?.items || (Array.isArray(skinRes) ? skinRes : []));
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ API:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMasterData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearchQuery(q);
  }, [location.search]);

  const finalFilteredProducts = allProducts.filter((p) => {
    // 1. Search
    const matchSearch = !searchQuery ||
      (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Tab & Danh mục
    const pCategoryName = (p?.category?.name || p?.category || '').toLowerCase();
    const matchTab = activeTab === 'Tất cả' || pCategoryName.includes(activeTab.toLowerCase());
    const matchSidebarCat = selectedCategories.length === 0 ||
      selectedCategories.some(c => pCategoryName.includes(c.toLowerCase()));

    // 3. Loại da
    let pSkinNames = '';
    if (Array.isArray(p.skinTypes)) {
      pSkinNames = p.skinTypes.map((s: any) => s?.name || s).join(' ').toLowerCase();
    } else {
      pSkinNames = (p?.skinType?.name || p?.skinType || '').toLowerCase();
    }
    const matchSkin = selectedSkinTypes.length === 0 ||
      selectedSkinTypes.some(s => pSkinNames.includes(s.toLowerCase()));

    // 4. Giá — lấy từ variants[0].priceSell thay vì p.price
    const pPrice = p.variants?.[0]?.priceSell
      || p.variants?.[0]?.originalPrice
      || p.price
      || 0;
    const matchPrice = pPrice >= priceRange[0] && pPrice <= priceRange[1];

    return matchSearch && matchTab && matchSidebarCat && matchSkin && matchPrice;
  });

  const tabList = ['Tất cả', ...dynamicCategories.map(c => c.name || c.title)];

  return (
    <div className="shop2-page">
      <ShopHeroBanner />

      {searchQuery && (
        <div className="search-keyword-bar">
          <div className="search-inner-info">
            <SearchOutlined />
            <span>Kết quả tìm kiếm cho: <strong>"{searchQuery}"</strong></span>
          </div>
          <button className="clear-search-btn" onClick={() => { setSearchQuery(''); history.push('/products'); }}>
            <CloseCircleOutlined /> Xóa tìm kiếm
          </button>
        </div>
      )}

      <CategoryTabs tabs={tabList} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="shop2-container shop2-main-layout">
        <Row gutter={40} align="top">
          <Col xs={24} lg={6}>
            <div className="sidebar-filter-custom">
              <div className="sidebar-main-title">Bộ lọc sản phẩm</div>

              <div className="filter-block">
                <div className="filter-header">Khoảng giá (VND)</div>
                <div className="filter-body" style={{ padding: '0 10px' }}>
                  <Slider
                    range min={0} max={3000000} step={50000}
                    value={priceRange}
                    onChange={(val) => setPriceRange(val as [number, number])}
                    trackStyle={[{ backgroundColor: '#FFA78A' }]}
                    handleStyle={[{ borderColor: '#FFA78A' }, { borderColor: '#FFA78A' }]}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                    <span>{priceRange[0].toLocaleString('vi-VN')}đ</span>
                    <span>{priceRange[1].toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              <div className="filter-block">
                <div className="filter-header">Danh mục sản phẩm</div>
                <div className="filter-body">
                  <Checkbox.Group
                    value={selectedCategories}
                    onChange={(vals) => setSelectedCategories(vals as string[])}
                    style={{ width: '100%' }}
                  >
                    <Row gutter={[0, 8]}>
                      {dynamicCategories.map((cat, idx) => (
                        <Col span={24} key={`cat-${idx}`}>
                          <Checkbox value={cat.name || cat.title}>{cat.name || cat.title}</Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                </div>
              </div>

              <div className="filter-block">
                <div className="filter-header">Loại da phù hợp</div>
                <div className="filter-body">
                  <Checkbox.Group
                    value={selectedSkinTypes}
                    onChange={(vals) => setSelectedSkinTypes(vals as string[])}
                    style={{ width: '100%' }}
                  >
                    <Row gutter={[0, 8]}>
                      {dynamicSkinTypes.map((skin, idx) => (
                        <Col span={24} key={`skin-${idx}`}>
                          <Checkbox value={skin.name || skin.title}>{skin.name || skin.title}</Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={18}>
            {loading ? (
              <div className="shop-loading-state">
                <Spin size="large" tip="Đang tải dữ liệu Lunaria..." />
              </div>
            ) : finalFilteredProducts.length === 0 ? (
              <div className="shop-empty-state">
                <Empty description="Không tìm thấy sản phẩm nào phù hợp với bộ lọc." />
              </div>
            ) : (
              // ✅ Đã thay thế thành phần hiển thị danh sách sản phẩm chuẩn
              <div className="shop-products-wrapper">
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#333' }}>
                  {activeTab === 'Tất cả' ? 'Tất cả sản phẩm' : `Sản phẩm ${activeTab}`}
                </h2>
                <ShopAllProducts
                  products={finalFilteredProducts}
                  pageSize={12}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>

      <ShopGallery />
      <ShopNewsletter />
    </div>
  );
};

export default Products;