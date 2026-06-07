<<<<<<< HEAD
export interface SkinTypeType {
    id: number;
    name: string;
}

const SKIN_TYPE_KEY = 'skin_types';

export const getSkinTypes = async (): Promise<{
    data: SkinTypeType[];
}> => {

    const skinTypes =
        localStorage.getItem(
            SKIN_TYPE_KEY,
        );

    return {
        data: skinTypes
            ? JSON.parse(skinTypes)
            : [],
    };
};

export const createSkinType = async (
    skinType: SkinTypeType,
) => {

    const oldSkinTypes =
        localStorage.getItem(
            SKIN_TYPE_KEY,
        );

    const skinTypes: SkinTypeType[] =
        oldSkinTypes
            ? JSON.parse(oldSkinTypes)
            : [];

    skinTypes.push(skinType);

    localStorage.setItem(
        SKIN_TYPE_KEY,
        JSON.stringify(skinTypes),
    );

    return {
        data: skinType,
    };
};

export const deleteSkinType = async (
    id: number,
) => {

    const oldSkinTypes =
        localStorage.getItem(
            SKIN_TYPE_KEY,
        );

    const skinTypes: SkinTypeType[] =
        oldSkinTypes
            ? JSON.parse(oldSkinTypes)
            : [];

    const newSkinTypes =
        skinTypes.filter(
            (item) => item.id !== id,
        );

    localStorage.setItem(
        SKIN_TYPE_KEY,
        JSON.stringify(newSkinTypes),
    );
};
=======
import request from '@/services/base/request';

import type {
  CreateSkinTypePayload,
  SkinType,
  UpdateSkinTypePayload,
} from './types';

// =========================
// GET ALL
// =========================

export async function getSkinTypes() {
  return request<SkinType[]>('/api/skin-types', {
    method: 'GET',
  });
}

// =========================
// CREATE
// =========================

export async function createSkinType(
  payload: CreateSkinTypePayload,
) {
  return request('/api/skin-types', {
    method: 'POST',
    data: payload,
  });
}

// =========================
// UPDATE
// =========================

export async function updateSkinType(
  id: number,
  payload: UpdateSkinTypePayload,
) {
  return request(`/api/skin-types/${id}`, {
    method: 'PUT',
    data: payload,
  });
}

// =========================
// DELETE
// =========================

export async function deleteSkinType(id: number) {
  return request(`/api/skin-types/${id}`, {
    method: 'DELETE',
  });
}
>>>>>>> origin/main
