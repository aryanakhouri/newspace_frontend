
import styles from './styles.module.css';
const TodoList1 = ({todoList,handleDelete,handledragclick,todoList1Value,setTodoList1Value,handleClick}) => {

  return (
    <div style={{padding: "100px"}}>
        <h2> To-Do List 1</h2>
        {
            todoList?.items1?.map((item)=>{
                return (
                    <div style={{display:"flex"}}>
                    <span role='presentation' onClick={()=>handleDelete(item?.id,"list1")} style={{cursor:"pointer"}}>❌</span>
                    <div className={styles.individual_task}>
                        <span>{item.task}</span>
                        <span role='presentation' onClick={()=>handledragclick(item?.id,"list2")}>➡️</span>
                        
                    </div>
                    
                    </div>
                )
            })
        }
        <div style={{marginTop:"10px"}}>
            <h5>add task to list 1</h5>
            <input 
            value={todoList1Value}
            onChange={(e)=>setTodoList1Value(e.target.value)}/>
            <button onClick={()=>handleClick("first")}> Submit</button>
        </div>
      </div>
  );
};

export default TodoList1;