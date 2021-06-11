import React, { useEffect, useState } from "react"
import { StyleSheet, ScrollView, View, Text, TextInput } from "react-native"
import SelectPicker from 'react-native-form-select-picker';
import { Button } from "react-native-elements"
import axios from 'axios'
import Toast from 'react-native-toast-message';

const Checkout = ({ navigation, route: { params } }) => {
    const [countries, setCountries] = useState([])
    const [form, setForm] = useState({ email: "", firstName: "", lastName: "", adress: "", apartment: "", city: "", country: "a", postCode: "", phone: "" })

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => setCountries(response.data))
            .catch(error => console.log(error))

    }, [])
    const changeValueInput = (e, campo) => {
        setForm({
            ...form,
            [campo]: e
        })
    }

    return <>
        <ScrollView style={styles.mainContainer}>

            <View>

                <View style={{ flexDirection: 'row', margin: 2 }}>
                    <View style={{ width: "47%", marginLeft: 10 }}>
                        <Text style={{
                            fontFamily: 'Montserrat_700Bold',
                            fontSize: 20
                        }}>First name</Text>
                        <TextInput onChangeText={v => setForm({ ...form, firstName: v })} style={styles.input} placeholder="First name" />
                    </View>
                    <View style={{ width: "47%", marginLeft: 10 }}>
                        <Text style={{
                            fontFamily: 'Montserrat_700Bold',
                            fontSize: 20
                        }}>Last name</Text>
                        <TextInput onChangeText={v => setForm({ ...form, lastName: v })} style={styles.input} placeholder="Last name" />
                    </View>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{
                        fontFamily: 'Montserrat_700Bold',
                        fontSize: 20
                    }}>Email</Text>
                    <TextInput onChangeText={v => setForm({ ...form, email: v })} style={styles.input} placeholder="Email" />
                </View>
                <View style={{ margin: 10 }}>
                    <Text style={{
                        fontFamily: 'Montserrat_700Bold',
                        fontSize: 20
                    }}>Country </Text>
                    <SelectPicker default="Choose a country"
                        onValueChange={(e) => changeValueInput(e, "country")}
                        placeholderStyle={{ color: 'black' }}
                        label="Country"
                        style={styles.input}
                        placeholder='Country'
                    >
                        {countries.map((country) => (<SelectPicker.Item label={country.name} value={country.name} key={country.name} />))}
                    </SelectPicker>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{
                        fontFamily: 'Montserrat_700Bold',
                        fontSize: 20
                    }}>Adress</Text>
                    <TextInput onChangeText={v => setForm({ ...form, adress: v })} style={styles.input} placeholder="Adress" />
                </View>
                <View style={{ margin: 10 }}>
                    <Text style={{
                        fontFamily: 'Montserrat_700Bold',
                        fontSize: 20
                    }}>City </Text>
                    <TextInput onChangeText={v => setForm({ ...form, city: v })} style={styles.input} placeholder="City" />
                </View>

                <View style={{ flexDirection: 'row', margin: 2 }}>
                    <View style={{ width: "47%", marginLeft: 10 }}>
                        <Text style={{
                            fontFamily: 'Montserrat_700Bold',
                            fontSize: 20
                        }}>Apartment </Text>
                        <TextInput onChangeText={v => setForm({ ...form, apartment: v })} style={styles.input} placeholder="Apartment" />
                    </View>

                    <View style={{ width: "47%", marginLeft: 10 }}>
                        <Text style={{
                            fontFamily: 'Montserrat_700Bold',
                            fontSize: 20
                        }}>Post code </Text>
                        <TextInput onChangeText={v => setForm({ ...form, postCode: v })} style={styles.input} placeholder="Post code" />
                    </View>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{
                        fontFamily: 'Montserrat_700Bold',
                        fontSize: 20
                    }}>Phone </Text>
                    <TextInput onChangeText={v => setForm({ ...form, phone: v })} style={styles.input} placeholder="Phone" />
                </View>

            </View>

            <Button
                title="Let's do it"
                buttonStyle={styles.payButton}
                onPress={() => {

                    console.log(Object.values(form).some(value => value.trim() === ""))
                    !Object.values(form).some(value => value.trim() === "")
                        ? navigation.navigate("CreditCard", { form, cart: params.cart, total: params.total })
                        : Toast.show({
                            text1: 'you must complete all fields',
                            type: 'error',
                            position: 'bottom',
                        })
                }}
            />


        </ScrollView>

        <View style={styles.totalCotainer}>
            <Text style={styles.textTotal}>Total to pay</Text>
            <Text style={styles.textTotal}>€ {params.total}</Text>
        </View>
    </>
}

export default Checkout


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    containers: {
        margin: "0.5%"
    },
    texts: {
        fontSize: 15,

    },
    input: {
        height: 45,
        borderColor: "#CDCDCD",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        backgroundColor: 'white'
    },
    select: {
        height: 50,
        width: 50
    },
    totalCotainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4%",
        backgroundColor: "#2188DD",
        borderTopWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    textTotal: {
        fontSize: 17,
        color: 'white',
        fontFamily: 'Montserrat_700Bold',

    },
    payButton: {
        margin: "3%",
        backgroundColor: "green"
    }
})