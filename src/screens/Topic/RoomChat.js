import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    FlatList,
    Dimensions,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default function RoomChat({ navigation }) {

    // const route = useRoute()

    const [chatUser] = useState({
        name: 'BAS',
        profile_image: 'https://media.istockphoto.com/id/1351571961/photo/looking-directly-up-at-the-skyline-of-the-financial-district-in-central-london.jpg?b=1&s=170667a&w=0&k=20&c=ScoPcmVztzvi771qPgGSvhA50WDt7gOM7361Ei0ODww=',
        last_seen: 'online',
    });

    const [currentUser] = useState({
        name: 'tmchi',
    });

    const [messages, setMessages] = useState([
        { sender: 'tmchi', message: 'Dạ mng ơi, ngày mai 10h mình discuss lại cái feature [OP] Payment nha!', time: '6:01 PM' },
        {
            sender: 'nhhoa',
            message: 'Dạ oki ạ',
            time: '6:02 PM',
        },
    ]);

    const [inputMessage, setInputMessage] = useState('');

    function getTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function sendMessage() {
        if (inputMessage === '') {
            return setInputMessage('');
        }
        let t = getTime(new Date());
        setMessages([
            ...messages,
            {
                sender: currentUser.name,
                message: inputMessage,
                time: t,
            },
        ]);
        setInputMessage('');
    }

    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        style={{ paddingRight: 10 }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            size={30}
                            color='#fff'
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.userProfileImage}
                        source={{ uri: chatUser.profile_image }}
                    />
                    <View
                        style={{
                            paddingLeft: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
                            {chatUser.name}
                        </Text>
                        <Text style={{ color: '#fff', fontWeight: '300' }}>
                            {chatUser.last_seen}
                        </Text>
                    </View>
                </View>
            ),
            // headerRight: () => (
            //     <TouchableOpacity
            //         style={{ paddingRight: 10 }}
            //         onPress={() => {
            //             Alert.alert('Audio Call', 'Audio Call Button Pressed');
            //         }}
            //     >
            //         <Icon name='call' size={28} color='#fff' />
            //     </TouchableOpacity>
            // ),
        });
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: '#f2f2ff' }}
                    inverted={true}
                    data={JSON.parse(JSON.stringify(messages)).reverse()}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback>
                            <View style={{ marginTop: 6 }}>
                                <View
                                    style={{
                                        maxWidth: Dimensions.get('screen').width * 0.8,
                                        backgroundColor: '#3a6ee8',
                                        alignSelf:
                                            item.sender === currentUser.name
                                                ? 'flex-end'
                                                : 'flex-start',
                                        marginHorizontal: 10,
                                        padding: 10,
                                        borderRadius: 8,
                                        borderBottomLeftRadius:
                                            item.sender === currentUser.name ? 8 : 0,
                                        borderBottomRightRadius:
                                            item.sender === currentUser.name ? 0 : 8,
                                    }}
                                >

                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 16,
                                        }}
                                    >
                                        {item.message}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#dfe4ea',
                                            fontSize: 14,
                                            alignSelf: 'flex-end',
                                        }}
                                    >
                                        {item.time} @{item.sender}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />

                <View style={{ paddingVertical: 10 }}>
                    <View style={styles.messageInputView}>
                        <TextInput
                            defaultValue={inputMessage}
                            style={styles.messageInput}
                            placeholder='Message'
                            onChangeText={(text) => setInputMessage(text)}
                            onSubmitEditing={() => {
                                sendMessage();
                            }}
                        />
                        <TouchableOpacity
                            style={styles.messageSendView}
                            onPress={() => {
                                sendMessage();
                            }}
                        >
                            <Icon name='send' type='material' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    headerLeft: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
    container: {
        flex: 1,
        backgroundColor: '#f2f2ff',
    },
    messageInputView: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    messageInput: {
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
    },
    messageSendView: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
});