import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    findText: "",
  };

  searchText = (event) => {
    const findText = event.target.value
    this.setState({findText});
    this.props.onLabelChange(findText)
  }
  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.searchText}
        value = {this.state.findText}
      />
    );
  }
}
