import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div>
      <div className="flex items-center justify-center gap-4 p-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/auth/login">Log in</Link>
      </div>
    </div>
  );
}
