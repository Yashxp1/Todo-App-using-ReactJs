import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [todo, setTodo] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  function handleInput(e) {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  function handleAdd() {
    if (inputValue.trim()) {
      setTodo([...todo, { text: inputValue.trim(), done: false }]);
      setInputValue('');
    }
  }

  function handleDelete(index) {
    setTodo(todo.filter((_, i) => i !== index));
  }

  function handlEdit(index) {
    setInputValue(todo[index].text);
    setEditTodo(index);
  }

  function handleEditedTodo() {
    if (inputValue.trim()) {
      const updatedTodo = todo.map((item, index) =>
        index === editTodo ? { ...item, text: inputValue.trim() } : item
      );
      setTodo(updatedTodo);
      setInputValue('');
      setEditTodo(null);
    }
  }

  function markDone(index) {
    const updatedTodo = todo.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTodo(updatedTodo);
  }

  return (
    <>
      <div id="main">
        <section id="headerBox">
          <h1>Task Done</h1>
          <h2>Keep it up</h2>

          <div id="todoCount">
            <p>
              {todo.filter((item) => item.done).length}/{todo.length}
            </p>
          </div>
        </section>

        <div id="inputBox">
          <input value={inputValue} onChange={handleInput} type="text" />

          <div id="editConditionalBtn">
            {editTodo !== null ? (
              <button id="saveBtn" onClick={handleEditedTodo}>
                Save
              </button>
            ) : (
              <button id="addBtn" onClick={handleAdd}>
                Add
              </button>
            )}
          </div>
        </div>

        <div id="todoBox">
          <ul id="todoUList">
            {todo.map((todos, index) => {
              return (
                <li
                  id="todoList"
                  key={index}
                  style={{
                    textDecoration: todos.done ? 'line-through' : 'none',
                    color: todos.done ? 'gray' : 'white',
                  }}
                >
                  {todos.text}

                  <div id="btsDiv">
                    <button id="markDoneBtn" onClick={() => markDone(index)}>
                      {todos.done ? 'Undo' : 'Mark as Done'}
                    </button>

                    <button id="editBtn" onClick={() => handlEdit(index)}>
                      edit
                    </button>
                    <button id="deleteBtn" onClick={() => handleDelete(index)}>
                      delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
