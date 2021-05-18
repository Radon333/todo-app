import React,{useState}from 'react'
import Form from './Form'

function List() {

    const [todos, settodos] = useState([])
    
    const addTodos = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodos = [todo,...todos]
        

        settodos(newTodos);
        console.log(...todos);

    };
    
    return (
        <div>
            <Form onSubmit={addTodos}/>
        </div>
    )
}

export default List
