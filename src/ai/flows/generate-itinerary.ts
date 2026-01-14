'use server';
/**
 * @fileOverview An AI agent for generating travel itineraries.
 *
 * - getItinerary - A function that generates a travel itinerary.
 * - ItineraryInput - The input type for the getItinerary function.
 * - Itinerary - The return type for the getItinerary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ItineraryInputSchema = z.object({
  destination: z
    .string()
    .describe('The travel destination for which to generate an itinerary.'),
});
export type ItineraryInput = z.infer<typeof ItineraryInputSchema>;

const ActivitySchema = z.object({
  time: z.enum(['Morning', 'Afternoon', 'Evening', 'Night']),
  description: z.string(),
});

const DailyPlanSchema = z.object({
  day: z.number().describe('The day number of the itinerary (e.g., 1).'),
  title: z.string().describe('A catchy title for the day\'s plan.'),
  activities: z
    .array(ActivitySchema)
    .describe('A list of activities for the day.'),
  foodSuggestion: z
    .string()
    .describe(
      'A suggestion for a local dish or restaurant to try on this day.'
    ),
});

const ItinerarySchema = z.object({
  days: z
    .array(DailyPlanSchema)
    .length(5)
    .describe('A 5-day itinerary for the destination.'),
});
export type Itinerary = z.infer<typeof ItinerarySchema>;

export async function getItinerary(input: ItineraryInput): Promise<Itinerary> {
  return generateItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateItineraryPrompt',
  input: { schema: ItineraryInputSchema },
  output: { schema: ItinerarySchema },
  prompt: `You are a world-class travel planner.
  
  Generate a detailed, exciting, and practical 5-day travel itinerary for the following destination: {{{destination}}}.

  For each day, provide a title, a list of activities (for Morning, Afternoon, Evening), and a specific food suggestion (a local dish or type of cuisine).
  
  Make the itinerary realistic and engaging for a typical traveler.`,
});

const generateItineraryFlow = ai.defineFlow(
  {
    name: 'generateItineraryFlow',
    inputSchema: ItineraryInputSchema,
    outputSchema: ItinerarySchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
