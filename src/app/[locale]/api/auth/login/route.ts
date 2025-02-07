import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../../../utils/supabase/server";

export const routing = defineRouting({
  locales: ["en", "ka"],
  defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  if (error) {
    console.error("Login error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return redirect({
    href: `/`,
    locale,
  });
}
