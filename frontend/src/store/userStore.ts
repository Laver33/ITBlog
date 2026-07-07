import { create } from "zustand";
import api from "../services/api";


interface iUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
}


interface iUserStore {
  users: iUser[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  deleteUser: (_id: string) => Promise<void>;
}

const useUserStore = create<iUserStore>((set) => ({
    users: [],
    loading: false,

    fetchUsers: async () => {

        try {

            const response = await api.get('/users');
            set({ users: response.data });
            set({ loading: false });

        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },

    deleteUser: async (id: string) => {
        await api.delete(`/users/${id}`);
        
        set((state) => ({
            users: state.users.filter(user => user._id !== id)
        }));
    },


}));

export default useUserStore;