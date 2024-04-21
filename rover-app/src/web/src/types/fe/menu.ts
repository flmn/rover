export interface MenuModel {
    icon: React.ReactNode;
    label: string;
    path: string;
    children?: MenuModel[];
}