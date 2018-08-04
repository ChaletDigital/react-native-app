import React from 'react';
import { View,Text,StyleSheet,Switch} from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },
});

const Pin = props => (
  <View style={styles.pinContainer}>
    <Switch value={props.pin.checked} onValueChange={props.onToggle} />
    <Text>{props.pin.text}</Text>
  </View>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      worklightPin: { id: 62, text: 'Worklight', checked: false },
    };
  }

   setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  toggleWorklightState() {
    this.updateWorklightState(!this.state.worklightPin.checked);
    this.setState({
      worklightPin: {
        id: this.state.worklightPin.id,
        text: this.state.worklightPin.text,
        checked: !this.state.worklightPin.checked,
        },
    });
  }

  updateWorklightState(newState) {
    const action = newState ? 'ON' : 'OFF'
    var url = 'http://geninhofloripa.ddns.net:82/PIN' + this.state.worklightPin.id + '=' + action;

   fetch(url)
    .then(response => console.log('Light is ' + action))
    .done();
}

  render() {
    return (
      <View style={styles.appContainer}>
        <Text>Chalet Digital – Beta MVP – React-Native App</Text>
        <Pin
          onToggle={() => this.toggleWorklightState()}
          pin={this.state.worklightPin}
        />
      </View>
    );
  }
}
