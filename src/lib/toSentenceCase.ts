export default function toSentenceCase(str:string) {
  if (!str) return ""; // Handle empty or undefined input
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
