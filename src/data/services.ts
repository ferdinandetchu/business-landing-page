import type { LucideIcon } from 'lucide-react';
import { FileText, BarChart3, Briefcase, GitMerge, FileEdit, TrendingUp, Handshake, ListChecks, UserCog, Search, Lightbulb } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: 'scientific-research-rewriting',
    name: 'Scientific Research Rewriting',
    description: 'Transforming complex research papers into clear, concise, and impactful documents for broader understanding.',
    icon: FileText,
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Expert data interpretation and visualization to uncover insights and inform strategic decision-making.',
    icon: BarChart3,
  },
  {
    id: 'business-consulting',
    name: 'Business & Management Consulting',
    description: 'Strategic guidance to optimize operations, improve performance, and achieve sustainable growth.',
    icon: Briefcase,
  },
  {
    id: 'business-restructuring',
    name: 'Business Restructuring',
    description: 'Advising on organizational changes to enhance efficiency, agility, and profitability in dynamic markets.',
    icon: GitMerge,
  },
  {
    id: 'business-plan-writing',
    name: 'Business Plan Writing',
    description: 'Crafting comprehensive and persuasive business plans to secure funding and guide your venture.',
    icon: FileEdit,
  },
  {
    id: 'investment-appraisal',
    name: 'Investment Appraisal',
    description: 'Thorough financial analysis and evaluation of investment opportunities to maximize returns.',
    icon: TrendingUp,
  },
  {
    id: 'ngo-proposals',
    name: 'NGO Proposals',
    description: 'Developing compelling proposals for non-governmental organizations to secure grants and support.',
    icon: Handshake,
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Efficiently managing projects from initiation to completion, ensuring on-time and on-budget delivery.',
    icon: ListChecks,
  },
  {
    id: 'cv-building',
    name: 'CV Building',
    description: 'Professional CV and resume crafting to highlight your skills and experience effectively.',
    icon: UserCog,
  },
  {
    id: 'research-assistance',
    name: 'Research Assistance',
    description: 'Providing comprehensive support for academic and corporate research projects at all stages.',
    icon: Search,
  },
];
