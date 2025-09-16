"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const BookAppointment = () => {
  const [step, setStep] = useState<"button" | "calendar" | "waiting">("button");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const today = new Date();
  const toDate = new Date(new Date().setFullYear(today.getFullYear() + 1));

  const handleClick = () => {
    setStep("calendar");
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
    if (selectedDate) {
      setStep("waiting");
    }
  };

  const handleCancel = () => {
    setStep("button");
    setDate(undefined);
    setOpen(false);
  };

  // Initial button state
  if (step === "button") {
    return (
      <button
        onClick={handleClick}
        className="cursor-pointer p-4 rounded-xl text-white bg-green-500 hover:opacity-90 flex flex-col items-start w-full"
      >
        <CalendarIcon className="w-6 h-6 mb-2" />
        <span className="font-medium">Цаг захиалах</span>
      </button>
    );
  }

  if (step === "waiting") {
    return (
      <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 flex flex-col items-start w-full">
        <div className="flex items-center mb-2 mt-auto">
          <CalendarIcon className="w-5 h-5 mr-2 text-yellow-600" />
          <span className="font-medium text-yellow-800">Сэтгэлзүйчийн хариуг хүлээж байна...</span>
        </div>

        <div className="flex justify-between  items-center w-full">
          <p className="text-sm text-yellow-700  ">Таны сонгосон огноо: {date?.toLocaleDateString("mn-MN")}</p>
          <button
            onClick={handleCancel}
            className="text-xs bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition-colors"
          >
            Цуцлах
          </button>
        </div>
      </div>
    );
  }

  // Calendar selection state
  return (
    <div className="p-3 rounded-xl bg-green-500  flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <Label htmlFor="date" className="text-white font-medium text-[16px]">
          Боломжтой өдөрөө сонгоно уу!
        </Label>
        <button
          onClick={handleCancel}
          className="text-xs border rounded-full size-5 text-white font-bold hover:bg-white hover:text-green-500"
        >
          ✕
        </button>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-full justify-between font-medium bg-green-100 h-8">
            {date ? date.toLocaleDateString("mn-MN") : "Огноо сонгох"}
            <ChevronDownIcon className="size-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            fromYear={today.getFullYear()}
            toYear={toDate.getFullYear()}
          />
        </PopoverContent>
      </Popover>
      {date && <p className="text-xs text-green-600">Сонгосон огноо: {date.toLocaleDateString("mn-MN")}</p>}
    </div>
  );
};

export default BookAppointment;
