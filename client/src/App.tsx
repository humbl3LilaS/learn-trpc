import {useGetMessage, useGetTodos} from "./api/query.ts";

function App() {
    const {data, isLoading} = useGetMessage();
    const {data: todos} = useGetTodos();
    console.log(data);
    console.log(todos);
    return (
        <section>
            <h1>Test</h1>
            {isLoading && <p>loading....</p>}
            {data && <p>{data.message}</p>}
        </section>
    )
}

export default App
