import React, { useEffect, useState } from 'react';
import { connect } from "react-redux"
import userActions from "../../redux/Action/userActions"
import { TouchableOpacity, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

import { LinearGradient } from 'expo-linear-gradient';

const FormSignUp = ({ createAcountWithPhoto, navigation }) => {
    const [form, setForm] = useState({ user: "", email: "", password: "", urlImg: "ksdf" })
    const [image, setImage] = useState(null);
    const [inputText, setInputText] = useState("Select a file")

    const sendForm = () => {
        
        createAcountWithPhoto( form, image.uri )
        .then( res => res === true ? navigation.navigate("Home"): Toast.show({
            text1: res,
            type: 'error',
            position: 'bottom',
        }) )
    
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            /* base64:true,
            exif:true */
        });
        if (!result.cancelled) {
            setImage(result);
        }
    };

    return (
        <ImageBackground style={styles.containerForm} source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/05/pexels-sameera-ganegoda-2234783-scaled.jpg' }}>

            <View style={styles.containerInputs}>
                <Text style={styles.titleFormSignIn}>Sign up</Text>

                <Input
                    onChangeText={v => setForm({ ...form, user: v })}
                    placeholder='Nick Name'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='#1F1F1F'
                            type='font-awesome-5'

                        />
                    }
                    style={{ color: '#1F1F1F', }}

                />
                <Input
                    onChangeText={v => setForm({ ...form, email: v })}
                    placeholder='Email'
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color='#1F1F1F'
                            type='font-awesome-5'
                        />
                    }
                    style={{ color: '#1F1F1F' }}

                />

                <TouchableOpacity style={styles.buttonSendPick} onPress={pickImage}>
                    <Icon
                        name='camera'
                        size={24}
                        color='#1F1F1F'
                        type='font-awesome-5'
                        style={{ marginRight: 10, marginLeft: 10 }}
                    />
                    <Text style={{ marginRight: 10, marginLeft: 10 }} >{inputText}</Text>
                </TouchableOpacity>

                {/*    <Input
                    onPress={pickImage}
                    onChangeText={v => setForm({ ...form, urlImg: v })}
                    placeholder='Profile user'
                    leftIcon={
                        <Icon
                            name='camera'
                            size={24}
                            color='#1F1F1F'
                            type='font-awesome-5'
                            onPress={pickImage}
                        />
                    }
                    value={image && image.uri}
                    disabled
                    style={{ color: '#1F1F1F' }}
                    placeholderTextColor='#1F1F1F'

                />
 */}
                <Input
                    onChangeText={v => setForm({ ...form, password: v })}
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            name='key'
                            size={24}
                            color='#1F1F1F'
                            type='font-awesome-5'
                        />
                    }
                    secureTextEntry={true}
                    style={{ color: '#1F1F1F' }}
                />


                <LinearGradient style={styles.buttonAddCart}
                    colors={['#4158d0', '#c850c0', '#ffcc70']}
                    start={{ y: 0.4, x: 0.9 }}
                    end={{ y: 0.2, x: 0 }}
                >
                    <Button
                        type="clear"
                        title="Sign up"
                        onPress={sendForm}
                        buttonStyle={{
                            width: '100%', height: '100%', shadowColor: "#000",
                            shadowOffset: {
                                width: 10,
                                height: 10,
                            },
                            elevation: 2,
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                        }}
                        titleStyle={{ fontFamily: 'Montserrat_700Bold', color: 'white' }}
                    />
                </LinearGradient>
            </View>

        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    containerInputs: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: "100%",
        height: "80%",
        padding: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'flex-start'
    },
    containerForm: {
        width: "100%",
        height: "100%",
        /* alignItems: 'center', */
        justifyContent: 'flex-end',
    },
    titleFormSignIn: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
        color: 'black',
        marginBottom: 40,
    },
    buttonSendPick: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#1F1F1F',
        borderStyle: 'solid',
        width: "95%",
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonAddCart: {
        width: 300,
        marginBottom: 15,
        marginTop: 15,
        height: 50,

    },



})

const mapDispatchToProps = {
    createAcountWithPhoto: userActions.createAcountWithPhoto
}


export default connect(null, mapDispatchToProps)(FormSignUp)