export function deriveNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return 'Estratega';
  }

  const localPart = email.split('@')[0].trim();
  if (!localPart) {
    return 'Estratega';
  }

  // Remove numbers from the end or middle
  const withoutTrailingNumbers = localPart.replace(/[0-9]+$/g, '');
  
  // Split by common delimiters: dot, underscore, hyphen, plus
  const parts = withoutTrailingNumbers.split(/[._\-+]/).filter(Boolean);
  
  const rawName = parts.length > 0 ? parts[0] : localPart;
  // Clean any remaining non-letters if possible
  const cleaned = rawName.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');

  const finalName = cleaned || rawName;

  if (finalName.length === 0) {
    return 'Estratega';
  }

  // Capitalize first letter, lowercase rest
  return finalName.charAt(0).toUpperCase() + finalName.slice(1).toLowerCase();
}
