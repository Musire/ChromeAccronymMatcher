import { InitiationButton, InputController, Page, ResultController } from "@/components";

const HomePage = () => {

    return ( 
        <Page className="bg-dark flex flex-col p-4 space-y-6 relative">
            <h2 className="w-full text-center text-2xl capitalize">homepage</h2>
            <InitiationButton />
            <InputController />
            <ResultController />
        </Page>
     );
}
 
export default HomePage;