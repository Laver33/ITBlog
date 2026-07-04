

const CardForStat = (props: {title: string, value: any}) => {
    return(
        <div className="px-5 p-4 flex bg-gray-700 gap-5 rounded">
            <h2 className="text-lg text-gray-400">{props.title}</h2>
            <p className="text-lg text-white">{props.value}</p>
        </div>
    )
}

export default CardForStat;