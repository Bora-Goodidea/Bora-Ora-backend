declare global {
    namespace Express {
        interface Locals {
            user: {
                localToken: string;
                uid: string;
                user_id: number | null;
                email: string;
                level: string;
            };
        }
    }
}
