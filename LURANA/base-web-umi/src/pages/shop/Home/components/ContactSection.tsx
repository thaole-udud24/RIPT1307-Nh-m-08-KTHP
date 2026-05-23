import React from 'react';
import { Form, Input, Button } from 'antd';
import { getImg } from '../utils';

const ContactSection: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-form">
          <div className="form-title">LUNARIA</div>
          <h3>HÃY ĐỂ CHÚNG TÔI LẮNG NGHE</h3>
          <Form layout="vertical">
            <Form.Item label="Họ và tên:">
              <Input bordered={false} placeholder="Nhập họ và tên của bạn" className="custom-input" />
            </Form.Item>
            <Form.Item label="Email:">
              <Input bordered={false} placeholder="Nhập địa chỉ email" className="custom-input" />
            </Form.Item>
            <Form.Item label="Số điện thoại:">
              <Input bordered={false} placeholder="Nhập số điện thoại liên hệ" className="custom-input" />
            </Form.Item>
            <Form.Item label="Sản phẩm quan tâm:">
              <Input bordered={false} placeholder="Ví dụ: Kem dưỡng ẩm, Tinh chất làm sáng..." className="custom-input" />
            </Form.Item>
            <Button type="primary" className="submit-btn">Nhận yêu cầu tư vấn</Button>
          </Form>
        </div>
        <div className="contact-image">
          <img src={getImg('anh9-contact.png')} alt="LUNARIA liên hệ tư vấn" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
