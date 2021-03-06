import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {arePeopleLoaded, getPeople} from 'client/ducks/people';
import Person from 'client/components/Person';
import ConnectTransitionWrapper from 'client/lib/ConnectTransitionWrapper';

@ConnectTransitionWrapper()
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

  componentWillAppear(done) {
    const tl = new TimelineMax();
    const el = React.findDOMNode(this);

    tl.add( TweenMax.to(el, 2, {opacity: 1}) );

    tl.eventCallback('onComplete', done);
  }

  componentWillLeave(done) {
    const tl = new TimelineMax();
    const el = React.findDOMNode(this);

    tl.add( TweenMax.to(el, 2, {opacity: 0}) );

    tl.eventCallback('onComplete', done);
  }

  componentWillEnter(done) {
    const tl = new TimelineMax();
    const el = React.findDOMNode(this);

    tl.add( TweenMax.to(el, 2, {delay: 2, opacity: 1}) );

    tl.eventCallback('onComplete', done);
  }

  render() {
    const pageStyles = require('client/less/Page.less');

    return (
      <div className={[pageStyles.page]} style={{opacity: 0}}>
        <h1 className={pageStyles.heading}>About</h1>
        <ul>
          {
            this.props.people.get('data').map(person => <Person data={person} key={person.get('id')} />)
          }
        </ul>
      </div>
    );
  }
}
