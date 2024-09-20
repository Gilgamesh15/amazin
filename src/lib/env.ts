import { z } from "zod";

const envSchema = z.object({
  // General
  DOMAIN_URL: z.string(),

  // Sendgrid
  SENDGRID_API_KEY: z.string(),
  ADMIN_EMAIL: z.string(),

  // Postgres
  POSTGRES_URL: z.string(),
  POSTGRES_PRISMA_URL: z.string(),
  POSTGRES_URL_NO_SSL: z.string(),
  POSTGRES_URL_NON_POOLING: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),

  // Auth
  AUTH_SECRET: z.string(),
  SIGNIN_ERROR_URL: z.string(),

  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),

  //stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(JSON.stringify(env.error.errors));
}

export default env.data;
