import { AuthOptions, CallbacksOptions, DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers/index";

export const AnilistProvider: Provider = {
    id: "anilist",
    name: "Anilist",
    type: "oauth",
    authorization: {
        url: "https://anilist.co/api/v2/oauth/authorize",
        params: { scope: "", response_type: "code" },
    },
    token: "https://anilist.co/api/v2/oauth/token",
    userinfo: `${process.env.NEXTAUTH_URL}/api/anilist/userinfo`,
    clientId: process.env.ANILIST_ID,
    clientSecret: process.env.ANILIST_SECRET,
    profile(profile) {
        const data = {
            id: profile.id,
            name: profile.username,
            email: profile.email,
            image: profile.image_url,
        };
        return data;
    },
}

interface CustomCallbacksOptions extends CallbacksOptions {
    authorized?: (params: { request: any; auth: any }) => boolean;
}

export const authOptions: AuthOptions = {
    providers: [AnilistProvider],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized({ request, auth }) {
            return !!auth?.user;
        }
    }  as CustomCallbacksOptions
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };