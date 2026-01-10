"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions";
import { AnimateOnScroll } from "../animate-on-scroll";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function Contact() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(submitContactForm, { message: "", errors: {} });
  
  const { register, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

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
          title: "Success",
          description: state.message,
        });
        reset();
      }
    }
  }, [state, toast, reset]);

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll>
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl">Get in Touch</CardTitle>
              <CardDescription>Have questions or ready to book? Send us a message!</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                  {(errors.name || state.errors?.name) && <p className="text-sm text-destructive">{errors.name?.message || state.errors?.name?.[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                   {(errors.email || state.errors?.email) && <p className="text-sm text-destructive">{errors.email?.message || state.errors?.email?.[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" {...register("message")} />
                  {(errors.message || state.errors?.message) && <p className="text-sm text-destructive">{errors.message?.message || state.errors?.message?.[0]}</p>}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
