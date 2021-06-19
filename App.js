import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, LogBox } from 'react-native';
import Transaction from './screens/transaction';
import Search from './screens/search';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';


export default class App extends React.Component{

  render(){
    console.disableYellowBox=true;
    return (
      <AppContainer/>
    )
  }
}
const tabNavigator=createBottomTabNavigator({
  Transaction:{screen:Transaction},
  Search:{screen:Search}
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const routeName=navigation.state.routeName;
      if(routeName==="Transaction"){
        return(
          <Image source={require("./assets/book.png")} style={{width:40,height:40}}></Image>
        )
      }else if(routeName==="Search"){
        return(
          <Image source={require("./assets/searchingbook.png")} style={{width:40, height:40}}></Image>
        )
      }
    }
  })
})
const AppContainer=createAppContainer(tabNavigator);