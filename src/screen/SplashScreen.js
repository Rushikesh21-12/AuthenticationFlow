import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function SplashScreen({navigation}) {
    return (
        <View style = {styles.container}>
            <Text>Splash Screen</Text>
            <Button title = 'Get started' onPress = {() => navigation.navigate('SignIn')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
