import { create } from "zustand";
import api from "../services/api";

interface iMessage {
    _id: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    telegram: string;
    title: string;
    message: string;
}

interface iContactMessageStore {
  contactMessage: iMessage[];
  loading: boolean;
  fetchContactsMessages: () => Promise<void>;
  ContactMessageById: (_id: string) => Promise<iMessage>;
  deleteContactMessage: (_id: string) => Promise<void>;
  deleteAllContactMessage: () => Promise<void>;
}



const useCotactMessageStore = create<iContactMessageStore>((set) => ({
    contactMessage: [],
    loading: false,

    fetchContactsMessages: async () => {

        set({ loading: true });

        try {

            const response = await api.get('/contacts');
            set({ contactMessage: response.data, loading: false });

        } catch (error) {

            console.error(error);
            set({ loading: false });

        }

    },

    ContactMessageById: async (id: string) => {

        set({ loading: true });

        try {

            const response = await api.get(`/contacts/${id}`);
            set({ loading: false });
            return response.data;

        } catch (error) {

            console.error(error);
            set({ loading: false });

        }
    },

    deleteContactMessage: async (id: string) => {

        set({ loading: true });

        try {

            await api.delete(`/contacts/${id}`);
            set({ loading: false });
            set((state) => ({
                contactMessage: state.contactMessage.filter(message => message._id !== id)
            }));

        } catch (error) {

            console.error(error);
            set({ loading: false });

        }
    },

    deleteAllContactMessage: async () => {
        set({ loading: true });

        try {

            await api.delete('/contacts');
            set({ contactMessage: [] , loading: false });

        } catch (error) {

            console.error(error);
            set({ loading: false });

        }
    }
}))


export default useCotactMessageStore;