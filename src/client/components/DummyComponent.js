import React, {Component} from 'react';
import ConnectTransitionWrapper from 'client/lib/ConnectTransitionWrapper';

@ConnectTransitionWrapper()
export default class DummyComponent extends Component {
  render() {
    return (
      <div>
        <p>Dummy</p>
      </div>
    );
  }
}
