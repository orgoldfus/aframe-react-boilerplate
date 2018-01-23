import 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import Selector from './selector'
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectorColor: 'white',
      shouldSnow: false,
      shouldAnimate: false,
      animation: undefined
    }
  }

  changeSelectorColor() {
    const colors = ['red', 'orange', 'green', 'yellow', 'blue', 'white'];
    let nextColorIndex = Math.floor(Math.random() * colors.length)
    if(colors[nextColorIndex] === this.state.selectorColor) {
      nextColorIndex = (nextColorIndex + 1) % colors.length
    }

    this.setState({
      selectorColor: colors[nextColorIndex]
    });
  }

  toggleSnow() {
    this.setState({
      shouldSnow: !this.state.shouldSnow
    });
  }

  toggleAnimation() {
    this.setState({
      shouldAnimate: !this.state.shouldAnimate
    });
  }

  render () {
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" alt='floor'/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" alt='sky'/>
        </a-assets>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        {
          this.state.shouldSnow && 
          <Entity particle-system={{preset: 'snow', particleCount: 10000}} disabled/>
        }
        <Entity text={{value: 'Try Me!', align: 'center'}} position={{x: 0, y: 2, z: -2}}/>

        <Selector 
          position={{x: 1.4, y: 1.5, z: -3}}
          rotation={{x: 0, y: -20, z: 0}}
          text="Change \nmy color"
          color={this.state.selectorColor}
          onClick={this.changeSelectorColor.bind(this)}
        />
        <Selector 
          position={{x: 0, y: 1.5, z: -3.2}}
          rotation={{x: 0, y: 0, z: 0}}
          text="Snow"
          color="white"
          onClick={this.toggleSnow.bind(this)}
        />
        <Selector 
          position={{x: -1.4, y: 1.5, z: -3}}
          rotation={{x: 0, y: 20, z: 0}}
          text="Dance"
          color="white"
          animation={
              this.state.shouldAnimate ? 
              {property: 'rotation', dur: 2000, loop: true, to: '360 360 360'} : 
              undefined
            }
          onClick={this.toggleAnimation.bind(this)}
        />

        <Entity primitive="a-camera">
          {/* <Entity primitive="a-cursor" fuse={true} /> */}
          <Entity laser-controls="hand: left" />
          <Entity laser-controls="hand: right" />
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
