import useUserStore from "../store/userStore";
import { motion } from "motion/react"


const HomeUsers = () => { 

    const { users } = useUserStore();

    return(
        <div className=' bg-gray-900 rounded-sm shadow-lg border border-gray-700 px-2 pt-4 h-100 
          overflow-y-auto sticky top-6 transition-all hover:shadow-blue-500/5 cursor-default'
        >
        <h2 className='mb-4 text-xl font-bold text-gray-300 bg-clip-text text-center'>
          Пользователи
        </h2>
        <ul>
          {users.map((user) => (
            <motion.li
              whileHover={{ scale: 1.02 }} 
              key={user._id} 
              className='bg-gray-800/50 hover:bg-gray-800 p-2 mb-2 rounded-sm border border-gray-700 transition-all duration-1000 hover:border-blue-500/50'
            >
              <p className='text-sm text-gray-300'>
                <span className='font-semibold text-blue-400'>
                  {user.name} {user.lastName}
                </span> • {user.email}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    )
}

export default HomeUsers;