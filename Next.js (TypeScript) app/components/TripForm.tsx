"use client";

import { useRouter } from "next/navigation";
import { Trip } from "../lib/api";
import { useForm, FieldValues, Control, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { MapPin, Calendar, DollarSign, Briefcase } from "lucide-react";

interface TripFormProps {
  initialData?: Trip;
  onSubmit: (data: Omit<Trip, "_id" | "createdAt">) => Promise<void>;
}

// Define the form schema with zod
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  destination: z.string().min(2, { message: "Destination must be at least 2 characters" }),
  days: z.coerce.number().min(1, { message: "Trip must be at least 1 day" }),
  budget: z.coerce.number().min(0, { message: "Budget must be a positive number" }),
});

// Define the form type
type FormValues = z.infer<typeof formSchema>;

export default function TripForm({ initialData, onSubmit }: TripFormProps) {
  const router = useRouter();
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      title: initialData?.title || "",
      destination: initialData?.destination || "",
      days: initialData?.days || 1,
      budget: initialData?.budget || 0,
    },
  });

  // Handle form submission
  const onSubmitForm = (values: FormValues) => {
    toast.promise(
      async () => {
        await onSubmit(values);
        return values;
      },
      {
        loading: "Saving trip...",
        success: (data) => {
          router.push("/dashboard");
          return "Trip saved successfully!";
        },
        error: "Error saving trip.",
      }
    );
  };

  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-70"></div>
      <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-70"></div>
      
      <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmitForm)(e);
          }} className="space-y-6 relative z-10">
            <FormField
                control={form.control}
                name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    </div>
                    Trip Title
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Summer Vacation" 
                      {...field} 
                      className="focus-visible:ring-blue-500 transition-all duration-300 border-gray-200 focus-visible:border-blue-500 rounded-xl py-6 px-4 shadow-sm hover:shadow-md"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 ml-8">
                    Give your trip a memorable name
                  </FormDescription>
                  <FormMessage className="text-red-500 text-xs ml-8" />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="destination"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                    <div className="bg-indigo-100 p-1.5 rounded-full">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                    </div>
                    Destination
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Paris, France" 
                      {...field} 
                      className="focus-visible:ring-indigo-500 transition-all duration-300 border-gray-200 focus-visible:border-indigo-500 rounded-xl py-6 px-4 shadow-sm hover:shadow-md"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 ml-8">
                    Where are you planning to go?
                  </FormDescription>
                  <FormMessage className="text-red-500 text-xs ml-8" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="days"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      Days
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field} 
                        className="focus-visible:ring-blue-500 transition-all duration-300 border-gray-200 focus-visible:border-blue-500 rounded-xl py-6 px-4 shadow-sm hover:shadow-md"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500 ml-8">
                      Trip duration
                    </FormDescription>
                    <FormMessage className="text-red-500 text-xs ml-8" />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="budget"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                      <div className="bg-indigo-100 p-1.5 rounded-full">
                        <DollarSign className="h-4 w-4 text-indigo-600" />
                      </div>
                      Budget
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01"
                        placeholder="1000.00"
                        {...field} 
                        className="focus-visible:ring-indigo-500 transition-all duration-300 border-gray-200 focus-visible:border-indigo-500 rounded-xl py-6 px-4 shadow-sm hover:shadow-md"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500 ml-8">
                      Estimated cost
                    </FormDescription>
                    <FormMessage className="text-red-500 text-xs ml-8" />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-base">Saving Trip...</span>
                  </>
                ) : (
                  <span className="text-base">{initialData ? "Update Trip" : "Create Trip"}</span>
                )}
              </Button>
              
              <div className="mt-6 text-center text-xs text-gray-500">
                <p>Your trip details are securely stored and can be edited anytime</p>
              </div>
            </div>
          </form>
        </Form>
      </div>
  );
}