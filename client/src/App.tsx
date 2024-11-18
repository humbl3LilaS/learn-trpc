import {useGetTodos} from "./api/query.ts";
import {useMarkAsCompleted} from "./api/mutation.ts";

function App() {
    const {data: todos} = useGetTodos();
    const {mutateAsync: markAsComplete} = useMarkAsCompleted();


    return (
        <section>
            <div className={"w-screen h-screen flex flex-col items-center justify-center bg-[#f1f1f1]"}>
                <header>
                    <h1 className={"font-bold text-2xl"}>Simple Todo-list app using tRCP</h1>
                </header>
                <div className={"container p-8 mt-4 bg-white rounded-lg shadow-lg"}>
                    {
                        todos && todos.map(item =>
                                               <div className={"px-4 py-2 flex justify-between items-center"}>
                                                   <p>{item.title}</p>
                                                   {
                                                       !item.isCompleted &&
                                                       <button
                                                           className={"px-4 py-2 bg-black text-white rounded-lg"}
                                                           onClick={async () => await markAsComplete({id: item.id})}
                                                       >
                                                           Check completed
                                                       </button>
                                                   }

                                                   {
                                                       item.isCompleted &&
                                                       <span className={"block px-4 py-2 bg-gray-400 text-white"}>
                                                           completed
                                                       </span>
                                                   }
                                               </div>
                        )
                    }
                </div>
            </div>

        </section>
    )
}

export default App
