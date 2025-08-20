export interface WebsiteInfo {
  name: string;
  slogan: string;
  logo: string;
  favicon: string;
  linkedin : string ,
  instagram : string , 
  mail      : string ,
  facebook : string
  ,
  phone : string ,
}

export interface ColorScheme {
  primaryColor1: string;
  primaryColor2: string;
  primaryColor3: string;
  secondaryColor1: string;
  secondaryColor2: string;
  backgroundLight: string;
  backgroundDark: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface PageContent {
  title: string;
  subtitle?: string;
  content: string[];
  sections?: {
    title: string;
    content: string;
  }[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}