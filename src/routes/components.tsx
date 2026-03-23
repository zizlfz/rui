import { createFileRoute } from "@tanstack/react-router";
import { DemosPage } from "#/components/DemosPage";

export const Route = createFileRoute("/components")({
	component: DemosPage,
});
