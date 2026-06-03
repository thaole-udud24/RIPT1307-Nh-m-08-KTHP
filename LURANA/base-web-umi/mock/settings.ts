// =========================
// STORAGE KEYS
// =========================

let storeInfo = {
  storeName:
    'Lunaria Cosmetics',

  email:
    'support@lunaria.vn',

  phone:
    '0901234567',

  address:
    '123 Nguyễn Huệ, Quận 1, TP.HCM',

  description:
    'Lunaria Cosmetics - Mỹ phẩm chính hãng dành cho làn da khỏe đẹp.',

  logo: '',

  facebook:
    'https://facebook.com/lunaria',

  instagram:
    'https://instagram.com/lunaria',

  tiktok:
    'https://tiktok.com/@lunaria',

  youtube:
    'https://youtube.com/@lunaria',

  zalo:
    'https://zalo.me/lunaria',
};

let accountInfo = {
  id: 1,

  fullName:
    'Administrator',

  email:
    'admin@lunaria.vn',

  username:
    'admin',

  role:
    'Admin',

  avatar: '',

  createdAt:
    '2025-01-01 08:00',

  lastLoginAt:
    '2026-05-30 09:00',
};

let preferences = {
  language: 'vi',

  timezone:
    'Asia/Ho_Chi_Minh',

  theme: 'light',

  emailNotification:
    true,

  showHelp: true,

  autoCollapseMenu:
    false,
};

let password =
  '123456';

// =========================
// DEFAULT STORE INFO
// =========================

const DEFAULT_STORE_INFO = {
  storeName:
    'Lunaria Cosmetics',

  email:
    'support@lunaria.vn',

  phone:
    '0901234567',

  address:
    '123 Nguyễn Huệ, Quận 1, TP.HCM',

  description:
    'Lunaria Cosmetics - Mỹ phẩm chính hãng dành cho làn da khỏe đẹp.',

  logo: '',

  facebook:
    'https://facebook.com/lunaria',

  instagram:
    'https://instagram.com/lunaria',

  tiktok:
    'https://tiktok.com/@lunaria',

  youtube:
    'https://youtube.com/@lunaria',

  zalo:
    'https://zalo.me/lunaria',
};

// =========================
// DEFAULT ACCOUNT INFO
// =========================

const DEFAULT_ACCOUNT_INFO = {
  id: 1,

  fullName:
    'Administrator',

  email:
    'admin@lunaria.vn',

  username:
    'admin',

  role:
    'Admin',

  avatar: '',

  createdAt:
    '2025-01-01 08:00',

  lastLoginAt:
    '2026-05-30 09:00',
};

// =========================
// DEFAULT PREFERENCES
// =========================

const DEFAULT_PREFERENCES = {
  language: 'vi',

  timezone:
    'Asia/Ho_Chi_Minh',

  theme: 'light',

  emailNotification:
    true,

  showHelp: true,

  autoCollapseMenu:
    false,
};

// =========================
// EXPORT MOCK API
// =========================

export default {

  // =========================
  // STORE INFO
  // =========================

  'GET /api/settings/store': (
    req: any,
    res: any,
  ) => {

    res.send({
      success: true,

      data: storeInfo,
    });
  },

  'PUT /api/settings/store': (
    req: any,
    res: any,
  ) => {

    storeInfo = {
      ...storeInfo,
      ...req.body,
    };

    return res.send({
      success: true,
      data: storeInfo,
      message:
        'Cập nhật thông tin cửa hàng thành công',
    });
  },

  // =========================
  // ACCOUNT INFO
  // =========================

  'GET /api/settings/account': (
    req: any,
    res: any,
  ) => {

    res.send({
      success: true,

      data: accountInfo,
    });
  },

  'PUT /api/settings/account': (
    req: any,
    res: any,
  ) => {

    accountInfo = {
      ...accountInfo,
      ...req.body,
    };

    return res.send({
      success: true,
      data: accountInfo,
      message:
        'Cập nhật thông tin tài khoản thành công',
    });
  },

  // =========================
  // CHANGE PASSWORD
  // =========================

  'POST /api/settings/change-password': (
    req: any,
    res: any,
  ) => {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (
      password !==
      currentPassword
    ) {
      return res.send({
        success: false,
        message:
          'Mật khẩu hiện tại không chính xác',
      });

      return;
    }
    password = newPassword;

    return res.send({
      success: true,
      message:
        'Đổi mật khẩu thành công',
    });
  },

  // =========================
  // PREFERENCES
  // =========================

  'GET /api/settings/preferences': (
    req: any,
    res: any,
  ) => {

    res.send({
      success: true,

      data: preferences,
    });
  },

  'PUT /api/settings/preferences': (
    req: any,
    res: any,
  ) => {

    preferences = {
      ...preferences,
      ...req.body,
    };

    return res.send({
      success: true,
      data: preferences,
      message:
        'Cập nhật tùy chọn thành công',
    });
  },

  // =========================
  // RESET MOCK DATA
  // =========================

  'POST /api/settings/reset': (
    req: any,
    res: any,
  ) => {

    storeInfo = {
      ...DEFAULT_STORE_INFO,
    };

    accountInfo = {
      ...DEFAULT_ACCOUNT_INFO,
    };

    preferences = {
      ...DEFAULT_PREFERENCES,
    };

    password = '123456';

    res.send({
      success: true,

      message:
        'Reset dữ liệu thành công',
    });
  },
};