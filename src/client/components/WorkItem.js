import React, {Component} from 'react';

export default class WorkItem extends Component {
  render() {
    return (
      <li>
        <h3>{this.props.data.get('name')}</h3>
        <ul>
          <li>{this.props.data.get('description')}</li>
        </ul>
      </li>
    );
  }
}
