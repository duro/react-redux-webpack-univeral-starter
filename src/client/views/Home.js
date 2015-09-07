import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
  render() {
    const styles = require('client/less/App.less');

    return (
      <div>
        <h1 className={styles.makeGreen}>Home</h1>
      </div>
    );
  }
}
