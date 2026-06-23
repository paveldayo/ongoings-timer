import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
const Auth = NextAuth({ providers: [ GitHub ] })

export default Auth 