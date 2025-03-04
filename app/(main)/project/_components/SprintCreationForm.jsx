"use client";
import { createSprints } from "@/action/sprints";
import { sprintSchema } from "@/app/lib/validator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useFetch from "@/Hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const SprintCreationForm = ({
  projectTitle,
  projectId,
  projectKey,
  sprintKey,
}) => {
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });

  const{loader: createSprintLoader, fn:createSprintsFn}=useFetch(createSprints)

  const onSubmitSprint= async(data) =>{
    await createSprintsFn(projectId,{
        ...data,
        startDate: dateRange.from,
        endDate: dateRange.to
    });
    setShowForm(false)
    toast.success("Sprint Created Successfully")
    router.refresh();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey} - ${sprintKey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {projectTitle}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "destructive" : "default"}
        >
          {showForm ? "Cancel" : "Create New Sprint"}
        </Button>
      </div>

      {showForm && (
        <Card className="pt-4 mb-4">
          <CardContent>
            <form 
            onSubmit={handleSubmit(onSubmitSprint)}
            className="flex gap-4 items-end">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block font-medium text-sm mb-1"
                >
                  Sprint Name
                </label>
                <Input
                  id="name"
                  readOnly
                  className="bg-slate-950"
                  {...register("name")}
                />
                {errors && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block font-medium text-sm mb-1"
                >
                  Sprint Duration
                </label>

                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => {
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal bg-slate-950 ${
                              !dateRange && "text-muted-foreground"
                            }`}
                          >
                            <Calendar1Icon className="mr-2 h-4 w-4" />
                            {dateRange?.from && dateRange?.to ? (
                              format(dateRange?.from, "LLL dd, y") +
                              " - " +
                              format(dateRange?.to, "LLL dd, y")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto bg-slate-950"
                          align="start"
                        >
                          <DayPicker
                            mode="range"
                            selected={dateRange}
                            onSelect={(range) => {
                              if (range?.from && range?.to) {
                                setDateRange(range);
                                field.onChange(range);
                              }
                            }}
                            classNames={{
                              chevron: "fill-blue-500",
                              range_start: "bg-e-700",
                              range_end: "bg-blue-700",
                              range_middle: "bg-blue-400",
                              day_button: "border-none",
                              today: "border-2 border-blue-700",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
              </div>
            <Button type="submit" disabled={createSprintLoader}>{createSprintLoader? "Creating..." :"Create Sprint"}</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SprintCreationForm;
