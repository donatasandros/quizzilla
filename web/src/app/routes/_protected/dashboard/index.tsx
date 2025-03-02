import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return <div>Hello "/_protected/dashboard/"!</div>;
}
