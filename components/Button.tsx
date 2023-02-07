import React from "react";

interface Props {
    children: React.ReactNode
    className?: string
}

export default function Button({ children, className, ...rest }: Props): React.ReactElement {
    return (
        <button className={`px-4 py-2 outline-none bg-gradient-to-r from-gray-700 
        to-slate-800 text-gray-50 rounded-md text-sm font-semibold ${className}`} {...rest}>
            {children}
        </button>
    )
}