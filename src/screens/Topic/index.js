import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Dimensions, ToastAndroid, FlatList } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import theme from '../../theme/Theme'
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const Topic = ({ navigation: { goBack }, navigation }) => {
    const route = useRoute();

    const [clickedAddTopic, setclickedAddTopic] = React.useState(false)
    const [text, setText] = React.useState("");
    const [TaskList, setTaskList] = React.useState([])
    const getTopic = [
        {
            id: 1,
            name: 'FaceID',
            topic: 'FaceID',
            listTask: [
                {
                    id: 1.1,
                    name: 'CRUD faceID'
                },
                {
                    id: 1.2,
                    name: 'sync faceID with MQTT'
                }
            ]
        }
    ]

    const Task = [
        {
            id: 1,
            listName: 'Todo',
            detail: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'First Item',
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Second Item',
                },
                // {
                //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
                //     title: 'Third Item',
                // },
                // {
                //     id: 'bd7acbea-c1b1-2222222-aed5-3ad53abb28ba',
                //     title: 'First Item',
                // },
                // {
                //     id: '3ac68afc-c605-43333338d3-a4f8-fbd91aa97f63',
                //     title: 'Second Item',
                // },
                // {
                //     id: '58694a0f-3da1-4444-bd96-145571e29d72',
                //     title: 'Third Item',
                // },
                // {
                //     id: 'bd7acbea-c1b1-3333444-aed5-3ad53abb28ba',
                //     title: 'First Item',
                // },
                // {
                //     id: '3ac68afc-c605-43333343434338d3-a4f8-fbd91aa97f63',
                //     title: 'Second Item',
                // },
                // {
                //     id: '58694a0f-3da1-4444434343-bd96-145571e29d72',
                //     title: 'Third Item',
                // },
                // {
                //     id: '58694a0f-3da1-4441114434343-bd96-145571e29d72',
                //     title: 'Third Item',
                // },
            ]
        },
        // {
        //     id: 2,
        //     listName: 'In Progress',
        //     detail: [
        //         {
        //             id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28222a',
        //             title: 'Three Item',
        //         },
        //         {
        //             id: '3ac68afc-c605-48d3-a4f8-fbd91aa973333f63',
        //             title: 'Four Item',
        //         },
        //         // {
        //         //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
        //         //     title: 'Third Item',
        //         // }
        //     ]
        // },
        // {
        //     id: 3,
        //     listName: 'In Review',
        //     detail: [
        //         {
        //             id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28222a',
        //             title: 'Five Item',
        //         },
        //         {
        //             id: '3ac68afc-c605-48d3-a4f8-fbd91aa973333f63',
        //             title: 'Six Item',
        //         },
        //         // {
        //         //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
        //         //     title: 'Third Item',
        //         // }
        //     ]
        // }
    ];
    const renderItem = ({ item }) => (
        <View key={item.id} style={{ marginBottom: 6 }}>
            <TouchableOpacity
                onPress={() => console.log("onPress", item.id)}
                style={styles.item}
            >
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );
    function componentDidMount() {
        setTimeout(() => { this.scrollView.scrollTo({ x: -30 }) }, 1) // scroll view position fix
    }
    React.useEffect(() => {
        console.log("useEffect")
    }, [TaskList])
    const onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        console.log("x: ", x)
        console.log("y: ", y)
        console.log("height: ", height)
        console.log("width: ", width)
    }
    return (
        console.log("route: ", route),
        console.log('TaskList: ', TaskList, TaskList.length),
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 40,
                    alignItems: 'center',
                    backgroundColor: theme.colors.third,
                }}
            >
                <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            console.log("onPress back list mainBoard")
                            goBack()
                        }}
                    >
                        <Icon
                            size={20}
                            name='arrow-left'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{ marginLeft: 8, color: '#fff', fontSize: 24 }}>
                        {route.params.name} - {route.params.id}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            console.log("onPress RoomChat")
                            navigation.navigate('RoomChat', { id: route.params.id })
                        }}
                    >
                        <Icon
                            size={20}
                            name='skype'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            // navigation.navigate('TestTopic')
                            console.log("onPress filter Topic")
                        }}
                    >
                        <Icon
                            size={20}
                            name='filter'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            // navigation.navigate('onPress Menu Wordspace')
                            console.log("onPress notification Topic")
                        }}
                    >
                        <Icon
                            size={20}
                            name='bell'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            // navigation.navigate('onPress Menu Wordspace')
                            console.log("onPress notification Topic")
                        }}
                    >
                        <Icon
                            size={20}
                            name='ellipsis-h'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView
                    // contentContainerStyle={{ flexGrow: 1, height: '100%' }}
                    // ref={(scrollView) => { this.scrollView = scrollView; }}
                    // style={styles.container}
                    //pagingEnabled={true}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    contentInset={{
                        top: 0,
                        left: 30,
                        bottom: 0,
                        right: 30,
                    }}>

                    {Task.length > 0
                        ? Task.map((taskItem) => {
                            return (
                                <View key={taskItem.id} style={styles.view}  >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            // marginVertical: 8,
                                            marginHorizontal: 4,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#fff',
                                            height: 36
                                        }}>
                                        <Text style={{
                                            marginHorizontal: 8,
                                            color: '#fff',
                                            fontSize: 20
                                        }}>{taskItem.listName}</Text>
                                        <TouchableOpacity
                                            style={{ paddingHorizontal: 8 }}
                                            onPress={() => {
                                                console.log("onPress setting list topic")
                                            }}
                                        >
                                            <Icon
                                                size={20}
                                                name='ellipsis-h'
                                                type='font-awesome'
                                                color={'#fff'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        onLayout={onLayout}
                                        style={{
                                            backgroundColor: "#f2f",
                                        }}>
                                        <FlatList
                                            data={taskItem?.detail}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                        />
                                        {/* {taskItem?.detail.map(item => {
                                            return (
                                                <View key={item.id} style={{ marginBottom: 6 }}>
                                                    <TouchableOpacity
                                                        onPress={() => console.log("onPress", item.id)}
                                                        style={styles.item}
                                                    >
                                                        <Text style={styles.title}>{item.title}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })} */}
                                    </View>
                                </View>
                            )
                        }) : ''
                    }

                    {clickedAddTopic == false
                        ?
                        <View style={styles.viewNotItem}>
                            <Button
                                icon="plus"
                                mode="contained"
                                onPress={() => {
                                    setclickedAddTopic(true)
                                    console.log('Add Topic')
                                    // setModalOpen(true)
                                }}
                                style={{
                                    width: '100%',
                                    backgroundColor: theme.colors.third
                                }}
                            >
                                Add Topic
                            </Button>
                        </View>
                        :
                        <View style={styles.viewAddTopicInput}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 8,
                                    // backgroundColor: '#f2f',
                                    height: 38,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    justifyContent: 'center',

                                }}
                                onPress={() => {
                                    setclickedAddTopic(false)
                                    console.log("Đóng thêm List Topic")
                                }}
                            >
                                <Icon
                                    name='close'
                                    type='font-awesome'
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                            <TextInput
                                // label="topic"
                                placeholder="Nhập tên danh sách"
                                value={text}
                                onChangeText={text => setText(text)}
                                style={{
                                    flex: 10,
                                    height: 38,
                                    // borderTopLeftRadius: 10,
                                    // borderTopRightRadius: 10
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 8,
                                    // backgroundColor: '#f2f',
                                    height: 38,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    justifyContent: 'center',

                                }}
                                onPress={() => {
                                    console.log("text: ", text, text.length)
                                    text.length > 0
                                        ? (
                                            setTaskList([...TaskList, {
                                                id: 1,
                                                listName: text,
                                                detail: []
                                            }]),
                                            console.log("Đã thêm List Topic")
                                        )
                                        : ToastAndroid.show('Tên danh sách không được rỗng!', ToastAndroid.SHORT);
                                }}
                            >
                                <Icon
                                    name='check'
                                    type='font-awesome'
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView >
            </View >
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fffa',
        marginVertical: 4,
        marginHorizontal: 10,
        borderRadius: 4,
        height: 38,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginHorizontal: 8,
        color: '#fff'
    },
    view: {
        marginVertical: 10,
        backgroundColor: theme.colors.secondary,
        width: width - 90,
        marginHorizontal: 10,
        // height: 200,
        // minHeight: 100,
        // maxHeight: 200,
        borderRadius: 10,
    },
    viewNotItem: {
        marginVertical: 10,
        backgroundColor: theme.colors.secondary,
        width: width - 90,
        marginHorizontal: 10,
        height: 38,
        borderRadius: 10,
        alignItems: "center"
    },
    viewAddTopicInput: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: theme.colors.secondary,
        width: width - 90,
        marginHorizontal: 10,
        height: 38,
        borderRadius: 10,
    }
});
export default Topic;
