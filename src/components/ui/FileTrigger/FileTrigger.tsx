import { FileTrigger as RACFileTrigger } from "react-aria-components";
import "./FileTrigger.css";

interface FileTriggerProps extends React.ComponentProps<
  typeof RACFileTrigger
> {}

export function FileTrigger(props: FileTriggerProps) {
  return <RACFileTrigger {...props} />;
}
