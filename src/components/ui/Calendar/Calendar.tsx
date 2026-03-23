"use client";

import {
  Calendar as AriaCalendar,
  type CalendarProps as AriaCalendarProps,
  type DateValue,
  CalendarGrid,
  CalendarCell,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarHeaderCell,
  Heading,
  Button,
} from "react-aria-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "#/utils/classname";

import "./Calendar.css";

export interface CalendarProps<
  T extends DateValue,
> extends AriaCalendarProps<T> {
  className?: string;
}

export function Calendar<T extends DateValue>({
  className,
  ...props
}: CalendarProps<T>) {
  return (
    <AriaCalendar {...props} className={cn("calendar", className)}>
      <header className="calendar-header">
        <Button slot="previous" className="calendar-nav-button">
          <ChevronLeft aria-hidden className="calendar-nav-icon" />
        </Button>
        <Heading className="calendar-heading" />
        <Button slot="next" className="calendar-nav-button">
          <ChevronRight aria-hidden className="calendar-nav-icon" />
        </Button>
      </header>
      <CalendarGrid className="calendar-grid">
        <CalendarGridHeader>
          {(dayName) => (
            <CalendarHeaderCell className="calendar-header-cell">
              {dayName}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => (
            <CalendarCell date={date} className="calendar-cell">
              {date.day}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  );
}
