import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/creator/")({
  component: CreatorPage,
});

function CreatorPage() {
  return <div>Hello "/_protected/creator/"!</div>;
}
