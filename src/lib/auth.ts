import { betterAuth } from 'better-auth';
import { createAuthMiddleware, APIError } from "better-auth/api";
import { prismaAdapter } from 'better-auth/adapters/prisma';
// ou le chemin approprié
import { PrismaClient } from '@/generated/prisma';


const prisma = new PrismaClient();

export const auth = betterAuth({
    user: {
        additionalFields: {
            role: { type: 'string', required: true },
            phone: { type: 'string', required: false },
            position: { type: 'string', required: false },
            provence: { type: 'string', required: false },
        },
    },
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            // accessType: "offline", // c'est pour le consentement de l'utilisateur
            // prompt: "select_account consent", 
            disableSignUp: true, // Empêche la création automatique de comptes via Google
        },
    },
    account: {
        accountLinking: {
            enabled: true,
            allowDifferentEmails: false,
        },
    },
    hooks: {
        // Hook BEFORE pour vérifier la connexion email/password
        before: createAuthMiddleware(async (ctx) => {

            // Vérification pour inscription email/password
            if (ctx.path === "/sign-up/email" && ctx.method === "POST") {
                // Vérifier si la requête vient de votre API (par exemple via un header spécial)
                const isAdminAPI = ctx.headers?.get('authorization') === process.env.API_ROUTE_SECRET;
                if (!isAdminAPI) {
                    throw new APIError("FORBIDDEN", {
                        message: "Inscription fermée — contactez l'administrateur.",
                    });
                }
            }
            // Vérification pour connexion email/password
            if (ctx.path === "/sign-in/email" && ctx.method === "POST") {
                const email = ctx.body?.email;
                if (!email) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Email requis",
                    });
                }

                const userExists = await prisma.user.findUnique({
                    where: { email }
                });

                if (!userExists) {
                    throw new APIError("FORBIDDEN", {
                        message: "Email non autorisé — contactez l'administrateur.",
                    });
                }
            }
        }),
    },
});


export type Session = typeof auth.$Infer.Session