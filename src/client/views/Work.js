import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isWorkLoaded, getWork} from 'client/ducks/work';
import WorkItem from 'client/components/WorkItem';
import ConnectTransitionWrapper from 'client/lib/ConnectTransitionWrapper';

@ConnectTransitionWrapper()
@connect(
  state => ({work: state.work})
)
export default class Work extends Component {

  static fetchData(store) {
    const promises = [];
    if (!isWorkLoaded(store.getState())) {
      promises.push(store.dispatch(getWork()));
    }
    return Promise.all(promises);
  }

  componentWillAppear(done) {
    const tl = new TimelineMax();
    const el = React.findDOMNode(this);

    tl.add( TweenMax.to(el, 2, {opacity: 1}) );

    tl.eventCallback('onComplete', done);
    // done();
  }

  componentWillLeave(done) {
    const tl = new TimelineMax();
    const el = React.findDOMNode(this);

    tl.add( TweenMax.to(el, 2, {opacity: 0}) );

    tl.eventCallback('onComplete', done);
    // done();
  }

  componentWillEnter(done) {
    const tl = new TimelineMax();
    const el = React.findDOMNode(this);

    tl.add( TweenMax.to(el, 2, {delay: 2, opacity: 1}) );

    tl.eventCallback('onComplete', done);
    // done();
  }

  render() {
    const pageStyles = require('client/less/Page.less');

    return (
      <div className={[pageStyles.page]} style={{opacity: 0}}>
        <h1 className={pageStyles.heading}>Work</h1>
        <ul>
          {
            this.props.work.get('data').map(workItem => <WorkItem data={workItem} key={workItem.get('id')} />)
          }
        </ul>
      </div>
    );
  }
}
