import React,{useState}from 'react'
import Form from './Form'

function List() {
    const [todos, settodos] = useState([])
    return (
        <div>
            <h1>Test</h1>
            <Form/>
        </div>
    )
}

export default List
