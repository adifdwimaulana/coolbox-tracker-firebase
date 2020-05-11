import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Map from './src/components/Map.js';
import Data from './src/components/Data';

console.disableYellowBox = true;

class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Data />
      </ScrollView>
    )
  }
}

class MapScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    )
  }
}

class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}


const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
          </View>
        ),
      }
    },
    Track: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'map-marker'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'cog'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#92c5c2',
        barStyle: { backgroundColor: '#2c6d6a' },
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: { backgroundColor: '#6948f4' },
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});