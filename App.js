import React from 'react';
import { View,Text,StyleSheet,Switch} from 'react-native';
import { Constants } from 'expo';

const ardBoard =  'http://geninhofloripa.ddns.net:82/PIN';

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
            pins: {
                workLight: { id: 62, text: 'Work Lights', checked: false },
                deskLight: { id: 48, text: 'Desk Lights', checked: false },
                portchLight: { id: 26, text: 'Portch Lights', checked: false },
            }
        };
    }

    togglePinState(key) {
        this.setState((prevState) => {
            //update internal state
            pins: {
                ...prevState.pins,
                [key] : {
                    id: prevState.pins[key].id,
                    text: prevState.pins[key].text,
                    checked: !prevState.pins[key].checked
                }
            }
        }, (state) => {
            //call Arduino wit new state
            this.updatePinOnArduino(state.pins[key]);
        })
    }

    updatePinOnArduino(pin) {
        const action = pin.checked ? 'ON' : 'OFF';
        const url = ardBoard + pin.id + '=' + action;

        fetch(url)
        .then(response => console.log(pin.text + ' is ' + action))
        .done();
    }

    render() {
        const pins = this.state.pins;
        console.log(pins);
        return (
            <View style={styles.appContainer}>
                <Text>Chalet Digital – Beta MVP – React-Native App</Text>
                {Object.keys(pins).map((key) => (
                    <Pin
                      key={key}
                      onToggle={this.togglePinState(key)}
                      pin={pins[key]}
                    />
                ))}
            </View>
        );
    }
}
