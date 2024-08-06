'use server';

import { bind, bindTo, remain } from '@/lib/do';
import { always, pipe, tap } from '@fxts/core';
import { updateUserApi } from '@/lib/api';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const updateUserInfo = async (form: FormData) =>
  pipe(
    form,
    bindTo('form'),
    bind('id', getFromForm('id')),
    bind('name', getFromForm('name')),
    bind('description', getFromForm('description')),
    bind('api', getApi),
    bind('body', getBody),
    bind('method', always('PUT')),
    remain(['api', 'body', 'method']),
    fetchUserInfo,
    tap(() => revalidatePath('/my/settings', 'page')),
    () => redirect('/my'),
  );
const getFromForm =
  (key: string) =>
  ({ form }: { form: FormData }) =>
    (form.get(key) as string) ?? '';
const getApi = ({ id }: { id: string }) => updateUserApi(id);
const getBody = (e: { name: string; description: string }) => pipe(e, remain(['name', 'description']), JSON.stringify);
const fetchUserInfo = ({ api, ...init }: { api: string; body: string; method: string }) => fetch(api, init);
