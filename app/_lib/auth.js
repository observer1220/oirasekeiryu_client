import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // 這裡的 auth 就是 session 也就是 user 資料
    authorized({ auth, request }) {
      // 如果有取得 user 資料就回傳 true 否則回傳 false
      return auth?.user ? true : false;
    },
    async signIn({ user, account, profile }) {
      try {
        // 第一次登入時確認 guest table 沒有重複的 email 則新增使用者
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
