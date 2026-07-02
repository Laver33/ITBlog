


interface iUser {
  _id: number;
  name: string;
  lastName: string;
  email: string;
}

const HomeUsers = (props: {users: iUser[]}) => { 

    return(
        <div className='w-3/12 bg-gray-900 rounded-sm shadow-lg border border-gray-700 px-2 pt-4 h-100 
          overflow-y-auto sticky top-6 transition-all hover:shadow-blue-500/5 cursor-default'
        >
        <h2 className='mb-4 text-xl font-bold text-gray-300 bg-clip-text text-center'>
          Пользователи
        </h2>
        <ul>
          {props.users.map((user) => (
            <li 
              key={user._id} 
              className='bg-gray-800/50 hover:bg-gray-800 p-2 mb-2 rounded-sm border border-gray-700 transition-all duration-1000 hover:border-blue-500/50 hover:translate-x-1'
            >
              <p className='text-sm text-gray-300'>
                <span className='font-semibold text-blue-400'>
                  {user.name} {user.lastName}
                </span> • {user.email}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default HomeUsers;