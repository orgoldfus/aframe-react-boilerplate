import 'aframe';
import 'aframe-animation-component';
import 'babel-polyfill';
import {Entity} from 'aframe-react';
import React from 'react';

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
        <Entity id="box"
          position={this.props.position}
          rotation={this.props.rotation}
          geometry={{primitive: 'box', depth: 0.1}}
          material={{color: this.props.color, opacity: 0.6}}
          events={{click: this.props.onClick}}
          animation__in={{property: 'scale', startEvents: 'mouseenter', to: '1.2 1.2 1.2', dur: 300}}
          animation__out={{property: 'scale', startEvents: 'mouseleave', to: '1 1 1', dur: 300}}
          animation__rotate={this.props.animation}>
          <Entity primitive="a-text" value={this.props.text} align="center"/>
        </Entity>
    );
  }
}

Selector.propTypes = {
  position: React.PropTypes.object.isRequired,
  rotation: React.PropTypes.object.isRequired,
  animation: React.PropTypes.object,
  text: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
}
