/** Safe post-login redirect — client + server safe. */
export function safeAdminNextPath(next: string | null) {
  if (!next || !next.startsWith("/admin") || next.startsWith("//")) return "/admin";
  return next;
}
