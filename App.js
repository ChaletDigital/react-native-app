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
            worklightPin: { id: 62, text: 'WorkLights', checked: false },
            desklightPin: { id: 48, text: 'DeskLights', checked: false },
        };
    }



    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }




    toggleDesklightState() {
        this.updateDesklightState(!this.state.desklightPin.checked);
        this.setState({
            desklightPin: {
                id: this.state.desklightPin.id,
                text: this.state.desklightPin.text,
                checked: !this.state.desklightPin.checked,
            },
        });
    }



    updateDesklightState(newState) {
        const action = newState ? 'ON' : 'OFF'
        const url = 'http://geninhofloripa.ddns.net:82/PIN' + this.state.desklightPin.id + '=' + action;

        fetch(url)
        .then(response => console.log('DeskLight is ' + action))
        .done();
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
        const url = 'http://geninhofloripa.ddns.net:82/PIN' + this.state.worklightPin.id + '=' + action;

        fetch(url)
        .then(response => console.log('WorkLight is ' + action))
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

                <Pin
                    onToggle={() => this.toggleDesklightState()}
                    pin={this.state.desklightPin}
                />

            </View>
        );
    }


}
