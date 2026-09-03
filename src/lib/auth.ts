import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vibhav_portfolio_jwt_secret_key_2026_safe_token'
);

export const COOKIE_NAME = 'admin_token';

export interface TokenPayload {
  username: string;
  role: 'ADMIN';
}

export async function signAdminToken(username: string): Promise<string> {
  return await new SignJWT({ username, role: 'ADMIN' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload && payload.role === 'ADMIN') {
      return payload as unknown as TokenPayload;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getAdminSession(): Promise<TokenPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
