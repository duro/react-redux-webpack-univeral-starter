import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Home extends Component {

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
        <h1 className={pageStyles.heading}>Home</h1>
      </div>
    );
  }
}
