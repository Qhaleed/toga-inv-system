import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  // Get today's date (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If a selected day is not provided, always select today
  let selected = props.selected;
  if (!selected) {
    selected = today;
  }

  // Always highlight today, even if another day is selected
  // If selected is an array (range/multiple), add today if not present
  if (Array.isArray(selected)) {
    const hasToday = selected.some(
      (d) => d && new Date(d).setHours(0, 0, 0, 0) === today.getTime()
    );
    if (!hasToday) selected = [...selected, today];
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      selected={selected}
      className={cn(
        "p-6 w-full max-w-xs mx-auto overflow-hidden py-5",
        className
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row gap-2 bg-transparent w-full max-w-xs mx-auto overflow-hidden",
        month: "flex flex-col gap-4 bg-transparent w-full max-w-xs mx-auto",
        caption:
          "flex justify-center pt-1 relative items-center w-full bg-transparent",
        caption_label: "text-sm font-medium text-white",
        nav: "flex items-center gap-1 bg-green",
        nav_button: cn(
          buttonVariants({ variant: "default" }),
          "size-6  text-white p-2 opacity-100 hover:opacity-60 "
        ),
        nav_button_previous: "absolute right-10",
        nav_button_next: "absolute right-0 ",
        table: "w-full border-collapse bg-transparent overflow-hidden",
        head_row: "flex bg-transparent w-full",
        head_cell:
          "text-white rounded-xl w-full font-normal text-[0.8rem] bg-transparent",
        row: "flex w-full mt-3 bg-transparent overflow-hidden gap-[1px]",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent [&:has([aria-selected].day-range-end)]:rounded-r-md overflow-hidden w-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-sm bg-transparent"
        ),
        day: cn(
          "size-8 p-0 font-normal aria-selected:opacity-100 bg-transparent text-white w-full hover:text-yellow-400 hover:bg-white/20"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-transparent aria-selected:text-yellow-400",
        day_range_end:
          "day-range-end aria-selected:bg-transparent aria-selected:text-yellow-400",
        day_selected:
          "bg-Blcack text-white font-extrabold hover:bg-yellow-300 hover:text-white focus:bg-yellow-300 focus:text-white border-none outline-none ring-0",
        day_today: " text-black font-extrabold hover:bg-[#EDB427]",
        day_outside:
          "day-outside text-gray-500 aria-selected:text-gray-500 bg-transparent",
        day_disabled: "text-gray-700 opacity-50 bg-transparent",
        day_range_middle:
          "aria-selected:bg-transparent aria-selected:text-yellow-400",
        day_hidden: "invisible bg-transparent",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn("size-4 text-white", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("size-4 text-white", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
