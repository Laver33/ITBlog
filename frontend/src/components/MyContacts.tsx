

const MyContacts = () => {


    const myContacts = {
        name: 'Pavel',
        email: 'pad666444@gmail.com',
        secondary_email: 'pad333222@outlook.com',
        telegram: '@TrueReady'
    }
    
    const contactsArray = Object.entries(myContacts); // для объекта в массив

    return(
        <div className="my-contacts bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-125 transition-all hover:shadow-gray-700/50">
            <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-linear-to-r from-blue-400 to-gray-600 bg-clip-text">
                My contacts
            </h1>

            <div className="space-y-3 text-gray-300">
                <p className=" text-sm bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                    <span className="text-blue-400">eng:</span> If you have any questions or need help, feel free to contact me.
                </p>

                <p className="text-sm bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                    <span className="text-purple-400">ru:</span> Если у вас есть какие-то вопросы или нужна помощь, можете связаться со мной.
                </p>
            </div>

            <div>
                <ul className='my-9 space-y-3'>
                    {contactsArray.map(([key, value]) => (
                        <li key={key} className='bg-gray-700/30 hover:bg-gray-700/50 p-3 rounded-lg border border-gray-600 transition-all duration-200 hover:border-blue-500/50 hover:translate-x-1'>
                            <span className='text-blue-400 font-semibold'>{key}:</span>
                            <span className='text-gray-200 ml-2'>{value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MyContacts