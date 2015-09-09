import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
  render() {
    const styles = require('client/less/Home.less');

    return (
      <div>
        <h1 className={styles.heading}>Home</h1>
      </div>
    );
  }
}
