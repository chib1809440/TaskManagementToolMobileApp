import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ToastAndroid, Modal, StyleSheet, Keyboard, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Theme from '../../theme/Theme'
import { List, Button, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import addTopicForm from '../Form/AddTopic'
import { Formik } from 'formik';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
const MainBoard = ({ navigation }) => {
    const route = useRoute()
    const [modalOpen, setModalOpen] = React.useState(false)
    const taskList = [
        {
            id: 1,
            name: 'FaceID',
            topic: 'FaceID'
        },
        {
            id: 2,
            name: 'Booking',
            topic: 'Booking'
        },
        {
            id: 3,
            name: 'Payment',
            topic: 'Payment'
        },
        {
            id: 4,
            name: 'VS',
            topic: 'VS'
        },
        {
            id: 5,
            name: 'VS',
            topic: 'VS'
        },
        {
            id: 7,
            name: 'VS',
            topic: 'VS'
        },
        {
            id: 8,
            name: 'VS',
            topic: 'VS'
        },
        {
            id: 9,
            name: '9',
            topic: '9'
        }
    ]
    return (
        console.log("route.params: ", route),
        <SafeAreaView style={{ flex: 1 }}>
            <Modal visible={modalOpen} animationType='slide'>
                <View
                    style={{ flex: 1 }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: Theme.colors.third,
                            color: "#fff"
                        }}
                    >
                        <MaterialIcons
                            name='close' size={32}
                            color={'#fff'}
                            onPress={() => {
                                console.log('Add Topic')
                                setModalOpen(false)
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: "#fff"
                            }}
                        >
                            Add Topic
                        </Text>
                        <MaterialIcons
                            name='check' size={32}
                            color={'#fff'}
                            onPress={() => {
                                console.log('Add Topic')
                                setModalOpen(false)
                            }}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {/* <addTopicForm addReview={addTopicForm} /> */}
                        <TextInput
                            // style={globalStyles.input}
                            placeholder='Review title'
                            // onChangeText={props.handleChange('title')}
                            // value={props.values.title}
                            value={""}
                        />
                    </TouchableWithoutFeedback>
                </View>

            </Modal>

            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 40,
                        alignItems: 'center',
                        backgroundColor: Theme.colors.third,
                    }}
                >
                    <Text
                        style={{ marginLeft: 8, color: '#fff' }}>{route.params?.workSpaceId || 'T-Buiding Workspace'}
                    </Text>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            console.log("onPress Menu Wordspace")
                            navigation.navigate('Menu WorkSpaces')
                        }}
                    >
                        <Icon
                            name='ellipsis-h'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ backgroundColor: Theme.colors.background }}>
                    {taskList.map(task => (
                        <List.Item
                            key={task.id}
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "#ccc",
                                backgroundColor: Theme.colors.background,
                            }}
                            title={task.name}
                            description={task.topic}
                            left={props => <List.Icon {...props} icon="tag" />}
                            onPress={() => {
                                console.log("onPress to switch topic screen :", task.id)
                                navigation.navigate('Topic', {
                                    screen: 'TopicMain',
                                    params: { id: task.id, name: task.name },
                                })
                            }}
                        />
                    ))}
                </ScrollView>

                <View
                    style={{
                        position: 'absolute',
                        width: 80,
                        right: 20,
                        bottom: 10,
                        height: 38,
                        borderRadius: 30,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: Theme.colors.primary,
                            alignItems: 'center',
                            borderRadius: 30,
                        }}
                        onPress={() => {
                            console.log('Add Topic')
                            setModalOpen(true)
                        }}
                    >
                        <Icon
                            name='plus'
                            type='font-awesome'
                            color={'#fff'}
                            style={{
                                marginTop: 8
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default MainBoard; 