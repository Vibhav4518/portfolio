import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    let fetchUrl = targetUrl;

    // Handle Google Drive share URLs
    const gdriveMatch = targetUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || targetUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (gdriveMatch && gdriveMatch[1]) {
      const fileId = gdriveMatch[1];
      fetchUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
    }

    const response = await fetch(fetchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      // Fallback attempt for Google Drive alternate export link
      if (gdriveMatch && gdriveMatch[1]) {
        const altFetchUrl = `https://drive.google.com/thumbnail?id=${gdriveMatch[1]}&sz=w1600`;
        const altRes = await fetch(altFetchUrl);
        if (altRes.ok) {
          const contentType = altRes.headers.get('content-type') || 'image/jpeg';
          const arrayBuffer = await altRes.arrayBuffer();
          return new NextResponse(arrayBuffer, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            },
          });
        }
      }
      return new NextResponse('Failed to fetch image', { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Internal Image Proxy Error', { status: 500 });
  }
}
