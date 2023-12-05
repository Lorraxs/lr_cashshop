export type CategoryOption = {
  name: string;
  label: string;
};
export interface Category {
  name: string;
  label: string;
  args: {
    options: CategoryOption[];
    icon: string;
  };
}
