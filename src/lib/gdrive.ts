/**
 * Convert Google Drive shareable URLs into direct image CDN/display URLs
 */
export function convertGoogleDriveUrl(url: string | undefined | null): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If it's already an lh3 or direct thumbnail link, return as is
  if (trimmed.includes('lh3.googleusercontent.com') || trimmed.includes('drive.google.com/thumbnail')) {
    return trimmed;
  }

  // Regex patterns for Google Drive link formats:
  // 1. https://drive.google.com/file/d/FILE_ID/view...
  // 2. https://drive.google.com/open?id=FILE_ID
  // 3. https://drive.google.com/uc?id=FILE_ID
  const fileIdMatch = 
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    // High-resolution display thumbnail URL for public Google Drive files
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }

  return trimmed;
}
