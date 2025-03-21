import React, { FC } from 'react'

interface Props {
    title: string
    onClick?: () => void
    type?: "button" | "submit" | "reset" | undefined
    buttonStyle?: "Base" | "Cancel" | "Delete"
    big?: boolean | undefined
}

const Button: FC<Props> = ({ title, onClick, type = 'button', buttonStyle = "Base", big }) => {
    return (
        <button data-testid='button' type={type} onClick={onClick} className={`rounded-xl text-white py-2 ${big ? 'px-8' : 'px-4'} ${buttonStyle == 'Cancel' ? 'bg-gray-500 hover:bg-gray-600' : buttonStyle === 'Delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} transition-all duration-300  cursor-pointer`}>{title}</button>
    )
}

export default Button