import type { ComponentType } from "react";
import { DocAlert } from "./DocAlert";
import { DocApiTable, DocApiTableRow } from "./DocApiTable";
import { DocCode } from "./DocCode";
import { DocDemo } from "./DocDemo";

export { DocAlert } from "./DocAlert";
export { DocApiTable, DocApiTableRow } from "./DocApiTable";
export { DocCode } from "./DocCode";
export { DocDemo } from "./DocDemo";

// Required by @mdx-js/rollup when providerImportSource is set.
// Returns the map of component names available inside MDX files.
export function useMDXComponents(): Record<string, ComponentType<any>> {
	return {
		DocDemo,
		DocCode,
		DocApiTable,
		DocApiTableRow,
		DocAlert,
	};
}
