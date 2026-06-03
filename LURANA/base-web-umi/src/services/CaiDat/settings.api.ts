import request from '@/services/base/request';

import type {
  BaseResponse,
} from '@/services/base/types';

import type {
  StoreInfo,
  AccountInfo,
  UserPreferences,
  UpdateStoreInfoPayload,
  UpdateAccountInfoPayload,
  UpdatePreferencesPayload,
  ChangePasswordPayload,
} from '@/types/settings';

// =========================
// STORE INFO
// =========================

export async function getStoreInfo() {
  return request<
    BaseResponse<StoreInfo>
  >('/api/settings/store');
}

export async function updateStoreInfo(
  payload: UpdateStoreInfoPayload,
) {
  return request<
    BaseResponse<StoreInfo>
  >('/api/settings/store', {
    method: 'PUT',
    data: payload,
  });
}

// =========================
// ACCOUNT INFO
// =========================

export async function getAccountInfo() {
  return request<
    BaseResponse<AccountInfo>
  >('/api/settings/account');
}

export async function updateAccountInfo(
  payload: UpdateAccountInfoPayload,
) {
  return request<
    BaseResponse<AccountInfo>
  >('/api/settings/account', {
    method: 'PUT',
    data: payload,
  });
}

// =========================
// PASSWORD
// =========================

export async function changePassword(
  payload: ChangePasswordPayload,
) {
  return request<
    BaseResponse<null>
  >('/api/settings/change-password', {
    method: 'POST',
    data: payload,
  });
}

// =========================
// PREFERENCES
// =========================

export async function getPreferences() {
  return request<
    BaseResponse<UserPreferences>
  >('/api/settings/preferences');
}

export async function updatePreferences(
  payload: UpdatePreferencesPayload,
) {
  return request<
    BaseResponse<UserPreferences>
  >('/api/settings/preferences', {
    method: 'PUT',
    data: payload,
  });
}