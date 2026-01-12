
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { useUser } from "@/firebase";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  feedbackType: z.string().min(1, "Please select a feedback type."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Submitting..." : "Submit Feedback"}
    </Button>
  );
}

export default function FeedbackPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitContactForm, { message: "", errors: {} });
  const { user } = useUser();

  const { register, reset, setValue, formState: { errors } } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  useEffect(() => {
    if (state.message) {
      if (Object.keys(state.errors).length > 0 || state.message.includes("error")) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Feedback Submitted!",
          description: state.message,
        });
        reset({ message: '', feedbackType: '' });
      }
    }
  }, [state, toast, reset]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12 md:px-6 flex items-center justify-center">
            <AnimateOnScroll className="w-full max-w-2xl">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="font-headline text-4xl">Submit Your Feedback</CardTitle>
                  <CardDescription>We value your opinion. Let us know how we can improve.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={formAction} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name")} name="name" readOnly={!!user} />
                        {(errors.name || state.errors?.name) && <p className="text-sm text-destructive">{errors.name?.message || state.errors?.name?.[0]}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} name="email" readOnly={!!user} />
                        {(errors.email || state.errors?.email) && <p className="text-sm text-destructive">{errors.email?.message || state.errors?.email?.[0]}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedbackType">Feedback Type</Label>
                      <Select name="feedbackType" onValueChange={(value) => setValue('feedbackType', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="general">General Feedback</SelectItem>
                            <SelectItem value="bug">Report a Bug</SelectItem>
                            <SelectItem value="suggestion">Feature Suggestion</SelectItem>
                            <SelectItem value="compliment">Compliment</SelectItem>
                        </SelectContent>
                      </Select>
                      {(errors.feedbackType || state.errors?.feedbackType) && <p className="text-sm text-destructive">{errors.feedbackType?.message || state.errors?.feedbackType?.[0]}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" {...register("message")} name="message" placeholder="Tell us more..." className="min-h-[120px]" />
                      {(errors.message || state.errors?.message) && <p className="text-sm text-destructive">{errors.message?.message || state.errors?.message?.[0]}</p>}
                    </div>
                    <SubmitButton />
                  </form>
                </CardContent>
              </Card>
            </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </div>
  );
}
