
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return ( 
        <main className="w-screen h-[100dvh] flex-col flex bg-blue-200 relative">
            {/* <div className="bg-softOrange w-full h-20 centered">navbar</div> */}
            <div className="bg-light grow">
                <Outlet />
            </div>
            {/* <footer className="bg-deep w-full h-20 text-silver centered">footer</footer>
            <aside className={clsx('absolute snappy h-[100dvh] right-0  overflow-hidden centered bg-sky-200', {'w-3/4 animate-fadeIn p-4': open, 'w-0 animate-fadeOut' : !open})}>
                <Button action={togglePanel} className="border border-deep normal-space " >close</Button>
            </aside> */}
        </main>
     );
}
 
export default MainLayout;