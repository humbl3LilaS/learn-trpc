import {useGetMessage} from "./api/query.ts";

function App() {
    const {data, isLoading} = useGetMessage();
    console.log(data);
    return (
        <section>
            <h1>Test</h1>
            {isLoading && <p>loading....</p>}
            {data && <p>{data.message}</p>}
        </section>
    )
}

export default App
