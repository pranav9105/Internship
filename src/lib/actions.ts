"use server";

import { z } from "zod";
import { initializeFirebase } from "@/firebase";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
    const { auth } = initializeFirebase();
    const user = auth.currentUser;

    let inquiryRef;
    if (user) {
      // Save to user's subcollection
      inquiryRef = collection(firestore, 'users', user.uid, 'bookingInquiries');
    } else {
      // Save to top-level collection for anonymous users
      inquiryRef = collection(firestore, 'inquiries');
    }
    
    await addDoc(inquiryRef, {
      ...validatedFields.data,
      userId: user ? user.uid : null,
      createdAt: serverTimestamp(),
    });

    return { message: "Thank you for your message! We will get back to you soon.", errors: {} };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { message: "An unexpected error occurred. Please try again.", errors: {} };
  }
}
