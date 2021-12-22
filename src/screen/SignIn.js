import React, { useContext, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { AuthContext } from '../components/context'

export default function SignIn({navigation}) {

    const {signIn} = useContext(AuthContext)

    const [userName, setUserName] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const loginHandle = () => {

    }

    return (
        <View style = {StyleSheet.container}>
            <Text>SignIn</Text>
            <TextInput
                placeholder = 'Enter user name'
                onChangeText = {(value) => setUserName(value)}
            />
            <TextInput
                placeholder = 'Enter password'
                onChangeText = {(value) => setPassword(value)}
            />

            <Button title = 'Sign In' onPress = {() => {signIn(userName, password)}}/>

            <Button title = 'Create Account' onPress = {() => navigation.navigate('SignUp')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    }
})