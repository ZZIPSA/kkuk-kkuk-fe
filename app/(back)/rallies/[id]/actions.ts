'use server';

export const extendRally = async (form: FormData) => {
  const id = form.get('id');
  console.log(`Rally ${id} extended`);
};
