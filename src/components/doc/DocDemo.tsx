import { type ReactNode, useCallback, useState } from "react";
import { Switch } from "#/components/ui/Switch";
import "./DocDemo.css";

type LogFn = (eventName: string) => (...args: unknown[]) => void;

interface PropConfig {
	default: unknown;
	options?: unknown[];
}

interface DocDemoProps {
	children:
		| ReactNode
		| ((
				props: Record<string, unknown>,
				state: Record<string, unknown>,
				setters: Record<string, (value: unknown) => void>,
		  ) => ReactNode);
	eventProps?: (log: LogFn) => Record<string, (...args: unknown[]) => void>;
	props?: Record<string, unknown | PropConfig>;
	propsForm?: Record<string, unknown>;
	state?: Record<string, unknown>;
}

interface LogEntry {
	id: number;
	eventName: string;
	timestamp: string;
}

export function DocDemo({
	children,
	eventProps,
	props: controlledProps,
	propsForm,
	state: initialState,
}: DocDemoProps) {
	const isRenderFn = typeof children === "function";

	// ── Controlled props state ──
	const [propValues, setPropValues] = useState<Record<string, unknown>>(() => {
		const init: Record<string, unknown> = {};
		if (controlledProps) {
			for (const [key, value] of Object.entries(controlledProps)) {
				init[key] =
					typeof value === "object" && value !== null && "default" in value
						? (value as PropConfig).default
						: value;
			}
		}
		return init;
	});

	// ── State management ──
	const [stateValues, setStateValues] = useState<Record<string, unknown>>(
		() => initialState ?? {},
	);

	const setters: Record<string, (value: unknown) => void> = {};
	if (initialState) {
		for (const key of Object.keys(initialState)) {
			setters[`set${key[0].toUpperCase()}${key.slice(1)}`] = (value: unknown) =>
				setStateValues((prev) => ({ ...prev, [key]: value }));
		}
	}

	// ── Event log state ──
	const [logs, setLogs] = useState<LogEntry[]>([]);
	const logCounter = useState(0);

	const log = useCallback(
		(eventName: string) =>
			(..._args: unknown[]) => {
				const now = new Date();
				const timestamp = now.toLocaleTimeString("en-US", {
					hour12: false,
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				});
				logCounter[1]((prev) => {
					const nextId = prev + 1;
					setLogs((prevLogs) => [
						{ id: nextId, eventName, timestamp },
						...prevLogs.slice(0, 49),
					]);
					return nextId;
				});
			},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	// ── Build merged props ──
	const eventHandlers = eventProps ? eventProps(log) : {};
	const mergedProps = { ...propValues, ...eventHandlers };

	// ── Has controls ──
	const hasPropsForm = propsForm && Object.keys(propsForm).length > 0;
	const hasEventLog = !!eventProps;
	const hasControls = hasPropsForm || hasEventLog;

	return (
		<div className="doc-demo">
			<div className="doc-demo__stage">
				{isRenderFn
					? (
							children as (
								props: Record<string, unknown>,
								state: Record<string, unknown>,
								setters: Record<string, (value: unknown) => void>,
							) => ReactNode
						)(mergedProps, stateValues, setters)
					: children}
			</div>

			{hasControls && (
				<div className="doc-demo__controls">
					{hasPropsForm && (
						<div className="doc-demo__props-form">
							{Object.entries(propsForm).map(([key, type]) => (
								<div key={key} className="doc-demo__prop-row">
									<code className="doc-demo__prop-name">{key}</code>
									{type === Boolean ? (
										<Switch
											isSelected={propValues[key] as boolean}
											onChange={(checked) =>
												setPropValues((prev) => ({ ...prev, [key]: checked }))
											}
										>
											{propValues[key] ? "true" : "false"}
										</Switch>
									) : (
										<input
											className="doc-demo__prop-input"
											type="text"
											value={
												propValues[key] != null ? String(propValues[key]) : ""
											}
											onChange={(e) =>
												setPropValues((prev) => ({
													...prev,
													[key]: e.target.value,
												}))
											}
										/>
									)}
								</div>
							))}
						</div>
					)}

					{hasEventLog && (
						<div className="doc-demo__event-log">
							<div className="doc-demo__event-log-header">
								<span className="doc-demo__event-log-title">Event Log</span>
								{logs.length > 0 && (
									<button
										type="button"
										className="doc-demo__clear-btn"
										onClick={() => {
											setLogs([]);
											logCounter[1](0);
										}}
									>
										Clear
									</button>
								)}
							</div>
							<div className="doc-demo__event-log-body">
								{logs.length === 0 ? (
									<span className="doc-demo__event-log-empty">
										Interact with the component to see events.
									</span>
								) : (
									logs.map((entry) => (
										<div key={entry.id} className="doc-demo__log-entry">
											<span className="doc-demo__log-time">
												{entry.timestamp}
											</span>
											<span className="doc-demo__log-name">
												{entry.eventName}
											</span>
										</div>
									))
								)}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
