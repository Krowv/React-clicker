interface DisplayDataProps {
    variant?: 'blue' | 'ocean' | 'sunset' | 'purple',
    title?: string,
    description?: string,
    cost?: number | undefined,
}


const gradientVariants = {
    blue: "from-sky-500 to-indigo-500",
    purple: "from-purple-600 to-blue-500",
    sunset: "from-orange-500 to-red-600",
    ocean: "from-emerald-400 to-cyan-500"
};


const DisplayData = ({title, description, variant = 'blue', cost} :DisplayDataProps) => {
    return (
        <div className={`bg-linear-to-br ${gradientVariants[variant]} w-100 border border-gray-100 rounded-xl pl-2 pr-2 pt-4 pb-4 relative`}>
            <div className={`flex flex-col`}>
                <p className="text-white text-sm">{title}</p>
                <p className="text-white text-3xl">{description}</p>
            </div>
            {cost ? <p className="absolute right-3 bottom-1 text-sm text-white font-bold">Cost : {cost}</p> : null}

        </div>

    );
};

export default DisplayData;