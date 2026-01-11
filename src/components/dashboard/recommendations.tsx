"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from 'firebase/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getPersonalizedDestinationRecommendations } from '@/ai/flows/personalized-destination-recommendations';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { AnimateOnScroll } from '../animate-on-scroll';
import { Lightbulb, Compass } from 'lucide-react';

const preferencesSchema = z.object({
  preferences: z.string().min(10, "Please describe your preferences in at least 10 characters."),
});

type PreferencesFormValues = z.infer<typeof preferencesSchema>;

interface RecommendationsProps {
  user: User;
}

export function Recommendations({ user }: RecommendationsProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { register, handleSubmit, formState: { errors } } = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
  });

  const onSubmit = async (data: PreferencesFormValues) => {
    setLoading(true);
    setRecommendations([]);
    try {
      // Fetch past inquiries from Firestore
      const inquiriesQuery = query(collection(firestore, 'inquiries'), where('email', '==', user.email));
      const querySnapshot = await getDocs(inquiriesQuery);
      const pastInquiries = querySnapshot.docs.map(doc => doc.data().message as string);

      const result = await getPersonalizedDestinationRecommendations({
        userId: user.uid,
        preferences: data.preferences,
        pastInquiries: pastInquiries,
      });

      if (result.destinations && result.destinations.length > 0) {
        setRecommendations(result.destinations);
      } else {
        toast({ title: 'No recommendations found', description: "We couldn't generate recommendations based on your input. Try being more specific." });
      }

    } catch (error: any) {
      toast({
        title: 'Recommendation Failed',
        description: "An error occurred while generating recommendations.",
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimateOnScroll delay={200}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Lightbulb className="h-6 w-6 text-accent" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Tell us what you&apos;re looking for, and our AI will suggest your next perfect trip.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferences">What are your travel preferences?</Label>
              <Textarea
                id="preferences"
                placeholder="e.g., 'I'm looking for a quiet beach vacation with great food' or 'an adventurous trip with hiking and mountains'."
                {...register('preferences')}
                className="min-h-[100px]"
              />
              {errors.preferences && <p className="text-sm text-destructive">{errors.preferences.message}</p>}
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Get Recommendations'}
            </Button>
          </form>

          {recommendations.length > 0 && (
            <div className="mt-8">
              <h3 className="font-headline text-xl font-bold">Here are your recommendations:</h3>
              <ul className="mt-4 space-y-3">
                {recommendations.map((dest, index) => (
                  <li key={index} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                    <Compass className="h-5 w-5 text-primary" />
                    <span className="font-medium">{dest}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimateOnScroll>
  );
}
