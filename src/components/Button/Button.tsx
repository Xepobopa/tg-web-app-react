import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // You can add any additional custom props here if needed
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button {...props} > className={'button ' + props.className}</button>
    );
};

export default Button;