import { create } from "zustand";
import api from "../services/api";

interface iPost {
    _id: string;
    title: string;
    content: string;
    date: string;
}


interface iPostStore {
  posts: iPost[];
  currentPost: iPost | null;
  loading: boolean;
  fetchPosts: () => Promise<void>;
  fetchPost: (_id: string | undefined) => Promise<void>;
  getByIdPost: (_id: string) => Promise<iPost>;
  updatePost: (post: iPost, _id: string) => Promise<void>;
  deletePost: (_id: string) => Promise<void>;
}

const usePostStore = create<iPostStore>((set) => ({
    posts: [],
    currentPost: null,
    loading: false,


    fetchPosts: async () => {

        set({ loading: true });

        try {

            const response = await api.get('/posts');
            set({ posts: response.data, loading: false });

        } catch (error) {

            console.error(error);
            set({ loading: false });
        }
    },

    fetchPost: async (_id) => {
        
        set({ loading: true });

        try {
            const response = await api.get(`/posts/${_id}`);
            set({ currentPost: response.data, loading: false })
        } catch (error) {
            console.log(error);
            set({ loading: false });
        }
    },


    updatePost: async (post: iPost, _id: string) => {

        set({ loading: true });

        try {

            
            const response = await api.put(`/posts/${_id}`, post);

            set((state) => ({
                posts: state.posts.map(p => 
                    p._id === _id ? response.data : p
                ),
                loading: false
            }));

        } catch (error) {

            console.error(error);
            set({ loading: false });

        }

    },

    getByIdPost: async (_id: string) => {

        try {
            
            const response = await api.get(`/posts/${_id}`);
            set({ loading: false });
            return response.data;

        } catch (error) {

            console.error(error);
            set({ loading: false });

        }

    },
    
    deletePost: async (id: string) => {
        await api.delete(`/posts/${id}`);
        
        set((state) => ({
            posts: state.posts.filter(post => post._id !== id)
        }));
    },

}));



export default usePostStore;