import React from 'react';
import { get } from 'lodash';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

// Utils
import { getCurrentAndNextTemperater, getPredictTemprature } from './utils/api';

// Source icon
import background from './assets/forest.jpg';
import tempbg from './assets/temp.png';
import humbg from './assets/hum.png';
import temp from './assets/temperature.png';
import humidity from './assets/humidity.png';
// Main component
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemprature: null,
      currentHumid: null,
      predictTemprature: null,
      predictHumid: null,
      predictTemperatureBaseInput: null,
      inputValue: null,
      isLoading: false
    }

    this.handleLoopCycleUpdate = this.handleLoopCycleUpdate.bind(this);

  }

  handleLoopCycleUpdate() {
    setInterval(() => this.serverRender(), 6000);
  }

  componentDidMount() {
    // this.serverRender();
    this.handleLoopCycleUpdate();
  }

  serverRender = async () => {
    this.setState({}, async () => {
      const resData = await getCurrentAndNextTemperater();
      this.setState({
        currentTemprature: get(resData, 'currentTemprature'),
        predictTemprature: get(resData, 'predictTemprature'),
        currentHumid: get(resData, 'currentHumid'),
        predictHumid: get(resData, 'predictHumid')
      })
    })
  }

  handleInput = (value) => {
    let regrexCheck = value.match(/^\d+$/);
    console.log('regrex check', regrexCheck);
    regrexCheck ? this.setState({
      inputValue: value
    }) : this.setState({ inputValue: null });
  }

  getCalNextTemperature = () => {
    if (!this.state.inputValue) {
      return;
    }
    this.setState({ isLoading: true })
    this.setState({}, async () => {
      const { next } = await getPredictTemprature(this.state.inputValue);
      this.setState({
        predictTemperatureBaseInput: next,
        isLoading: false
      });
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={styles.image}
          source={background}
        >
          <View style={styles.detailsContainer}>
            <View style={{ position: "absolute", top: 110, right: 50 }}>
              <Image source={humbg} style={{
                flex: 1,
                resizeMode: 'cover',
              }} />
              <Text style={styles.humidity}>
                <Text style={{ fontSize: 12 }}>
                  Humidity |
                  </Text>{this.state.currentHumid} %
                </Text>
            </View>
            <View style={{ position: 'absolute', top: 10, left: 10 }}>
              <Image source={tempbg} style={{
                flex: 1,
                resizeMode: 'cover',
              }} />
              <Text style={{ color: "#ffffff" }}>Today</Text>
              <View>
                <Text style={{ color: '#ffffff', fontSize: 12 }}>
                  <Text style={{ fontSize: 44 }}>{this.state.currentTemprature} °C </Text>
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', position: 'absolute', left: '18%', bottom: '30%' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={{ color: "#ffffff" }}>Current</Text>
                <View style={{ width: 100, height: 50, borderColor: '#f1f1f1', borderWidth: 2, margin: 2 }}>
                  <Text style={{ color: '#ffffff', height: '100%', lineHeight: 33 }}>
                    <Image source={temp} style={{ borderWidth: 2 }} />{this.state.currentTemprature} °C
                  </Text>
                </View>
                <View style={{ width: 100, height: 50, borderColor: '#f1f1f1', borderWidth: 2, margin: 2 }}>
                  <Text style={{ color: '#ffffff', height: '100%', lineHeight: 33 }}>
                    <Image source={humidity} style={{ borderWidth: 2 }} />{this.state.currentHumid} %
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={{ color: "#ffffff" }}>Predictional</Text>
                <View style={{ width: 100, height: 50, borderColor: '#f1f1f1', borderWidth: 2, margin: 2 }}>
                  <Text style={{ color: '#ffffff', height: '100%', lineHeight: 33 }}>
                    <Image source={temp} style={{ borderWidth: 2 }} />{this.state.predictTemprature} °C
                  </Text>
                </View>
                <View style={{ width: 100, height: 50, borderColor: '#f1f1f1', borderWidth: 2, margin: 2 }}>
                  <Text style={{ color: '#ffffff', height: '100%', lineHeight: 33 }}>
                    <Image source={humidity} style={{ borderWidth: 2 }} />{this.state.predictHumid} %
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '10%', left: '20%' }}>
              <TextInput onChange={(e) => this.handleInput(e.nativeEvent.text)}
                style={{ height: 40, borderWidth: 2, borderColor: '#ffffff', marginVertical: 10, paddingHorizontal: 10, color: '#ffffff' }}
                placeholder="Type here any temperature you want..." />
              <TouchableOpacity onPress={() => this.getCalNextTemperature()}
                style={{ height: 40, width: '50%', borderRadius: 40, backgroundColor: '#841584', justifyContent: 'center', alignItems: 'center' }}>
                {this.state.isLoading ? <ActivityIndicator animating={this.state.isLoading} /> :
                  (<Text style={{ color: '#ffffff', fontWeight: 'bold' }}>GET FUTURE</Text>)}
              </TouchableOpacity>
            </View>
            {this.state.predictTemperatureBaseInput &&
              <Text style={{ fontSize: 15, color: '#ffffff', marginBottom: 1, position: 'absolute', bottom: 20, left: "30%", fontWeight: 'bold' }}>
                The temperature next is: {this.state.predictTemperatureBaseInput} °C
            </Text>}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

/* StyleSheet */
const styles = StyleSheet.create({
  humidity: { color: '#ffffff', fontSize: 44 },
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  borderInfo: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FF5722',
    color: '#fff',
    backgroundColor: '#CDDC39',
    padding: 12,
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});