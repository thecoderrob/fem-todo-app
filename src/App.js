import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleAddTodo = (e) => {
    if (e.keyCode === 13) {
      setTodos([
        ...todos,
        {
          id: new Date().getTime().toString(),
          text: e.target.value,
          isCompleted: false,
        },
      ]);
      e.target.value = "";
    }
  };

  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const handleCompleted = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo = { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => todo.isCompleted === false);

    setTodos(newTodos);
  };

  const toggleTheme = () => {
    const app = document.querySelector(".App");
    app.classList.toggle("dark");
  };

  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <div className="title | flex">
            <h1 className="uppercase fs-900 fw-bold text-white letter-spacing-3">
              Todo
            </h1>
            <button className="btn" onClick={toggleTheme}>
              <span className="sr-only">Toggle Theme</span>
            </button>
          </div>

          <div className="todo-form | flex bg-todo p-relative">
            <input type="checkbox" className="custom-checkbox" name="" />
            <input
              type="text"
              name=""
              id=""
              placeholder="Create a new todo..."
              onKeyDown={(e) => handleAddTodo(e)}
            />
          </div>
        </div>
      </div>
      <div className="container app--container | flow">
        <div className="todo-list | bg-todo">
          {todos
            .filter((todo) => {
              if (filter === "all") return todo;
              if (filter === "active") {
                if (!todo.isCompleted) {
                  return todo;
                }
              }
              if (filter === "completed") {
                if (todo.isCompleted) {
                  return todo;
                }
              }
            })
            .map((todo, index) => {
              const { id, text } = todo;
              return (
                <div className="todo-container | flex p-relative">
                  <div className="todo | flex">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={todo.isCompleted ? true : false}
                      onChange={() => handleCompleted(id)}
                    />
                    <p className="text-todo">{text}</p>
                  </div>
                  <button
                    className="btn"
                    onClick={() => handleRemoveTodo(id)}
                  ></button>
                </div>
              );
            })}

          <div className="todo-list-footer | grid">
            <p className="fs-200">
              {todos.filter((todo) => todo.isCompleted === false).length} items
              left
            </p>
            <button className="btn fs-200" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>

        <div className="filters | flex fs-200 fw-bold bg-todo">
          <button
            className={`btn ${filter === "all" && "active"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "active" && "active"}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`btn ${filter === "completed" && "active"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
