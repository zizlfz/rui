import type {
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabProps,
  TabsProps,
} from "react-aria-components";
import {
  composeRenderProps,
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  TabPanels as RACTabPanels,
  Tabs as RACTabs,
  SelectionIndicator,
} from "react-aria-components";

import "./Tabs.css";
import { cn } from "#/utils/classname";

export function Tabs({ className, ...props }: TabsProps) {
  return <RACTabs {...props} className={cn("tabs", className)} />;
}

export function TabList<T extends object>({
  className,
  ...props
}: TabListProps<T>) {
  return <RACTabList {...props} className={cn("tab-list", className)} />;
}

export function Tab({ className, ...props }: TabProps) {
  return (
    <RACTab {...props} className={cn("tab-item", className)}>
      {composeRenderProps(props.children, (children) => (
        <>
          <span className="tab-text">{children}</span>
          <SelectionIndicator className="tab-indicator" />
        </>
      ))}
    </RACTab>
  );
}

export function TabPanels<T extends object>({
  className,
  ...props
}: TabPanelsProps<T>) {
  return <RACTabPanels {...props} className={cn("tab-panels", className)} />;
}

export function TabPanel({ className, ...props }: TabPanelProps) {
  return <RACTabPanel {...props} className={cn("tab-panel", className)} />;
}
