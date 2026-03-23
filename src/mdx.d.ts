declare module "*.mdx" {
	import type { ComponentType } from "react";

	interface MDXComponentProps {
		components?: Record<string, ComponentType<any>>;
	}

	const MDXComponent: ComponentType<MDXComponentProps>;
	export default MDXComponent;
}
