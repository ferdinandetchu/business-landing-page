
'use server';
/**
 * @fileOverview Provides business advice using an AI model.
 *
 * - getBusinessAdvice - A function that generates business advice based on a problem description.
 * - BusinessAdvisorInput - The input type for the getBusinessAdvice function.
 * - BusinessAdvisorOutput - The return type for the getBusinessAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessAdvisorInputSchema = z.object({
  problemDescription: z
    .string()
    .min(10, { message: "Problem description must be at least 10 characters." })
    .describe('A detailed description of the business problem, challenge, or question.'),
  businessContext: z
    .string()
    .optional()
    .describe('Optional context about the business, such as industry, size, target market, or current situation.'),
});
export type BusinessAdvisorInput = z.infer<typeof BusinessAdvisorInputSchema>;

const BusinessAdvisorOutputSchema = z.object({
  advice: z
    .string()
    .describe('Strategic advice, insights, or recommendations to address the described business problem.'),
  potentialNextSteps: z
    .array(z.string())
    .describe('A list of actionable next steps the user can consider.'),
});
export type BusinessAdvisorOutput = z.infer<typeof BusinessAdvisorOutputSchema>;

export async function getBusinessAdvice(input: BusinessAdvisorInput): Promise<BusinessAdvisorOutput> {
  return businessAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessAdvisorPrompt',
  input: {schema: BusinessAdvisorInputSchema},
  output: {schema: BusinessAdvisorOutputSchema},
  prompt: `You are an expert business consultant with extensive experience across various industries and business sizes.
A user is seeking your advice on a business-related matter.

Business Problem/Question:
{{{problemDescription}}}

{{#if businessContext}}
Additional Business Context:
{{{businessContext}}}
{{/if}}

Please provide:
1.  Clear, concise, and actionable advice or strategic recommendations to address the problem or question.
2.  A list of 2-4 potential next steps the user could take.

Focus on practical and insightful guidance.
`,
});

const businessAdvisorFlow = ai.defineFlow(
  {
    name: 'businessAdvisorFlow',
    inputSchema: BusinessAdvisorInputSchema,
    outputSchema: BusinessAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model did not return a valid output.");
    }
    return output;
  }
);
