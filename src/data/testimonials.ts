export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole?: string;
  company?: string;
  avatarUrl?: string;
  dataAiHint?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: "Verity Solutions transformed our research data into a compelling narrative that significantly boosted our grant application's success. Their professionalism and insight are unmatched.",
    clientName: 'Dr. Eleanor Vance',
    clientRole: 'Lead Researcher',
    company: 'Innovatech Labs',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'scientist woman',
  },
  {
    id: 'testimonial-2',
    quote: "The business restructuring plan developed by Verity Solutions was a game-changer for our company. We're now more agile and profitable than ever before.",
    clientName: 'Marcus Chen',
    clientRole: 'CEO',
    company: 'Apex Industries',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'businessman portrait',
  },
  {
    id: 'testimonial-3',
    quote: "Their expertise in NGO proposal writing helped us secure crucial funding for our community projects. We highly recommend Verity Solutions!",
    clientName: 'Aisha Khan',
    clientRole: 'Director',
    company: 'Global Outreach Foundation',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'charity worker',
  },
];
