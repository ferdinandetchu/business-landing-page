
import type { LucideIcon } from 'lucide-react';
import { FileText, BarChart3, Briefcase, GitMerge, FileEdit, TrendingUp, Handshake, ListChecks, UserCog, Search, Lightbulb } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  longDescription?: string[];
}

export const services: Service[] = [
  {
    id: 'scientific-research-rewriting',
    name: 'Scientific Research Rewriting',
    description: 'Transforming complex research papers into clear, concise, and impactful documents for broader understanding.',
    icon: FileText,
    longDescription: [
      "Refinement of manuscript structure and flow.",
      "Enhancement of language clarity and academic tone.",
      "Adherence to specific journal guidelines.",
      "Plagiarism check and editing."
    ],
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Expert data interpretation and visualization to uncover insights and inform strategic decision-making.',
    icon: BarChart3,
    longDescription: [
      "Statistical modeling and hypothesis testing.",
      "Predictive analytics and forecasting.",
      "Custom dashboard creation (e.g., Tableau, Power BI).",
      "Data cleaning and preprocessing."
    ],
  },
  {
    id: 'business-consulting',
    name: 'Business & Management Consulting',
    description: 'Strategic guidance to optimize operations, improve performance, and achieve sustainable growth.',
    icon: Briefcase,
    longDescription: [
      "Market entry strategy development.",
      "Operational efficiency improvement.",
      "Change management support.",
      "Organizational design and development."
    ],
  },
  {
    id: 'business-restructuring',
    name: 'Business Restructuring',
    description: 'Advising on organizational changes to enhance efficiency, agility, and profitability in dynamic markets.',
    icon: GitMerge,
    longDescription: [
      "Financial restructuring and turnaround strategies.",
      "Merger and acquisition integration support.",
      "Process re-engineering.",
      "Corporate governance enhancement."
    ],
  },
  {
    id: 'business-plan-writing',
    name: 'Business Plan Writing',
    description: 'Crafting comprehensive and persuasive business plans to secure funding and guide your venture.',
    icon: FileEdit,
    longDescription: [
      "Investor-ready business plans.",
      "Financial projections and modeling.",
      "Market research and competitive analysis.",
      "Pitch deck creation and refinement."
    ],
  },
  {
    id: 'investment-appraisal',
    name: 'Investment Appraisal',
    description: 'Thorough financial analysis and evaluation of investment opportunities to maximize returns.',
    icon: TrendingUp,
    longDescription: [
      "Net Present Value (NPV) and Internal Rate of Return (IRR) analysis.",
      "Sensitivity and scenario analysis.",
      "Due diligence support.",
      "Risk assessment and mitigation strategies."
    ],
  },
  {
    id: 'ngo-proposals',
    name: 'NGO Proposals',
    description: 'Developing compelling proposals for non-governmental organizations to secure grants and support.',
    icon: Handshake,
    longDescription: [
      "Grant research and identification.",
      "Logical framework approach (LFA) development.",
      "Monitoring and evaluation (M&E) plan design.",
      "Budget preparation and justification."
    ],
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Efficiently managing projects from initiation to completion, ensuring on-time and on-budget delivery.',
    icon: ListChecks,
    longDescription: [
      "Agile and Waterfall project methodologies.",
      "Risk management and stakeholder communication.",
      "Resource allocation and budget tracking.",
      "Quality assurance and project closure."
    ],
  },
  {
    id: 'cv-building',
    name: 'CV Building',
    description: 'Professional CV and resume crafting to highlight your skills and experience effectively.',
    icon: UserCog,
    longDescription: [
      "Tailored CVs for specific job applications.",
      "LinkedIn profile optimization.",
      "Cover letter writing.",
      "Interview preparation tips."
    ],
  },
  {
    id: 'research-assistance',
    name: 'Research Assistance',
    description: 'Providing comprehensive support for academic and corporate research projects at all stages.',
    icon: Search,
    longDescription: [
      "Literature review and synthesis.",
      "Survey design and data collection.",
      "Qualitative and quantitative data analysis.",
      "Report writing and presentation preparation."
    ],
  },
];
