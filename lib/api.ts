import type { GET as GET_USER_API } from '@/app/api/users/[id]/route';
import { API_URL } from '@/lib/constants';

/** {@link GET_USER_API GET USER API} */
export const getUserApi = (id: string) => `${API_URL}/api/users/${id}`;
export const updateUserApi = (id: string) => `${API_URL}/api/users/${id}`;
