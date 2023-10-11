import React from 'react'

const Todo = ({ task, deleteHandler ,updateTask}) => {
    return (

        <div className="todo">
            <div>
                <h3>{task.tittle}</h3>
                <h4>{task.description}</h4>
                <h6>Crated On {task.createdAt}</h6>
            </div>
            <div>
                <input type="checkbox" checked={task.isCompleted} onChange={()=>{
                    updateTask(task._id)
                }} />
                <button id='deleteBtn' onClick={()=>{
                    deleteHandler(task._id)
                }}>Delete</button>
            </div>
        </div>

    )
}

export default Todo