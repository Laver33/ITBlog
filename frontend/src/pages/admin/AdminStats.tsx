import CardForStat from "../../components/CardForStat";
import useCotactMessageStore from "../../store/contactMessageStore";
import usePostStore from "../../store/postStore";
import useUserStore from "../../store/userStore";

const AdminStats = () => {

    const { users } = useUserStore()
    const { posts } = usePostStore()
    const { contactMessage } = useCotactMessageStore()

    return(
        <div>
                <div className="w-full ">
                    <h1 className="text-3xl text-white mb-5">Статистика сайта</h1>

                    <div className="content-stat grid grid-cols-2 gap-3">
                        <CardForStat title={"Количество постов"} value={posts.length} />                
                        <CardForStat title={"Количество всего пользователей"} value={users.length} />                
                        <CardForStat title={"Количество админов"} value={users.filter(user => user.role === 'admin').length} />               
                        <CardForStat title={"Количество обычных пользователей"} value={users.filter(user => user.role === 'user').length} /> 
                        <CardForStat title={"Сообщений от пользователей"} value={contactMessage.length} />                
                    </div>
                </div>
        </div>
    )
}

export default AdminStats;