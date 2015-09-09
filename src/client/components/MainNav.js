import React, {Component} from 'react';
import {Link} from 'react-router';

export default class MainNav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/work">Work</Link></li>
        </ul>
      </nav>
    )
  }
}
