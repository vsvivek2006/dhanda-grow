import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: DO NOT use getSession() in middleware because it is spoofable.
  // Instead use getUser() which validates with Supabase auth server.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedPage =
    pathname.startsWith("/admin") || pathname.startsWith("/blog/new");
  const isProtectedApi =
    pathname.startsWith("/api/admin") ||
    pathname === "/api/blog/publish" ||
    pathname === "/api/blog/generate";
  const isLoginPage = pathname === "/login";

  if (isProtectedApi && !user) {
    return NextResponse.json(
      { error: "Unauthorized: Admin session required" },
      { status: 401 }
    );
  }

  if (isProtectedPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // Normalize /admin or /admin/ to /admin/leads
    const targetRedirect =
      pathname === "/admin" || pathname === "/admin/"
        ? "/admin/leads"
        : pathname;
    url.searchParams.set("redirect", targetRedirect);
    return NextResponse.redirect(url);
  }

  // If authenticated user visits /admin directly, redirect to /admin/leads
  if ((pathname === "/admin" || pathname === "/admin/") && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/leads";
    return NextResponse.redirect(url);
  }

  if (isLoginPage && user) {
    const url = request.nextUrl.clone();
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const targetPath =
      !redirectParam || redirectParam === "/admin" || redirectParam === "/admin/"
        ? "/admin/leads"
        : redirectParam;
    url.pathname = targetPath;
    url.searchParams.delete("redirect");
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
