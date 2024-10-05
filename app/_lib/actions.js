"use server";

import { signIn, signOut } from "./auth";

// 這個 action 會在 SignInButton 元件的 form 表單觸發
// 只在 server 端執行，因此不需要擔心 CSRF 攻擊，也不需擔心資料外洩至客戶端
export async function signInAction() {
  // 成功登入 Google 後，導向 "/account" 頁面
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
