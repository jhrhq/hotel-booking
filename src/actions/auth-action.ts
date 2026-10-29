"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { actionCreator } from "@/actions/action-creator";
import { AUTH_CONFIG } from "@/constants/auth.constants";
import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/validations/auth.schema";

export const signInAction = actionCreator(signInSchema, async (data) => {
  await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
    },
    headers: await headers(),
  });

  redirect(AUTH_CONFIG.ROUTES.HOME);
});

export const signUpAction = actionCreator(signUpSchema, async (data) => {
  await auth.api.signUpEmail({
    body: {
      name: data.username,
      email: data.email,
      password: data.password,
      image: "https://unsplash.com/illustrations/a-cartoon-man-wearing-glasses-with-flowers-0Ae12IY3IY0",
    },
    headers: await headers(),
  });

  redirect(AUTH_CONFIG.ROUTES.HOME);
});
