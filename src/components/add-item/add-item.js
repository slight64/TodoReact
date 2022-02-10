import React, { Component } from "react";
import "./add-item.css";

export default class AddItem extends Component {
  state = {
    label: "",
  };
  onLabelChange = ({ target: { value } }) => {
    this.setState({
      label: value,
    });
  };
  onSubmit = (e) => {
      e.preventDefault();
      if (this.state.label) {
        this.props.onItemAdded(this.state.label);
      } 
      this.setState({
          label:''
      })
  }

 
  render() {
    return (
      <form className="add-item-form"
      onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          value={this.state.label}
          placeholder="Add new task here"
        />
        <button className="btn btn-info" onClick={this.onSubmit}>
          Add item
        </button>
      </form>
    );
  }
}
