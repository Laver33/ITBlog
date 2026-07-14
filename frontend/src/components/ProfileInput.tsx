

interface iProfileInputProps {
    valueData: string;
    placeData: string;
    typeData: string;
    titleData: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

const ProfileInput = (props: iProfileInputProps) => {
    return(
        <div>
            <label className="block text-gray-400 text-sm mb-1">{props.titleData}</label>
            <input 
                type={props.typeData}
                name={props.name} 
                value={props.valueData}
                onChange={props.onChange}
                placeholder={props.placeData}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 
                    focus:border-blue-500 focus:outline-none duration-300
                    placeholder:text-gray-500"
                required
            />
        </div>
    );
};

export default ProfileInput;