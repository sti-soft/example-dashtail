
import {
  Cart,
  DashBoard, Graph,
 
} from "@/components/svg";
import { BoxIcon, Home, Store, StoreIcon } from "lucide-react";


export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu? : MenuItemProps[]
  nested?: MenuItemProps[]
  onClick: () => void;

  
}

export const menusConfig = {
  mainNav: [
      {
      title: "blank",
      icon: DashBoard,
      href: "/blank",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "blank",
        icon: DashBoard,
        href: "/blank",
      },
    ],
    classic: [
       {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: Graph,
        href: "/dashboard",
      },
      {
        title: "Productos",
        icon: BoxIcon,
        child: [
          {
            title: "Categorias",
            href: "/products/categories",
            icon: DashBoard
          },
          {
            title: "Marcas",
            href: "/products/brands",
            icon: DashBoard
          },
          {
            title: "Productos",
            href: "/products",
            icon: DashBoard
          }
        ]
      },
      {
        title: "Ventas",
        href: "/",
        icon: Cart
      },
      {
        title: "Inventario",
        href: "/",
        icon: Store
      },
      {
        title: "Blanco",
        icon: DashBoard,
        href: "/blank",
      },
    ],
  },
};


export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number]
export type MainNavType = (typeof menusConfig.mainNav)[number]