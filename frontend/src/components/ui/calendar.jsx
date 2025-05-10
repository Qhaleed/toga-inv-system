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
        "p-6 w-96 h-96 max-w-xs mx-auto flex items-center justify-center overflow-hidden border-none shadow-none" // Center horizontally and vertically
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row gap-2 bg-transparent w-full max-w-xs mx-auto overflow-hidden border-none shadow-none",
        month:
          "flex flex-col gap-4 bg-transparent w-full max-w-xs mx-auto border-none shadow-none",
        caption:
          "flex  pt-1 relative items-center w-full bg-transparent border-none shadow-none",
        caption_label: "text-mmd font-extrabold ",
        nav: "flex items-center gap-1 bg-green border-none shadow-none",
        nav_button: cn(
          buttonVariants({ variant: "destructive" }),
          "size-6 bg-[#0C7E48] p-2 opacity-100 hover:opacity-60 text-clr border-none shadow-none"
        ),
        nav_button_previous:
          "absolute right-10 !bg-[#0C7E48] text-clr border-none shadow-none",
        nav_button_next:
          "absolute right-0 !bg-[#0C7E48] text-clr border-none shadow-none ",
        table:
          "w-full border-collapse bg-transparent overflow-hidden border-none shadow-none",
        head_row: "flex bg-transparent w-full border-none shadow-none",
        head_cell:
          "text-white rounded-xl w-full font-normal text-[0.8rem] bg-transparent border-none shadow-none",
        row: "flex w-full mt-3 bg-transparent overflow-hidden gap-[1px] border-none shadow-none",
        cell: cn(
          "relative p-0 text-center text-sm flex items-center justify-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent [&:has([aria-selected].day-range-end)]:rounded-r-md overflow-hidden w-full border-none shadow-none",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md border-none shadow-none"
            : "[&:has([aria-selected])]:rounded-sm bg-transparent border-none shadow-none"
        ),
        day: cn(
          "inline-flex items-center justify-center px-2 py-1.5 rounded-full font-thin aria-selected:opacity-100 bg-transparent text-white transition-colors duration-150 hover:bg-white/20 focus:bg-white/20 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-transparent aria-selected:text-yellow-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none",
        day_range_end:
          "day-range-end aria-selected:bg-transparent aria-selected:text-yellow-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none",
        day_selected:
          "bg-yellow-500 rounded-full  !text-black font-extrabold hover:bg-yellow-500 focus:bg-yellow-500 border-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none",
        day_today:
          "bg-yellow-500 text-black font-extrabold rounded-full px-3 py-1.5 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 !text-black border-none shadow-none",
        day_outside:
          "day-outside rounded-full text-black aria-selected:black opacity-20 cursor-default focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none",
        day_disabled:
          "text-gray-700 opacity-50 bg-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none",
        day_range_middle:
          "aria-selected:bg-transparent aria-selected:text-yellow-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none",
        day_hidden:
          "invisible bg-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none shadow-none",
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
