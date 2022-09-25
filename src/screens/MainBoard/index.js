import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ToastAndroid, Modal, StyleSheet, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import Theme from '../../theme/Theme'
import { List, Button, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import addTopicForm from '../Form/AddTopic'
import { Formik } from 'formik';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const MainBoard = ({ navigation }) => {
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
        }
    ]
    return (
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
                    <Text style={{ marginLeft: 8, color: '#fff' }}>T-Building's Workspace</Text>
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

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 40,
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}
                >
                    <Text>
                        Total number of topics available: {taskList.length}
                    </Text>
                    <Button
                        icon="plus"
                        mode="elevated"
                        onPress={() => {
                            console.log('Add Topic')
                            setModalOpen(true)
                        }}
                        style={{
                            backgroundColor: Theme.colors.third
                        }}
                    >
                        Add Topic
                    </Button>
                </View>

                {taskList.map(task => (
                    <List.Item
                        key={task.id}
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#ccc"
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
            </View>
        </SafeAreaView >
    );
};

export default MainBoard; 