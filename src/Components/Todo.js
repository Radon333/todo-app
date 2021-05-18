import React,{useState} from 'react'
import Form from './Form'

function Todo() {


    const [edit, setedit] = useState({
        id:null,
        value:''
    })





    return todos.map((todo,index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row' } key={index}>


            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className="icons">
                {icons}
            </div>

        </div>
    ))
       
    
}

export default Todo
