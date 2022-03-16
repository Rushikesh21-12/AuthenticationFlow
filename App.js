import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import {AuthContext} from './src/components/context'

import SignIn from './src/screen/SignIn';
import SignUp from './src/screen/SignUp';
import SplashScreen from './src/screen/SplashScreen';

import Home from './src/screen/Home';
import Details from './src/screen/Details';
import Profile from './src/screen/Profile';

import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator>
    <RootStack.Screen name = 'SplashScreen' component = {SplashScreen}/>
    <RootStack.Screen name = 'SignIn' component = {SignIn}/>
    <RootStack.Screen name = 'SignUp' component = {SignUp}/>
  </RootStack.Navigator>
)

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name = 'Home' component = {Home}/>
    <HomeStack.Screen name = 'Profile' component = {Profile}/>
    <HomeStack.Screen name = 'Details' component = {Details}/>
  </HomeStack.Navigator>
)

export default function App(){

  // const [isLoading, setIsLoading] = useState(true)
  // const [userToken, setUserToken] = useState(null)

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    username: null
  }

  const loginReducer = (state, action) => {
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return {...state, userToken: action.token, isLoading: false}
      case 'LOGIN':
        return {...state, userToken: action.token, username: action.id, isLoading: false}
      case 'LOGOUT':
        return {...state, userToken: null, userNam: null, isLoading: false}
      case 'REGISTER':
        return {...state, userToken: action.token, username: action.id, isLoading: false}
    }
  }
//completed
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async(userName, password) => {
      let userToken
      userToken = null
      if(userName == 'user' && password == 'pass'){
        try{
          userToken = 'abc'
          await AsyncStorage.setItem('userToken', userToken)
        } catch(e){
          console.log(e)
        }
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken})
    },

    signOut: async() => {
      try{
        await AsyncStorage.removeItem('userToken')
      } catch(e){
        console.log(e)
      }
      dispatch({type: 'LOGOUT'})
    },

    signUp: () => {
    }
  }), [])

  useEffect(() => {
    setTimeout(async() => {
      let userToken
      userToken = null
      try{
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e){
        console.log(e)
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    }, 1000);
  }, [])

  if(loginState.isLoading){
    return(
      <View style = {{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size = 'large'/>
      </View>
    )
  }

  return(
    <AuthContext.Provider value = {authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
            <HomeStackScreen/>
          ) 
        : 
          <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
    
  )
}