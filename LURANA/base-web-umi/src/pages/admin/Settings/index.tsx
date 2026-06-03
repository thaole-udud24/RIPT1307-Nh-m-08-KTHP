import {
  useEffect,
  useState,
} from 'react';

import {
  Spin,
  message,
} from 'antd';

import './styles.less';

import SettingsSidebar from './components/SettingsSidebar';

import StoreInfoView from './components/StoreInfoView';

import StoreInfoForm from './components/StoreInfoForm';

import AccountSecurity from './components/AccountSecurity';

import type {
  StoreInfo,
  AccountInfo,
  UserPreferences,
  ChangePasswordPayload,
  UpdateAccountInfoPayload,
} from '@/types/settings';

import {
  getStoreInfo,
  updateStoreInfo,
  getAccountInfo,
  getPreferences,
  updatePreferences,
  changePassword,
  updateAccountInfo,
} from '@/services/CaiDat';

// =========================
// TYPES
// =========================

type SettingModule =
  | 'store'
  | 'account';

// =========================
// PAGE
// =========================

const SettingsPage = () => {
  // =========================
  // STATES
  // =========================

  const [loading, setLoading] =
    useState(false);

  const [
    activeModule,
    setActiveModule,
  ] =
    useState<SettingModule>(
      'store',
    );

  const [
    isEditingStore,
    setIsEditingStore,
  ] = useState(false);

  const [
    storeInfo,
    setStoreInfo,
  ] =
    useState<StoreInfo | null>(
      null,
    );

  const [
    accountInfo,
    setAccountInfo,
  ] =
    useState<AccountInfo | null>(
      null,
    );

  const [
    preferences,
    setPreferences,
  ] =
    useState<UserPreferences | null>(
      null,
    );

  // =========================
  // FETCH DATA
  // =========================

  const loadSettings =
    async () => {

      setLoading(true);

      try {

        const [
          storeRes,
          accountRes,
          preferencesRes,
        ] =
          await Promise.all([
            getStoreInfo(),
            getAccountInfo(),
            getPreferences(),
          ]);

        if (storeRes.success) {
          setStoreInfo(
            storeRes.data,
          );
        }

        if (accountRes.success) {
          setAccountInfo(
            accountRes.data,
          );
        }

        if (preferencesRes.success) {
          setPreferences(
            preferencesRes.data,
          );
        }

      } catch {

        message.error(
          'Không thể tải dữ liệu cài đặt',
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {
    loadSettings();
  }, []);

  // =========================
  // STORE INFO
  // =========================

  const handleSaveStoreInfo =
    async (
      values: StoreInfo,
    ) => {

      const response =
        await updateStoreInfo(
          values,
        );

      if (!response.success) {

        message.error(
          response.message,
        );

        return;
      }

      setStoreInfo(
        response.data,
      );

      setIsEditingStore(
        false,
      );

      message.success(
        response.message,
      );
    };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handleChangePassword =
    async (
      payload: ChangePasswordPayload,
    ) => {

      const response =
        await changePassword(
          payload,
        );

      if (!response.success) {

        message.error(
          response.message,
        );

        return;
      }

      message.success(
        response.message,
      );
    };

  // =========================
  // UPDATE PREFERENCES
  // =========================

  const handleUpdatePreferences =
    async (
      values: UserPreferences,
    ) => {

      const response =
        await updatePreferences(
          values,
        );

      if (!response.success) {

        message.error(
          response.message,
        );

        return;
      }

      setPreferences(
        response.data,
      );

      message.success(
        response.message,
      );
    };

    const handleUpdateAccount =
      async (
        values: UpdateAccountInfoPayload,
      ) => {

        const response =
          await updateAccountInfo(
            values,
          );

        if (!response.success) {

          message.error(
            response.message,
          );

          return;
        }

        setAccountInfo(
          response.data,
        );

        message.success(
          response.message,
        );
      };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-page">
        <Spin />
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div className="admin-page">

        <div className="admin-header">
            <div className="admin-title">
                Cài đặt
            </div>

            <div className="admin-breadcrumb">
                Home {'>'} Cài đặt
            </div>
        </div>

      <div className="settings-layout">
        {/* SIDEBAR */}

        <SettingsSidebar
          activeKey={
            activeModule
          }
          onChange={
            setActiveModule
          }
        />

        {/* CONTENT */}

        <div className="settings-content">
          {/* STORE */}

          {activeModule ===
            'store' &&
            storeInfo && (
              <>
                {!isEditingStore ? (
                  <StoreInfoView
                    storeInfo={
                      storeInfo
                    }
                    onEdit={() =>
                      setIsEditingStore(
                        true,
                      )
                    }
                  />
                ) : (
                  <StoreInfoForm
                    initialValues={
                      storeInfo
                    }
                    onSubmit={
                      handleSaveStoreInfo
                    }
                    onCancel={() =>
                      setIsEditingStore(
                        false,
                      )
                    }
                  />
                )}
              </>
            )}

          {/* ACCOUNT */}

          {activeModule ===
            'account' &&
            accountInfo &&
            preferences && (
              <AccountSecurity
                accountInfo={accountInfo}
                preferences={preferences}
                onChangePassword={
                    handleChangePassword
                }
                onUpdatePreferences={
                    handleUpdatePreferences
                }
                onUpdateAccount={
                    handleUpdateAccount
                }
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;