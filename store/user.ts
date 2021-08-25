import create from 'zustand';

type State = {
  isLogin: boolean;
  user: any[];
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: any[]) => void;
};

const useStore = create<State>((set: any) => ({
  isLogin: false,
  user: [],
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({user})
}));

export const useUserStore = useStore;