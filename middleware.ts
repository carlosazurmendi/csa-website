import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Run on all routes EXCEPT:
     *  - /admin and /api  → Payload owns its own auth there; Supabase must not intercept
     *  - Next static assets and common media file extensions
     */
    '/((?!admin|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|ico)$).*)',
  ],
}
