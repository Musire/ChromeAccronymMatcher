import { twMerge } from "tailwind-merge";

const Page = ({ className, children }) => {
    return ( 
        <section className={twMerge('w-full h-full max-w-full max-h-full text-else  ', className)}>
            { children }
        </section>
     );
}
 
export default Page;