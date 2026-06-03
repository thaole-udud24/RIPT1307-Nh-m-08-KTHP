import {
  useEffect,
  useState,
} from 'react';

import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Radio,
  Row,
  Select,
  Switch,
  Tabs,
  Typography,
  Form,
  Input,
  Upload,
  message,
} from 'antd';

import {
  UserOutlined,
} from '@ant-design/icons';

import ChangePasswordTab from './ChangePasswordTab';
import PreferencesTab from './PreferencesTab';

import type {
  AccountInfo,
  ChangePasswordPayload,
  UserPreferences,
  UpdateAccountInfoPayload,
  AccountFormValues,
} from '@/types/settings';

const {
  Title,
  Text,
} = Typography;

interface AccountSecurityProps {
  accountInfo: AccountInfo;

  preferences: UserPreferences;

  onChangePassword: (
    payload: ChangePasswordPayload,
  ) => void;

  onUpdatePreferences: (
    values: UserPreferences,
  ) => Promise<void>;
  
  onUpdateAccount: (
    values: UpdateAccountInfoPayload,
  ) => Promise<void>;
}

const AccountSecurity = ({
  accountInfo,
  preferences,
  onChangePassword,
  onUpdatePreferences,
  onUpdateAccount,
}: AccountSecurityProps) => {

  const [saving, setSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [avatarUrl, setAvatarUrl] =
    useState(
      accountInfo.avatar || '',
    );

  const [
    localPreferences,
    setLocalPreferences,
  ] = useState(preferences);

  const [form] = Form.useForm();

  const handleSaveAccount = async (
    values: AccountFormValues,
  ) => {

    setSaving(true);

    try {

      await onUpdateAccount({
        fullName: values.fullName,
        email: values.email,
        avatar: avatarUrl,
      });

      setIsEditing(false);

    } finally {

      setSaving(false);

    }
  };

  useEffect(() => {

    setAvatarUrl(
      accountInfo.avatar || '',
    );

    setLocalPreferences(
      preferences,
    );

    form.setFieldsValue({
      fullName:
        accountInfo.fullName,

      email:
        accountInfo.email,

      username:
        accountInfo.username,
    });

  }, [
    accountInfo,
    preferences,
    form,
  ]);

  const handlePreferenceChange =
    async (
      values: Partial<UserPreferences>,
    ) => {

      const updatedPreferences =
        {
          ...localPreferences,
          ...values,
        };

      setLocalPreferences(
        updatedPreferences,
      );

      await onUpdatePreferences(
        updatedPreferences,
      );
    };

  const accountTab = (

    <div className="account-overview">

      <Row gutter={24}>

        {/* LEFT */}

        <Col
          xs={24}
          lg={12}
        >

          <Card className="account-card">

            <Title level={5}>
              Thông tin tài khoản
            </Title>

            <div className="account-avatar-wrapper">

              <div className="avatar-title">
                Ảnh đại diện
              </div>

              <div className="account-avatar-section">

                <Avatar
                  size={120}
                  src={avatarUrl}
                  icon={<UserOutlined />}
                />

              <div className="avatar-upload">
                <Upload
                  accept=".jpg,.jpeg,.png"
                  showUploadList={false}
                  beforeUpload={(file) => {

                    const isImage =
                      file.type.includes(
                        'image',
                      );
                      
                    if (!isImage) {
                      message.error(
                        'Chỉ hỗ trợ ảnh',
                      );
                      return false;
                    }

                    const isLt2M =
                      file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      message.error(
                        'Ảnh tối đa 2MB',
                      );
                      return false;
                    }

                    const reader =
                      new FileReader();
                    reader.onload =
                      (e) => {
                        setAvatarUrl(
                          e.target
                            ?.result as string,
                        );
                      };
                    reader.readAsDataURL(
                      file,
                    );
                    return false;
                  }}
                >

                  <Button
                    className="avatar-upload-btn"
                  >
                    Đổi ảnh
                  </Button>

                </Upload>

                <Text
                  type="secondary"
                  className="avatar-note"
                >
                  JPG, PNG - Tối đa 2MB
                </Text>

              </div>
              </div>
            </div>

            {!isEditing ? (

              <div className="account-info-list">

                <div className="account-info-row">
                  <span>Họ tên</span>
                  <strong>
                    {accountInfo.fullName}
                  </strong>
                </div>

                <div className="account-info-row">
                  <span>Email</span>
                  <strong>
                    {accountInfo.email}
                  </strong>
                </div>

                <div className="account-info-row">
                  <span>Tên đăng nhập</span>
                  <strong>
                    {accountInfo.username}
                  </strong>
                </div>

                <div className="account-info-row">
                  <span>Vai trò</span>
                  <strong>
                    {accountInfo.role}
                  </strong>
                </div>

              </div>

            ) : (

              <Form
                layout="vertical"
                form={form}
                onFinish={
                  handleSaveAccount
                }
              >

                <Form.Item
                  name="fullName"
                  label="Họ tên"
                >

                  <Input />

                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                >

                  <Input />

                </Form.Item>

                <Form.Item
                  name="username"
                  label="Tên đăng nhập"
                >

                  <Input disabled />

                </Form.Item>

              </Form>

            )}

            <Divider />

            <div className="account-meta-list">

              <div className="account-info-row">
                <span>
                  Ngày tạo tài khoản
                </span>

                <strong>
                  {accountInfo.createdAt}
                </strong>
              </div>

              <div className="account-info-row">
                <span>
                  Lần đăng nhập cuối
                </span>

                <strong>
                  {accountInfo.lastLoginAt}
                </strong>
              </div>

            </div>

            <div className="account-update-btn">
              {!isEditing ? (

                <Button
                  type="primary"
                  onClick={() =>
                    setIsEditing(true)
                  }
                >
                  Cập nhật thông tin
                </Button>

              ) : (
                <>
                  <Button
                    onClick={() => {

                      form.setFieldsValue({
                        fullName:
                          accountInfo.fullName,

                        email:
                          accountInfo.email,

                        username:
                          accountInfo.username,
                      });

                      setAvatarUrl(
                        accountInfo.avatar || '',
                      );

                      setIsEditing(false);
                    }}
                  >
                    Hủy
                  </Button>

                  <Button
                    type="primary"
                    loading={saving}
                    onClick={() =>
                      form.submit()
                    }
                  >
                    Lưu
                  </Button>
                </>
              )}
            </div>

          </Card>

        </Col>

        {/* RIGHT */}

        <Col
          xs={24}
          lg={12}
        >

          <Card className="account-card">

            <Title level={5}>
              Thông tin hệ thống
            </Title>

            <div className="setting-group">

              <label>
                Ngôn ngữ
              </label>

              <Select
                value={
                  localPreferences.language
                }
                options={[
                  {
                    label:
                      'Tiếng Việt',
                    value:
                      'vi',
                  },
                ]}
                onChange={(
                  value,
                ) =>
                  handlePreferenceChange(
                    {
                      language:
                        value,
                    },
                  )
                }
              />

            </div>

            <div className="setting-group">

              <label>
                Múi giờ
              </label>

              <Select
                value={
                  localPreferences.timezone
                }
                options={[
                  {
                    label:
                      'Asia/Ho_Chi_Minh',
                    value:
                      'Asia/Ho_Chi_Minh',
                  },
                ]}
                onChange={(
                  value,
                ) =>
                  handlePreferenceChange(
                    {
                      timezone:
                        value,
                    },
                  )
                }
              />

            </div>

            <div className="setting-group">

              <label>
                Giao diện
              </label>

              <Radio.Group
                value={
                  localPreferences.theme
                }
                onChange={(
                  e,
                ) =>
                  handlePreferenceChange(
                    {
                      theme:
                        e.target.value,
                    },
                  )
                }
              >

                <Radio value="light">
                  Sáng
                </Radio>

                <Radio value="dark">
                  Tối
                </Radio>

              </Radio.Group>

            </div>

          </Card>

          <Card
            className="account-card"
            style={{
              marginTop: 24,
            }}
          >

            <Title level={5}>
              Thiết lập khác
            </Title>

            <div className="security-switch-row">

              <span>
                Nhận thông báo qua email
              </span>

              <Switch
                checked={
                  localPreferences.emailNotification
                }
                onChange={(
                  checked,
                ) =>
                  handlePreferenceChange(
                    {
                      emailNotification:
                        checked,
                    },
                  )
                }
              />

            </div>

            <div className="security-switch-row">

              <span>
                Hiển thị trợ giúp
              </span>

              <Switch
                checked={
                  localPreferences.showHelp
                }
                onChange={(
                  checked,
                ) =>
                  handlePreferenceChange(
                    {
                      showHelp:
                        checked,
                    },
                  )
                }
              />

            </div>

            <div className="security-switch-row">

              <span>
                Thu nhỏ menu tự động
              </span>

              <Switch
                checked={
                  localPreferences.autoCollapseMenu
                }
                onChange={(
                  checked,
                ) =>
                  handlePreferenceChange(
                    {
                      autoCollapseMenu:
                        checked,
                    },
                  )
                }
              />

            </div>

          </Card>

        </Col>

      </Row>

    </div>

  );

  return (

    <div className="account-security">

      <Tabs
        defaultActiveKey="account"
        className="account-security-tabs"
      >
        <Tabs.TabPane
          tab="Thông tin tài khoản"
          key="account"
        >
          {accountTab}
        </Tabs.TabPane>

        <Tabs.TabPane
          tab="Đổi mật khẩu"
          key="password"
        >
          <ChangePasswordTab
            onSubmit={onChangePassword}
          />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab="Bảo mật"
          key="security"
        >
          <PreferencesTab
            initialValues={preferences}
            onSubmit={onUpdatePreferences}
          />
        </Tabs.TabPane>
      </Tabs>

    </div>

  );
};

export default AccountSecurity;