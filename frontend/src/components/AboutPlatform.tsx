


const AboutPlatfotm = (props: { iconAbout: string }) => {
    return (
        <div className="group relative max-w-4xl mx-auto px-4 mb-14">
            
            <div className="absolute -inset-0.5 bg-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            {/* Основной контент */}
            <div className="relative bg-gray-900 rounded-2xl flex overflow-hidden">
                
                {/* Иконка */}
                <div className="left-content shrink-0">
                    <img 
                        src={props.iconAbout} 
                        alt="About icon"
                        className="p-3 m-9 bg-gray-400 rounded-lg w-32 
                                 transition duration-500 
                                 group-hover:brightness-150 group-hover:scale-101"
                    />
                </div>

                {/* Описание */}
                <div className="right-content p-8 flex-1">
                    <h2 className="text-white mb-2 font-medium text-xl 
                                   transition-colors duration-500
                                   group-hover:text-blue-400">
                        Идея проекта
                    </h2>

                    <p className="text-gray-400 text-lg transition-colors duration-500 group-hover:text-gray-200">
                        IT Blog - обыкновенный блок завязанный только на ит направлении. 
                        Реализован на таком технологическом стеке как React для клиенской 
                        части и Express для серверной части вместе с MongoDB.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AboutPlatfotm;