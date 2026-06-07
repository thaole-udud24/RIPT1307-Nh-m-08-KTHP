import { history } from 'umi';
import '@/styles/global.less';

export function layout(props: any) {
  if (props?.location?.pathname?.startsWith('/auth')) {

import '@/styles/admin.less';

export function layout(props: any) {
  const pathname = props?.location?.pathname || '';

import '@/styles/admin.less';

// =========================
// LAYOUT
// =========================

export function layout(props: any) {
  const pathname =
    props?.location?.pathname || '';

  // Auth và Admin tự dùng layout riêng

  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/admin')
  ) {

    return {
      layout: false,
    };
  }

  return {};
}



  return {};
}

// =========================
// INITIAL STATE
// =========================


export interface InitialState {
  user?: {
    id: number;
    email: string;
    name?: string;
  } | null;
}

export async function getInitialState(): Promise<InitialState> {
  return {
    user: null,
  };
}


export function onRouteChange({ location }: any) {
  const token = localStorage.getItem('token');

  const isAuthPage = location.pathname.startsWith('/auth');

  if (!token && !isAuthPage) {
    history.push('/auth/login');
  }
}

// =========================
// ROUTE GUARD
// =========================

export function onRouteChange({
  location,
}: any) {
  const pathname =
    location.pathname;

  const token =
    localStorage.getItem('token');

  const isAuthPage =
    pathname.startsWith('/auth');

  const isAdminPage =
    pathname.startsWith('/admin');

  // Chưa đăng nhập
  // Chỉ chặn trang admin
  if (!token && isAdminPage) {
    history.replace('/auth/login');
    return;
  }

  // Đã đăng nhập
  // Không cho quay lại login/register
  if (token && isAuthPage) {
    history.replace(
      '/admin/dashboard',
    );
  }
}
