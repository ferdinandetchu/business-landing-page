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
    quote: "FYCARD Consulting and Outsourcing transformed our research data into a compelling narrative that significantly boosted our grant application's success. Their professionalism and insight are unmatched.",
    clientName: 'Dr. Eleanor Vance',
    clientRole: 'Lead Researcher',
    company: 'Innovatech Labs',
    avatarUrl: 'https://images.unsplash.com/photo-1703059680709-d9554370fff9?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'scientist woman',
  },
  {
    id: 'testimonial-2',
    quote: "The business restructuring plan developed by FYCARD Consulting and Outsourcing was a game-changer for our company. We're now more agile and profitable than ever before.",
    clientName: 'Marcus Chen',
    clientRole: 'CEO',
    company: 'Apex Industries',
    avatarUrl: 'https://images.unsplash.com/photo-1675383094481-3e2088da943b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'businessman portrait',
  },
  {
    id: 'testimonial-3',
    quote: "Their expertise in NGO proposal writing helped us secure crucial funding for our community projects. We highly recommend FYCARD Consulting and Outsourcing!",
    clientName: 'Aisha Khan',
    clientRole: 'Director',
    company: 'Global Outreach Foundation',
    avatarUrl: 'https://images.unsplash.com/photo-1604783020105-a1c1a856a55d?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'charity worker',
  },
];
