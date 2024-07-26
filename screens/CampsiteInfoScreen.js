import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input } from 'react-native-elements';
import { postComment } from '../features/comments/commentsSlice';


const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    //homework week 2
    const [showModal, setShowModal] = useState(false); //homework week 2 task 1
    const [rating, setRating] = useState(5);  //homework week 2 task 2
    const [author, setAuthor] = useState(''); //homework week 2 task 2
    const [text, setText] = useState('') ; //homework week 2 task 2

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id 
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal); //this closes the modal
    };

    const resetForm = () => {
        setShowModal(false);
        setRating(5);
        setAuthor('');
        setText('');
    }

    const renderCommentItem = ({ item }) => {
        return(
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14}}>{item.text}</Text>
                <Rating     
                    startingValue={item.rating}
                    imageSize={10}
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                    readonly={true}
                />
                <Text style={{ fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return (
        <>
            <FlatList 
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 30,
                    paddingVertical: 30
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite 
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => 
                                dispatch(toggleFavorite(campsite.id))
                            }
                            onShowModal={() => setShowModal(!showModal)} 
                        />
                            <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType='Slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
             >
                <View
                    style={styles.modal}
                >
                    <Rating
                        showRating
                        startingValue={setRating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)} 
                        style={{paddingVertical: 10}}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={(author) => setAuthor(author)}
                        value={author}
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                        <View style={{margin: 10}}>
                            <Button
                                title='Submit'
                                color='#5637DD'
                                onPress={() =>{
                                    handleSubmit();
                                    resetForm();
                                }} //using two event handlers with arrow function in the same prop
                            >
                            </Button>
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    setShowModal(!showModal);
                                    resetForm();
                                }}
                                color='#808080'
                                title='Cancel'    
                            >
                            </Button>
                        </View>
                </View>            
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30,
        marginHorizontal: 15,
        marginTop: 15 
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginHorizontal: 15
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;