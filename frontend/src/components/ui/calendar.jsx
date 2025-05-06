import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
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
        nav: "flex items-center gap-1 bg-transparent",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-yellow-400 border-gray-200"
        ),
        nav_button_previous: "absolute left-5",
        nav_button_next: "absolute right-5",
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
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 bg-transparent text-white w-full"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-transparent aria-selected:text-yellow-400",
        day_range_end:
          "day-range-end aria-selected:bg-transparent aria-selected:text-yellow-400",
        day_selected:
          "bg-transparent text-yellow-400 hover:bg-transparent hover:text-yellow-400 focus:bg-transparent focus:text-yellow-400 border border-yellow-400",
        day_today: "bg-transparent text-yellow-400 border border-yellow-400",
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
            className={cn("size-4 text-yellow-400", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("size-4 text-yellow-400", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
