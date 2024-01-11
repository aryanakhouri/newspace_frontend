import React, { useEffect, useState } from 'react';
import TodoList1 from './todolist1';
import TodoList2 from './todolist2';
import axios from 'axios';

const Todolist = () => {
//first state is used to fetch the value of the lists during initial render
  const [todoList, setTodoList] = useState([]);

  const [todoList1Value, setTodoList1Value] = useState("");
  const [todoList2Value, setTodoList2Value] = useState("");


//this api call is just getting the values inside todo lists during initial render. later i will call this api in a useEffect with a dependency array, and also call this function everytime I do my transfers through post or deletion through delete apis
const updateTodoLists = async () => {
    // Fetch the latest todos and update the state
    // This ensures that both TodoList1 and TodoList2 have the same data
    try {
      const response = await axios.get('http://localhost:8000/display_items/');
      setTodoList(response.data);
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
};

//I have written this function to call the api i wrote for drag and drop. But the library, react beautiful dnd which enables drag and drop is not functional in javascript since quite some time. So to get around that. I tried to use the arrow keys for transfer.
const handledragclick = async (task_id,transfer_to) =>{
    try {
        const response = await fetch(`http://localhost:8000/tasks/move/?task_id=${task_id}&new_list=${transfer_to}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("Success:", responseData);
        updateTodoLists();
    }catch (error) {
        console.error('Error in transfer', error?.message);
    }
}

//wrote this api endpoint to delete every time I try to delete a task, and it is functional list-wise. Only add operation is cloning in both
const handleDelete= async (task_id, delete_from) => {
    try {
        const response = await fetch(`http://localhost:8000/tasks/delete/?task_id=${task_id}&list_name=${delete_from}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("Success:", responseData);
        updateTodoLists();
    }catch (error) {
        console.error('Error in deletion', error?.message);
    }
}

//this is the post api which will copy to both the lists
  const handleClick = async (list_origin_button) =>{
    try{
        const response= await fetch(`http://localhost:8000/items/?task=${list_origin_button==='first'?todoList1Value:todoList2Value}`,{
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const responseData = await response.json();
          console.log("Success:", responseData);
          updateTodoLists();
          setTodoList1Value("");
          setTodoList2Value("");

    }catch (error) {
        console.error('Error adding todo:', error);
    }
  }

  useEffect(()=>{   
    updateTodoLists();
  },[])

  //this part is self explanatory, so are the props.
  return (
    <div style={{display:"flex", marginLeft:"100px"}}>
      {console.log('todoList',todoList)}
      <TodoList1 
        todoList={todoList} 
        handleDelete={handleDelete} 
        handledragclick={handledragclick} 
        todoList1Value={todoList1Value} 
        setTodoList1Value={setTodoList1Value} 
        handleClick={handleClick}
      />
      <TodoList2 
        todoList={todoList} 
        handleDelete={handleDelete} 
        handledragclick={handledragclick} 
        todoList2Value={todoList2Value} 
        setTodoList2Value={setTodoList2Value} 
        handleClick={handleClick}
      />
      
    </div>
  );
};

export default Todolist;