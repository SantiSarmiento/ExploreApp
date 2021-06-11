import React, { useEffect, useState } from "react"
import Toast from 'react-native-toast-message';
import { ScrollView, View, Text, Image, StyleSheet, ImageBackground, Pressable, Alert } from "react-native"
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from "react-redux";

const Comment = (props) => {

    const { deleteComment, updateComment, comment: { userId: { email, urlImg, user }, comment, _id } } = props

    const [changeInput, setChangeInput] = useState(false)
    const [ownerComment, setOwnerComment] = useState(false)
    const [newComment, setNewComment] = useState({
        comment: comment,
    })

    const commentInput = (e) => {
        setNewComment({
            ...newComment,
            comment: e
        })
    }

    const deleteCommentUser = () => {

        Alert.alert(
            "Delete Comment",
            "Are you sure you want to delete your comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Delete", onPress: () => deleteComment(_id) }
            ]
        );
    }

    useEffect(() => {
        if (props.usuarioStatus) {
            if (email === props.usuarioStatus.email) {
                setOwnerComment(!ownerComment)
            }
        }
    }, [props.usuarioStatus])

    const ola = () => {

        if (newComment.comment.length !== 0) {
            updateComment(_id, newComment)
            setChangeInput(!changeInput)
        } else {
            Toast.show({
                text1: 'The fields must be complete',
                type: 'error',
                position: 'bottom',
            });
        }
    }

    return (
        <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
                <Image style={styles.fotoUser} source={{ uri: urlImg }} />
                <Text style={{ marginLeft: 10, fontSize: 25, }}  >{user}</Text>
            </View>
            <View>
                {changeInput
                    ? <View style={styles.containerInputAndButton}>
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={commentInput}
                            containerStyle={styles.inputComment}
                            value={newComment.comment}
                        />
                        <Icon onPress={ola} name='paper-plane' type='font-awesome-5' size={35} color='#032e50' />
                    </View>
                    : <Text style={{ marginLeft: 10, fontSize: 20, marginTop: 10, marginBottom: 10 }}>{comment}</Text>
                }
            </View>
            {
                ownerComment &&
                <View style={styles.optionComment}>
                    <Pressable onPress={() => setChangeInput(!changeInput)} >
                        <Text style={styles.buttonComment}>Edit</Text>
                    </Pressable>
                    <Pressable onPress={deleteCommentUser} >
                        <Text style={styles.buttonComment}>Delete</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({

    containerComment: {
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,

    },

    containerInfoUser: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoUser: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    optionComment: {
        backgroundColor: "white",
        flexDirection: 'row'
    },
    buttonComment: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5
    },

    containerInputAndButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    inputComment: {
        width: "90%",
    }


})

mapStateToProps = (state) => {
    return {
        usuarioStatus: state.user.usuarioStatus
    }
}
export default connect(mapStateToProps)(Comment)