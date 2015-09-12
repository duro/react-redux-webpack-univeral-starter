import React from 'react/addons';

const { TransitionGroup } = React.addons;

export default class ReduxTransitionGroup extends TransitionGroup {

  performAppear(key) {
    this.currentlyTransitioningKeys[key] = true;

    var component = this.refs[key];

    if (component.componentWillAppear) {
      component.componentWillAppear(
        this._handleDoneAppearing.bind(this, key)
      );
    } else if (component.WrappedComponent && component.WrappedComponent.componentWillAppear) {
      component.WrappedComponent.componentWillAppear(
        this._handleDoneAppearing.bind(this, key)
      );
    } else {
      this._handleDoneAppearing(key);
    }
  }

  _handleDoneAppearing(key) {
    var component = this.refs[key];

    if (component.componentDidAppear) {
      component.componentDidAppear();
    } else if (component.WrappedComponent && component.WrappedComponent.componentDidAppear) {
      component.WrappedComponent.componentDidAppear();
    }

    delete this.currentlyTransitioningKeys[key];

    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
      this.props.children
    );

    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      // This was removed before it had fully appeared. Remove it.
      this.performLeave(key);
    }
  }

  performEnter(key) {
    this.currentlyTransitioningKeys[key] = true;

    var component = this.refs[key];

    if (component.componentWillEnter) {
      component.componentWillEnter(
        this._handleDoneEntering.bind(this, key)
      );
    } else if (component.WrappedComponent && component.WrappedComponent.componentWillEnter) {
      component.WrappedComponent.componentWillEnter(
        this._handleDoneEntering.bind(this, key)
      );
    } else {
      this._handleDoneEntering(key);
    }
  }

  _handleDoneEntering(key) {
    var component = this.refs[key];

    if (component.componentDidEnter) {
      component.componentDidEnter();
    } else if (component.WrappedComponent && component.WrappedComponent.componentDidEnter) {
      component.WrappedComponent.componentDidEnter();
    }

    delete this.currentlyTransitioningKeys[key];

    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
      this.props.children
    );

    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      // This was removed before it had fully entered. Remove it.
      this.performLeave(key);
    }
  }

  performLeave(key) {
    this.currentlyTransitioningKeys[key] = true;

    var component = this.refs[key];

    if (component.componentWillLeave) {
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    } else if (component.WrappedComponent && component.WrappedComponent.componentWillLeave) {
      component.WrappedComponent.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    } else {
      // Note that this is somewhat dangerous b/c it calls setState()
      // again, effectively mutating the component before all the work
      // is done.
      this._handleDoneLeaving(key);
    }
  }

  _handleDoneLeaving(key) {
    var component = this.refs[key];

    if (component.componentDidLeave) {
      component.componentDidLeave();
    } else if (component.WrappedComponent && component.WrappedComponent.componentDidLeave) {
      component.WrappedComponent.componentDidLeave();
    }

    delete this.currentlyTransitioningKeys[key];

    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
      this.props.children
    );

    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
      // This entered again before it fully left. Add it again.
      this.performEnter(key);
    } else {
      this.setState(function(state) {
        var newChildren = assign({}, state.children);
        delete newChildren[key];
        return {children: newChildren};
      });
    }
  }

}
