export type AllBookMarkType = {
  id: number;
  title: string;
  description: string;
  logo: string;
  categories: string[];
  tags: string[];
  views: number;
  datePosted: string;
  pinned: boolean;
  link: string;
};