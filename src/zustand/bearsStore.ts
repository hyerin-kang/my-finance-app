import { create } from "zustand";

// 스토어 상태 타입 정의
interface BearState {
  bears: number;
  increase: () => void;
  init: () => void;
}

// Zustand 스토어 생성
const useBearsStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => {
    set((state) => ({ bears: state.bears + 1 }));
  },
  init: () => {
    set({ bears: 0 });
  },
}));

export default useBearsStore;
