import React from "react"
import { StyleSheet, ScrollView, View, } from "react-native"
import { Avatar, Text, Input } from "react-native-elements"

const ModifyUser = ()=>{

return <ScrollView>
        
        <Text>User information</Text>

    <View>
        <Avatar />
        <Text>User</Text>

    </View>

    <View>
        <Text>Contact Information</Text>
        <View>
            <Text>City</Text>
            <Text>city</Text>
        </View>
        <View>
            <Text>Adress</Text>
            <Text>adrss</Text>
        </View>
        <View>
            <Text>Adress</Text>
            <Text>adrss</Text>
        </View>
    </View>


</ScrollView>

}

export default ModifyUser