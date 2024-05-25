import { auth, signIn } from '@/auth';

export default async function SignIn() {
  return (
    <div>
      <h1>Sign in</h1>
      <form
        action={async () => {
          'use server';
          await signIn('twitter');
        }}
      >
        <button type="submit">Signin with Twitter</button>
      </form>
    </div>
  );
}
