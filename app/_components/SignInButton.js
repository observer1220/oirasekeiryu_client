import { signInAction } from "../_lib/actions";

function SignInButton() {
  // 維持 Server Component 狀態，因此不能在 <button> 元素使用 onClick 事件
  // 透過 form 表單的 action 屬性，觸發 server action 而不能直接觸發 auth.js 裡的 signIn 方法
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
