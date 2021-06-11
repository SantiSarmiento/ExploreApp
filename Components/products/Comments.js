import React, { useEffect, useState } from "react"
import { View, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message';
import { Input, Icon, Text } from 'react-native-elements';
import Comment from "./Comment";
import { connect } from "react-redux";
import commentsActions from '../../redux/Action/commentsActions'


const Comments = (props) => {
    const { renderComment, setRenderComment } = props
    const [loadingComment, setLoadingComment] = useState(true)
    const [newComment, setNewComment] = useState({
        mensaje: "",
    })

    const commentInput = (e) => {
        setNewComment({
            ...newComment,
            mensaje: e
        })
    }


    const addComment = async () => {

        if (props.usuarioStatus) {
            var response = await props.fetchComments({ comment: newComment.mensaje, token: props.usuarioStatus.token }, props.idArticle)
            if (response) {
                setRenderComment(response)
                setNewComment({
                    ...newComment,
                    mensaje: ""
                })
            }
        } else {
            Toast.show({
                text1: 'You must be logged in to comment',
                type: 'error',
                position: 'bottom',
            });
        }

    }

    const deleteComment = async (id) => {
        var response = await props.deleteComment(id, props.idArticle)
        setRenderComment(response)
        /*         props.socket.emit('NewMessage') */
    }

    const updateComment = async (id, comment) => {

        var response = await props.updateComment(comment, props.idArticle, id)
        setRenderComment(response)
        /*         props.socket.emit('NewMessage') */
    }


    return (
        <View>

            {renderComment.map(comment => <Comment deleteComment={deleteComment} updateComment={updateComment} key={comment._id} comment={comment} />)}
            <View style={styles.containerInputAndButton}>
                <Input
                    placeholder="Comment"
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={commentInput}
                    containerStyle={styles.inputComment}
                    value={newComment.mensaje}
                />
                <Icon onPress={addComment} name='paper-plane' type='font-awesome-5' size={35} color='#032e50' />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    containerInputAndButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20
    },
    inputComment: {
        width: "90%",
    }
})

const mapStateToProps = state => {
    return {
        articles: state.cart.articles,
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {
    fetchComments: commentsActions.fetchComments,
    deleteComment: commentsActions.deleteComment,
    updateComment: commentsActions.updateComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)