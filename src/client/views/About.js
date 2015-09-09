import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {arePeopleLoaded, getPeople} from 'client/ducks/people';

@connect(
  state => ({people: state.people})
)
export default class About extends Component {

  static fetchData(store) {
    const promises = [];
    if (!arePeopleLoaded(store.getState())) {
      promises.push(store.dispatch(getPeople()));
    }
    return Promise.all(promises);
  }

  render() {
    const styles = require('client/less/About.less');

    return (
      <div>
        <h1 className={styles.heading}>About</h1>
      </div>
    );
  }
}
