import React, { Component } from "react";

import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
  state = {
    buttonsData: [
      {
        name: "All",
        status: "all",
      },
      {
        name: "Done",
        status: "done",
      },
      {
        name: "Active",
        status: "active",
      },
    ],
  };
  // onLabelChange = (e) => {
  //   return this.props.statusFilter(e.target.attributes.filter.value);
  // };

  render() {
    const { buttonsData } = this.state;
    const buttons = buttonsData.map((el) => {
      const classNameSwitcher =
        this.props.status === el.status
          ? "btn btn-info"
          : "btn btn-outline-secondary";
      const { name, status } = el;
      return (
        <button
          key={name}
          type="button"
          className={classNameSwitcher}
          filter={status}
          onClick={() => this.props.statusFilter(status)}
        >
          {name}
        </button>
      );
    });
    return <div className="btn-group">{buttons}</div>;
  }
}

/* const ItemStatusFilter = () => {
  return (
    <div className="btn-group">
      <button type="button"
              className="btn btn-info">All</button>
      <button type="button"
              className="btn btn-outline-secondary">Active</button>
      <button type="button"
              className="btn btn-outline-secondary">Done</button>
    </div>
  );
};

export default ItemStatusFilter;
 */
