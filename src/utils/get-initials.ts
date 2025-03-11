export function getInitials(name: string): string {
  if (!name.trim()) return "";

  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return (words[0][0] + words[0][1]).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}
