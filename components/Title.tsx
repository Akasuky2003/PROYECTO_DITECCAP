import React from "react";

interface Props {
    children: React.ReactNode
    className?: string
}

export default function Title({children, className="", ...rest}: Props): React.ReactElement{
    return(
        <h2 className={`text-2xl font-extrabold tracking-light text-gray-900 ${className}`} {...rest}>
            {children}
        </h2>
    )
}