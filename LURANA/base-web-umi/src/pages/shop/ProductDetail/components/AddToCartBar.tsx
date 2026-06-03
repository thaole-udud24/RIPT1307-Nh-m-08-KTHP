import React, { useState } from 'react';
import { StarFilled } from '@ant-design/icons';
import { message } from 'antd';
import { history } from 'umi';

interface AddToCartBarProps {
  productId?: number;
  productName?: string;
  sku?: string;
  rating?: number;
  price?: string;
  numericPrice?: number;
  image?: string;
}

const AddToCartBar: React.FC<AddToCartBarProps> = ({
  productId = 1,
  productName = 'CC+ Cream Illumination with SPF 50+',
  sku = 'CS-0005-1',
  rating = 5.0,
  price = '430,000đ',
  numericPrice = 430000,
  image = 'anh-san-pham-1.png',
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      setQuantity(val);
    } else if (e.target.value === '') {
      setQuantity(1);
    }
  };

  const saveToCart = () => {
    const CART_KEY = 'lunaria_cart_items';
    let cartItems: any[] = [];
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        cartItems = JSON.parse(stored);
      }
    } catch (err) {
      console.error(err);
    }

    const existingIdx = cartItems.findIndex((item) => item.id === productId);
    if (existingIdx > -1) {
      cartItems[existingIdx].qty += quantity;
    } else {
      cartItems.push({
        id: productId,
        name: productName,
        variant: 'Mặc định',
        price: numericPrice,
        qty: quantity,
        img: image,
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleAddToCart = () => {
    saveToCart();
    message.success(`Đã thêm ${quantity} sản phẩm "${productName}" vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    saveToCart();
    message.success(`Đang chuyển đến trang thanh toán cho ${quantity} sản phẩm!`);
    history.push('/cart');
  };

  return (
    <div className="product-info-summary">
      <h1 className="product-title">{productName}</h1>
      <div className="product-sku">SKU: {sku}</div>
      
      <div className="product-rating">
        <StarFilled className="star-icon" />
        <span className="rating-val">{rating.toFixed(1)}</span>
      </div>

      <div className="product-price">{price}</div>

      {/* Quantity Selector */}
      <div className="quantity-selector-wrapper">
        <button className="qty-btn minus" onClick={handleDecrease}>-</button>
        <input 
          type="text" 
          className="qty-input" 
          value={quantity} 
          onChange={handleInputChange} 
        />
        <button className="qty-btn plus" onClick={handleIncrease}>+</button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-group">
        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          Thêm vào giỏ
        </button>
        <button className="btn-buy-now" onClick={handleBuyNow}>
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default AddToCartBar;
