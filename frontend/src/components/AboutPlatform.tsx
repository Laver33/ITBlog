



const AboutPlatfotm = ( props: {iconAbout: string} ) => {

    return(
        <div className="rounded-2xl hover:shadow-2xs duration-1000 bg-blue-600">
            <div className="bg-gray-900 rounded-2xl flex">

            {/* Иконка с демонстрацией */}
            <div className="left-content">
                    <img 
                        src={props.iconAbout} 
                        alt="About icon"
                        className='p-3 m-9 bg-gray-400 rounded-lg w-32'
                    />
            </div>

            {/* Описание */}
            <div className="right-content p-8 w-11/12">
                <h2 className='text-white mb-2 font-medium text-xl'>
                    Идея проекта
                </h2>

                <p className='text-gray-400 text-lg'>
                    IT Blog - обыкновенный блок завязанный только на ит направлении. Реализован на таком технологическом стеке как React для клиенской части и Express для серверной части вместе с MongoDB.
                </p>
            </div>

            </div>
        </div>
    )
}

export default AboutPlatfotm;