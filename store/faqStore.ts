import { create } from "zustand";
import { Faq } from "@/types/faq";

export const useFaq = create<{
  faqs: Faq[];
  setFaqs: (faq: Faq[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  faqs: [],
  loading: false,
  setFaqs: (newFaqs: Faq[]) => {
    set(() => ({ faqs: newFaqs }));
  },
  setLoading: (newloading: boolean) => {
    set(() => ({ loading: newloading }));
  },
}));
