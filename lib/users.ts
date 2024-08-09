import { filter, pipe, prop, toArray } from '@fxts/core';
import type { GET } from '@/app/api/users/[id]/route';
import { fetchDataOrNotFound } from '@/lib/response';
import { KitCardInfo } from '@/types/Kit';
import { getUserApi } from '@/lib/api';
import type { UserData } from '@/types/User';
import { RallyByStarter, RallyStatus } from '@/types/Rally';

/** {@link GET 유저 정보} 요청 후 데이터만 추출, 에러 시 404 */
export const fetchUserInfo = async (id: string): Promise<UserData> =>
  pipe(
    id,
    getUserApi, // /api/users/[id]
    fetchDataOrNotFound<UserData>, // fetch => .json().data
  );

/** {@link GET 유저 정보} 요청 후 키트만 추출 */
export const fetchUserKits = (id: string): Promise<KitCardInfo[]> => pipe(id, fetchUserInfo, prop('kits'));

/** {@link GET 유저 정보} 요청 후 랠리만 추출 */
export const fetchUserRallies = (id: string): Promise<RallyByStarter[]> => pipe(id, fetchUserInfo, prop('rallies'));

type RallyFilter = ReturnType<typeof filter<RallyByStarter[]>>;
const fetchUserFilteredRallies = (filter: RallyFilter) => async (id: string) => pipe(id, fetchUserRallies, filter, toArray);
const filterActive: RallyFilter = filter<RallyByStarter[]>(({ status }: RallyByStarter) => status === RallyStatus.active);
const filterInactive: RallyFilter = filter<RallyByStarter[]>(({ status }: RallyByStarter) => status === RallyStatus.inactive);

/** {@link GET 유저 정보} 요청 후 진행중인 랠리만 추출 */
export const fetchUserActiveRallies = fetchUserFilteredRallies(filterActive);
/** {@link GET 유저 정보} 요청 후 종료된 랠리만 추출 */
export const fetchUserInactiveRallies = fetchUserFilteredRallies(filterInactive);
