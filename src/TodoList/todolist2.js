import styles from './styles.module.css';

const TodoList2 = ({ todoList,handledragclick,handleDelete,todoList2Value,setTodoList2Value,handleClick }) => {
  
  return (
    <div style={{padding: "100px"}}>
        <h2> To-Do List 2</h2>
        {
            todoList?.items2?.map((item)=>{
                return (
                    <div style={{display:'flex'}}>
                    
                    <div className={styles.individual_task}>
                        <span role='presentation' onClick={()=>handledragclick(item?.id,"list1")}>⬅️</span>
                        <span>{item.task}</span>
                    </div>
                    <span role='presentation' onClick={()=>handleDelete(item?.id,"list2")} style={{cursor:"pointer"}}>❌</span>
                    </div>
                    
                )
            })
        }
        <div style={{marginTop:"10px"}}>
            <h5>add task to list 2</h5>
            <input
            value={todoList2Value}
            onChange={(e)=>setTodoList2Value(e.target.value)}/>
            <button onClick={()=>handleClick("second")}> Submit</button>
        </div>
      </div>
  );
};

export default TodoList2;