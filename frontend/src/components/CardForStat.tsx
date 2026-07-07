

const CardForStat = (props: {title: string, value: any}) => {
    return(
        <div className="px-5 p-4 flex flex-col bg-gray-700 gap-5 rounded hover:shadow-lg hover:shadow-gray-600 duration-1000">
            <h2 className="text-lg text-gray-400">{props.title}</h2>
            <p className="text-5xl text-white">{props.value}</p>
        </div>
    )
}

export default CardForStat;