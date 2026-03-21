import React from 'react'

const InputField = ({
    icon: Icon, label, name, ...props
}) => {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-g">
                {label}
            </label>
            <div className="">
                {Icon && (
                    <div className="">
                        <Icon className="" />
                    </div>
                )}
                <input
                    id={name}
                    name={name}
                    {...props}
                    className={`w-full h-11 px-3 py-2 border border-gray-200 rounded-xl bg-white
                        Icon ? "pl-10" : ""`}
                />
            </div>
        </div>
    )
}

export default InputField