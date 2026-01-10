'use server';

/**
 * @fileOverview A personalized travel destination recommendation AI agent.
 *
 * - getPersonalizedDestinationRecommendations - A function that retrieves personalized destination recommendations.
 * - PersonalizedDestinationRecommendationsInput - The input type for the getPersonalizedDestinationRecommendations function.
 * - PersonalizedDestinationRecommendationsOutput - The return type for the getPersonalizedDestinationRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDestinationRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  pastInquiries: z.array(z.string()).optional().describe('The user\'s past travel inquiries.'),
  preferences: z.string().optional().describe('The user\'s stated travel preferences.'),
});
export type PersonalizedDestinationRecommendationsInput = z.infer<
  typeof PersonalizedDestinationRecommendationsInputSchema
>;

const PersonalizedDestinationRecommendationsOutputSchema = z.object({
  destinations:
    z.array(z.string())
      .describe('A list of personalized travel destination recommendations.'),
});
export type PersonalizedDestinationRecommendationsOutput = z.infer<
  typeof PersonalizedDestinationRecommendationsOutputSchema
>;

export async function getPersonalizedDestinationRecommendations(
  input: PersonalizedDestinationRecommendationsInput
): Promise<PersonalizedDestinationRecommendationsOutput> {
  return personalizedDestinationRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedDestinationRecommendationsPrompt',
  input: {schema: PersonalizedDestinationRecommendationsInputSchema},
  output: {schema: PersonalizedDestinationRecommendationsOutputSchema},
  prompt: `You are a travel expert providing personalized destination recommendations.\n\n  Based on the user's past travel inquiries: {{{pastInquiries}}}\n  And their stated preferences: {{{preferences}}}\n\n  Recommend destinations that they might enjoy. Return the destinations as a list of strings.`, // Added a more detailed prompt
});

const personalizedDestinationRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedDestinationRecommendationsFlow',
    inputSchema: PersonalizedDestinationRecommendationsInputSchema,
    outputSchema: PersonalizedDestinationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
