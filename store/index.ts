import {create, StateCreator} from 'zustand'
import { siteConfig } from "@/config/site";
import {persist, createJSONStorage, devtools} from "zustand/middleware";
import { AuthState } from "@/interfaces";
import {AuthService} from "@/services/auth.services";

interface ThemeStoreState {
  theme: string;
  setTheme: (theme: string) => void;
  radius: number;
  setRadius: (value: number) => void;
  layout: string;
  setLayout: (value: string) => void;
  navbarType: string;
  setNavbarType: (value: string) => void;
  footerType: string;
  setFooterType: (value: string) => void;
  isRtl: boolean;
  setRtl: (value: boolean) => void;
  
}

export const useThemeStore = create<ThemeStoreState>()(
 persist(
      (set) => ({
           theme: siteConfig.theme,
      setTheme: (theme) => set({ theme }),
      radius: siteConfig.radius,
      setRadius: (value) => set({ radius: value }),
      layout: siteConfig.layout,
      setLayout: (value) => {
        set({ layout: value });

        // If the new layout is "semibox," also set the sidebarType to "popover"
        if (value === "semibox") {
          useSidebar.setState({ sidebarType: "popover" });
        }
        if (value === "horizontal") {
          useSidebar.setState({ sidebarType: "classic" });
        }
        //
        if (value === "horizontal") {
          // update  setNavbarType
          useThemeStore.setState({ navbarType: "sticky" });
        }
      },
      navbarType: siteConfig.navbarType,
      setNavbarType: (value) => set({ navbarType: value }),
      footerType: siteConfig.footerType,
      setFooterType: (value) => set({ footerType: value }),
      isRtl: false,
      setRtl: (value) => set({ isRtl: value }),
        
      }),
      { name: "theme-store",
      storage: createJSONStorage(() => localStorage), },
    ),
)



interface SidebarState {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  sidebarType: string;
  setSidebarType: (value: string) => void;
  subMenu: boolean;
  setSubmenu: (value: boolean) => void;
  // background image
  sidebarBg: string;
  setSidebarBg: (value: string) => void;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
  
}


export const useSidebar = create<SidebarState>()(
   persist(
      (set) => ({
          collapsed: false,
      setCollapsed: (value) => set({ collapsed: value }),
      sidebarType:
        siteConfig.layout === "semibox" ? "popover" : siteConfig.sidebarType,
      setSidebarType: (value) => {
        set({ sidebarType: value });
      },
      subMenu: false,
      setSubmenu: (value) => set({ subMenu: value }),
      // background image
      sidebarBg: siteConfig.sidebarBg,
      setSidebarBg: (value) => set({ sidebarBg: value }),
      mobileMenu: false,
      setMobileMenu: (value) => set({ mobileMenu: value }),
      
      }),
      {  name: "sidebar-store",
      storage: createJSONStorage(() => localStorage), },
    ),
)

const storeApi: StateCreator<AuthState> = set => ({
    status: "unauthorized",
    token: undefined,
    user: undefined,

    loginUser: async (email: string, password: string) => {
        try {
            const { token, User } = await AuthService.login(email, password)
            set({ status: "authorized", token, user: User })
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined })

            throw new Error('No autorizado')
        }
    },

    checkAuthStatus: async () => {
        try {
            const { token, User } = await AuthService.checkStatus()
            set({ status: 'authorized', token, user: User })
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined })

            throw new Error('No autorizado')
        }
    },

    logoutUser: () => {
        set({ status: 'unauthorized', token: undefined, user: undefined })
    }
})
export const useAuthStore = create<AuthState>()(devtools(persist(storeApi, { name: 'auth-storage' })))