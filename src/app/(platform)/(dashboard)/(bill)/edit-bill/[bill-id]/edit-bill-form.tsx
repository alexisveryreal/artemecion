"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { toast } from "sonner";
import { type z } from "zod";

import { editBillAction } from "@/actions/edit-bill";
import { EditBill } from "@/actions/edit-bill/schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface EditBillFormProps {
  prevValues: z.infer<typeof EditBill>;
}

export const EditBillForm = ({ prevValues }: EditBillFormProps) => {
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    editBillAction,
    zodResolver(EditBill),
    {
      actionProps: {
        onSuccess() {
          toast.success("Success", {
            description: "Bill updated successfully",
          });
        },
        onError() {
          toast.error("Error", {
            description: "An error occured lol",
          });
        },
      },
      formProps: {
        defaultValues: {
          ...prevValues,
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmitWithAction}>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  The amount of this specified bill
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bill Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="OneTime" />
                    </FormControl>
                    <FormLabel className="font-normal">One Time</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="Recurring" />
                    </FormControl>
                    <FormLabel className="font-normal">Recurring</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Please include https://</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bill Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  What day was this bill/will be paid
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            disabled={action.isPending}
            type="button"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button disabled={action.isPending} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
