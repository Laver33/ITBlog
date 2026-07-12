// hooks/useFetchAllData.ts
import { useEffect } from "react";
import useCotactMessageStore from "../store/contactMessageStore";
import useUserStore from "../store/userStore";
import usePostStore from "../store/postStore";


export const useFetchAllData = () => {
    const { fetchContactsMessages } = useCotactMessageStore();
    const { fetchUsers } = useUserStore();
    const { fetchPosts } = usePostStore();

    useEffect(() => {
        fetchContactsMessages();
        fetchUsers();
        fetchPosts();
    }, []); 
};