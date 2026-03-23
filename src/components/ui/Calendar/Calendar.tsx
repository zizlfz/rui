"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  type CalendarProps as AriaCalendarProps,
  RangeCalendar as AriaRangeCalendar,
  type RangeCalendarProps as AriaRangeCalendarProps,
  Button,
  type CalendarCellProps,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  type DateValue,
  Heading,
} from "react-aria-components";
import { cn } from "#/utils/classname";

import "./Calendar.css";

export {
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
};

export const CalendarCell = AriaCalendarCell;

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
      <Header />
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
              <span className="calendar-cell-button">{date.day}</span>
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  );
}

export interface RangeCalendarProps<
  T extends DateValue,
> extends AriaRangeCalendarProps<T> {
  className?: string;
}

export function RangeCalendar<T extends DateValue>({
  className,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar {...props} className={cn("range-calendar", className)}>
      <Header />
      <CalendarGrid className="calendar-grid">
        <CalendarGridHeader>
          {(dayName) => (
            <CalendarHeaderCell className="calendar-header-cell">
              {dayName}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <RangeCalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaRangeCalendar>
  );
}

function Header() {
  return (
    <header className="calendar-header">
      <Button slot="previous" className="calendar-nav-button">
        <ChevronLeft aria-hidden className="calendar-nav-icon" />
      </Button>
      <Heading className="calendar-heading" />
      <Button slot="next" className="calendar-nav-button">
        <ChevronRight aria-hidden className="calendar-nav-icon" />
      </Button>
    </header>
  );
}

function RangeCalendarCell(props: CalendarCellProps) {
  return (
    <AriaCalendarCell {...props} className="range-calendar-cell">
      {({ formattedDate }) => (
        <span className="calendar-cell-button">{formattedDate}</span>
      )}
    </AriaCalendarCell>
  );
}
