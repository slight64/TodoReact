import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Some to to do first"),
      this.createTodoItem("Second to do"),
      this.createTodoItem("Lazy day is here"),
    ],
    term: "",
    status: "all",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newData,
      };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text);
      const newData = [...todoData, newItem];

      return {
        todoData: newData,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };
  searchFilter = (items, text) => {
    if (text.length === 0) {
      return items;
    }
    return items.filter((el) => {
      return el.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
  };
  onFiltered = (term) => {
    this.setState({ term });
  };

  onStatusChange = (status) => {
    this.setState({ status });
  };

  onStatusFilter = (items, status) => {
    const doneItems = items.filter((el) => el.done);
    const allItems = items;
    const notDoneItems = items.filter((el) => !el.done);
    if (status === "all") {
      return allItems;
    }
    if (status === "done") {
      return doneItems;
    }
    if (status === "active") {
      return notDoneItems;
    }
  };

  render() {
    const { todoData, term, status } = this.state;
    const filteredItems = this.onStatusFilter(
      this.searchFilter(todoData, term),
      status
    );

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onLabelChange={this.onFiltered} />
          <ItemStatusFilter
            statusFilter={this.onStatusChange}
            status={this.state.status}
          />
        </div>

        <TodoList
          todos={filteredItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onItemAdded={this.addItem} />
      </div>
    );
  }
}
