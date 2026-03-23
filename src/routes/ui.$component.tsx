import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui/$component")({
  component: RouteComponent,
});

function RouteComponent() {
  const { component } = Route.useParams();
  return <div>/ui/{component}</div>;
}
