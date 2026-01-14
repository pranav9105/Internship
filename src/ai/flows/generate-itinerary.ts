
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
  packageDuration: z
    .string()
    .optional()
    .describe('The duration of the travel package (e.g., "5 Days / 4 Nights"). This is the most important parameter to determine the number of days in the itinerary.'),
  packageFeatures: z
    .array(z.string())
    .optional()
    .describe(
      'A list of key features or activities included in the package (e.g., "Wildlife Safari", "Temple Tours").'
    ),
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
    .describe(
      'An array of daily plans for the itinerary. The length of this array MUST match the number of days specified in the packageDuration input.'
    ),
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
  
  Generate a detailed, exciting, and practical travel itinerary for the following destination: {{{destination}}}.

  The itinerary MUST be for the exact duration of the travel package: {{{packageDuration}}}.
  
  For example, if the duration is "8 Days / 7 Nights", you MUST generate a plan for exactly 8 days. Create a full plan for every single day specified in the duration.
  
  The package may include the following key features, so please prioritize them in your plan:
  {{#each packageFeatures}}
  - {{{this}}}
  {{/each}}

  For each day, provide a title, a list of activities (for Morning, Afternoon, Evening), and a specific food suggestion (a local dish or type of cuisine).
  
  Make the itinerary realistic, engaging, and centered around the provided package features. Ensure the number of days in your output strictly matches the requested duration.`,
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
