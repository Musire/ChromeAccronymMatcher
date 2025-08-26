const TimeslotInput = ({ hour }) => {
    return ( 
        <>
            <p className="">{hour}</p>
            <div className="flex space-x-2">
                <div className="surface-3 size-10 centered">0</div>
                <div className="surface-3 size-10 centered">1</div>
                <div className="surface-3 size-10 centered">2</div>
                <div className="surface-3 size-10 centered">3</div>
                <div className="surface-3 size-10 centered">4</div>
                <div className="surface-3 size-10 centered">5</div>
            </div>
        </>
     );
}
 
export default TimeslotInput;