import { NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '../../../../../lib/auth';
import { getDatabaseAsync } from '../../../../../lib/db';

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/admin/login?error=${encodeURIComponent(error || 'Google login cancelled')}`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      `${baseUrl}/admin/login?error=${encodeURIComponent(
        'Google Client Credentials missing on server. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Vercel project environment settings.'
      )}`
    );
  }

  try {
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    // 1. Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Google Token Exchange Error:', tokenData);
      return NextResponse.redirect(
        `${baseUrl}/admin/login?error=${encodeURIComponent(
          `Google OAuth Error: ${tokenData.error_description || tokenData.error || 'Failed code exchange'}`
        )}`
      );
    }

    // 2. Fetch user profile from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();

    if (!googleUser || !googleUser.email) {
      return NextResponse.redirect(
        `${baseUrl}/admin/login?error=${encodeURIComponent('Unable to retrieve Google account email profile.')}`
      );
    }

    const googleEmail = googleUser.email.trim().toLowerCase();

    // 3. Strict Whitelist Check against DB Admin Email
    const db = await getDatabaseAsync();
    const registeredAdminEmail = (
      db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com'
    ).trim().toLowerCase();

    if (googleEmail !== registeredAdminEmail) {
      return NextResponse.redirect(
        `${baseUrl}/admin/login?error=${encodeURIComponent(
          `Unauthorized Google Account (${googleEmail}). Access is strictly restricted to registered admin email: ${registeredAdminEmail}`
        )}`
      );
    }

    // 4. Issue Admin JWT Cookie and Redirect to /admin
    const token = await signAdminToken(registeredAdminEmail);
    const response = NextResponse.redirect(`${baseUrl}/admin`);

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Google Callback Error:', err);
    return NextResponse.redirect(
      `${baseUrl}/admin/login?error=${encodeURIComponent('Server error during Google authentication.')}`
    );
  }
}
