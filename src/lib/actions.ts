"use server";

import { z } from "zod";
import { initializeFirebase } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  try {
    const { firestore } = initializeFirebase();
    await addDoc(collection(firestore, "inquiries"), {
      ...validatedFields.data,
      createdAt: serverTimestamp(),
    });
    return { message: "Thank you for your message! We will get back to you soon.", errors: {} };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { message: "An unexpected error occurred. Please try again.", errors: {} };
  }
}
