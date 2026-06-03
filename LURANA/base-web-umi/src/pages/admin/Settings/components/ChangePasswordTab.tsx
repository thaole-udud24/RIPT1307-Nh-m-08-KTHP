import {
  Button,
  Form,
  Input,
  Space,
  Typography,
} from 'antd';

import {
  CheckCircleFilled,
  CloseCircleOutlined,
} from '@ant-design/icons';

import type {
  ChangePasswordPayload,
} from '@/types/settings';

const {
  Text,
} = Typography;

// =========================
// PROPS
// =========================

interface ChangePasswordTabProps {
  onSubmit: (
    payload: ChangePasswordPayload,
  ) => void;
}

// =========================
// COMPONENT
// =========================

const ChangePasswordTab = ({
  onSubmit,
}: ChangePasswordTabProps) => {

  const [form] =
    Form.useForm();

  const password =
    Form.useWatch(
      'newPassword',
      form,
    ) || '';

  const requirements = [
    {
      label:
        'Tối thiểu 8 ký tự',
      valid:
        password.length >= 8,
    },
    {
      label:
        'Ít nhất 1 chữ hoa',
      valid:
        /[A-Z]/.test(password),
    },
    {
      label:
        'Ít nhất 1 chữ thường',
      valid:
        /[a-z]/.test(password),
    },
    {
      label:
        'Ít nhất 1 số',
      valid:
        /\d/.test(password),
    },
    {
      label:
        'Ít nhất 1 ký tự đặc biệt',
      valid:
        /[!@#$%^&*(),.?":{}|<>]/.test(
          password,
        ),
    },
  ];

  const isPasswordValid =
    requirements.every(
      (item) => item.valid,
    );

  // =========================
  // SUBMIT
  // =========================

  const handleFinish =
    (
      values: {
        currentPassword: string;

        newPassword: string;

        confirmPassword: string;
      },
    ) => {

      onSubmit({
        currentPassword:
            values.currentPassword,

        newPassword:
            values.newPassword,

        confirmPassword:
            values.confirmPassword,
        });

      form.resetFields();
    };

  return (
  <div className="change-password-page">
    {/* LEFT */}

    <div className="password-form-card">
      <h3>Đổi mật khẩu</h3>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Mật khẩu hiện tại"
          name="currentPassword"
          rules={[
            {
              required: true,
              message:
                'Vui lòng nhập mật khẩu hiện tại',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message:
                'Vui lòng nhập mật khẩu mới',
            },

            {
              validator(_, value) {

                if (!value) {
                  return Promise.resolve();
                }

                const isValid =
                  value.length >= 8 &&
                  /[A-Z]/.test(value) &&
                  /[a-z]/.test(value) &&
                  /\d/.test(value) &&
                  /[!@#$%^&*(),.?":{}|<>]/.test(
                    value,
                  );

                return isValid
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        'Mật khẩu chưa đáp ứng đủ yêu cầu',
                      ),
                    );
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={[
            'newPassword',
          ]}
          rules={[
            {
              required: true,
              message:
                'Vui lòng xác nhận mật khẩu',
            },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue(
                    'newPassword',
                  ) === value
                ) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(
                    'Mật khẩu xác nhận không khớp',
                  ),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          disabled={!isPasswordValid}
        >
          Cập nhật mật khẩu
        </Button>
      </Form>
    </div>

    {/* RIGHT */}

    <div className="password-info">
      <div className="security-card">
        <h3>Yêu cầu mật khẩu</h3>

        <ul className="password-requirements">
          {requirements.map(
            (item) => (
              <li
                key={item.label}
                className={`password-requirement ${
                  item.valid
                    ? 'valid'
                    : 'invalid'
                }`}
              >
                <span className="requirement-icon">
                  {item.valid ? (
                    <CheckCircleFilled />
                  ) : (
                    <CloseCircleOutlined />
                  )}
                </span>

                <span>
                  {item.label}
                </span>
              </li>
            ),
          )}
        </ul>

      </div>

      <div className="security-card">
        <h3>Mẹo bảo mật</h3>

        <p>
          Không sử dụng thông tin cá
          nhân dễ đoán như ngày sinh,
          số điện thoại hoặc tên.
        </p>
      </div>
    </div>
  </div>
);
};

export default ChangePasswordTab;