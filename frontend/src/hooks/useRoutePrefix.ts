import { useLocation } from "react-router";

export default function useRoutePrefix(): string {
  const { pathname } = useLocation();
  const [maybeRole] = pathname.split("/").filter(Boolean);
  if (maybeRole === "admin" || maybeRole === "salesman") {
    return `/${maybeRole}`;
  }
  return "/admin"; // dashboard root defaults to admin links
}
