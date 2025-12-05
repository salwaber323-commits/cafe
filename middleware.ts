import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Get the pathname
  const { pathname } = req.nextUrl

  // Skip middleware for non-admin routes and static files
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return res
  }

  // Skip middleware for API routes and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files
  ) {
    return res
  }

  try {
    // Create Supabase client for middleware
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get session from cookies
    const token = req.cookies.get('sb-access-token')?.value
    const refreshToken = req.cookies.get('sb-refresh-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Set session
    const { data: { session }, error: sessionError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: refreshToken || ''
    })

    if (sessionError || !session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    if (profileError || !profile?.is_admin) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}