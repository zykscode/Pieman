import { AuthForm } from '#/components/auth-form';

export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <AuthForm type="signin" />
    </div>
  );
}
