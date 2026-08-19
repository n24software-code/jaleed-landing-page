import { redirect } from "next/navigation";

/** The landing page lives at /retail-supply; keep a single canonical URL. */
export default function RootPage() {
  redirect("/retail-supply");
}
