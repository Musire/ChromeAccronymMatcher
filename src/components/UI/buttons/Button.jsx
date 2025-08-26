import { twMerge } from "tailwind-merge";

const Button = ({ children, className, action, type, disabled }) => {
    const handleClick = (e) => {
        if (!action) return console.log('button clicked, but no action assigned');
        action(e)
    }
    const Type = type ? type : 'button'
    
    return ( 
        <button 
            onClick={e => handleClick(e)} 
            type={Type}
            disabled={disabled} 
            className={twMerge("hover:cursor-pointer transition-300 ease-in-out py-2 px-3 w-20", className)}
        >
            { children }
        </button>
     );
}
 
export default Button;