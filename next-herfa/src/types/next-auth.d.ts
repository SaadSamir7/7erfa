import "next-auth";
import "next-auth/jwt";
import { IUser } from "./user";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user?: IUser;
    }

    interface User extends IUser {
        token?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        user?: IUser;
    }
}
