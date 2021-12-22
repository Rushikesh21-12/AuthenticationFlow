import React from 'react'
import { View, Text, Button } from 'react-native'

export default function SignUp({navigation}) {
    return (
        <View>
            <Text>SignUp</Text>
            <Button title = 'SignIn' onPress = {() => navigation.navigate('SignIn')}/>
        </View>
    )
}
