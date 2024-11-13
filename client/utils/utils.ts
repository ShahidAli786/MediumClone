// min,hrs ,days,years ago

export function formatDate(date: Date): string {
  const diff = new Date().getTime() - date.getTime();
  if (diff < 1000) {
    return "just now";
  }
  if (diff < 60000) {
    return Math.floor(diff / 1000) + "s ago";
  }
  if (diff < 3600000) {
    return Math.floor(diff / 60000) + "m ago";
  }
  if (diff < 86400000) {
    return Math.floor(diff / 3600000) + "h ago";
  }
  if (diff < 31536000000) {
    return Math.floor(diff / 86400000) + "d ago";
  }
  return Math.floor(diff / 31536000000) + "y ago";
}
