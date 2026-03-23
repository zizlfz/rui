import {
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb as RACBreadcrumb,
  Link,
} from "react-aria-components";
import type {
  BreadcrumbsProps,
  BreadcrumbProps,
  LinkProps,
} from "react-aria-components";
import { ChevronRight } from "lucide-react";
import "./Breadcrumbs.css";
import { cn } from "#/utils/classname";

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return (
    <RACBreadcrumbs {...props} className={cn("breadcrumbs", props.className)} />
  );
}

export function Breadcrumb(
  props: BreadcrumbProps & Omit<LinkProps, "className">,
) {
  return (
    <RACBreadcrumb {...props} className="breadcrumb">
      {({ isCurrent }) => (
        <>
          <Link {...props} className="breadcrumb-link" />
          {!isCurrent && (
            <span className="breadcrumb-separator" aria-hidden="true">
              <ChevronRight />
            </span>
          )}
        </>
      )}
    </RACBreadcrumb>
  );
}
