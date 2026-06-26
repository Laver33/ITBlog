
import AboutIcon from '../icons/aboutIcon.png'
import AboutPlatfotm from '../components/AboutPlatform';

import * as IconName from "react-icons/di";



const AboutPage = () => {

    const Technologies = [
        { 
            type: 'Frontend', 
            name: 'React', 
            lib: ['tailwind'], 
            imgName: IconName.DiReact,
        },

        { 
            type: 'Backend', 
            name: 'Node.js', 
            lib: [
                'Express.js', 
                'jwt',
                'bcrypt'
            ], 
            imgName: IconName.DiNodejs, 
            imgLang: IconName.DiJsBadge, 
            imgDB: IconName.DiMongodb
        },

        {
            type: 'Aplication',
            name: 'VS Code',
            imgName: IconName.DiVisualstudio
        }
    ]

    return(
        <div>

            {/* Заголовок */}
            <h1 className="text-center text-9xl font-semibold my-48 cursor-default italic bg-linear-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
                About project
            </h1>

            {/* Идея проекта */}
            <AboutPlatfotm iconAbout={AboutIcon} />

            {/* Информация о стеке */}
            <div className="about-technologies">
                <h2 className="text-center text-4xl font-semibold my-24 text-gray-200 cursor-default italic">
                    Technologies used in my project
                </h2>

                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto px-4 mb-14">

                    {Technologies.map((tech, index) => (
                        <div key={index} className="group relative w-72">
                            <div className="absolute -inset-0.5 bg-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-gray-900 rounded-2xl p-6 h-full">
                                <div className="text-center">

                                    {/* Иконка с анимацией */}
                                    <div className="text-6xl text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                        {tech.imgName && <tech.imgName />}
                                    </div>
                                    
                                    <span className="text-xs font-medium text-blue-400 uppercase tracking-wider bg-blue-400/10 px-3 py-1 rounded-full">
                                        {tech.type}
                                    </span>
                                    
                                    <h3 className="text-2xl font-bold text-white mt-2 mb-3">
                                        {tech.name}
                                    </h3>
                                    
                                    {tech.lib && (
                                        <div className="flex flex-wrap gap-1.5 justify-center">
                                            {tech.lib.map((item, idx) => (
                                                <span key={idx} className="bg-gray-800 px-3 py-1 rounded-lg text-xs text-gray-300 border border-gray-700">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {tech.imgLang && (
                                        <div className="flex justify-center gap-3 mt-4 text-2xl text-gray-600 group-hover:text-gray-400 transition-colors">
                                            <tech.imgLang />
                                            {tech.imgDB && <tech.imgDB />}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </div>
    )
}


export default AboutPage;