import React, { useContext, useLayoutEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../components/context'

export default function Home({navigation}) {

    const {signOut} = useContext(AuthContext)

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button title = 'Sign Out' onPress = {() => {signOut()}}/>
          ),
        });
    }, [navigation])

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title = 'Profile' onPress = {() => navigation.navigate('Profile')}/>
            <Button title = 'Details' onPress = {() => navigation.navigate('Details')}/>
        </View>
    )
}
