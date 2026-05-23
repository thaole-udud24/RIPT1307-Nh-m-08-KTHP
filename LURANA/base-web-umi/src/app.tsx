import { history } from 'umi';
import '@/styles/global.less';
<<<<<<< HEAD

export function layout(props: any) {
  if (props?.location?.pathname?.startsWith('/auth')) {
=======
import '@/styles/admin.less';

export function layout(props: any) {
  const pathname = props?.location?.pathname || '';

  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/admin')
  ) {
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
    return {
      layout: false,
    };
  }
<<<<<<< HEAD
=======

>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
  return {};
}

export interface InitialState {
  user?: {
    id: number;
    email: string;
    name?: string;
  } | null; 
}

// Umi sẽ dùng cái này làm global state
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
