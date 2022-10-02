import { useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Dimensions, ToastAndroid, FlatList, Modal, Keyboard } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import theme from '../../theme/Theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome, AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import RNDateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');
const Topic = ({ navigation: { goBack }, navigation }) => {
    const route = useRoute();

    const [addTagID, setAddTagId] = React.useState('')
    const [addTag, setAddTag] = React.useState(false);
    const [idModal, setIdModal] = React.useState('')
    const [modalOpen, setModalOpen] = React.useState(false)
    const [clickedAddTopic, setclickedAddTopic] = React.useState(false)
    const [text, setText] = React.useState("");
    const [TaskList, setTaskList] = React.useState([])
    //Modal
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const [description, setDescription] = React.useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { id: 1, label: 'Thái Minh Chí', value: 'Thái Minh Chí' },
        { id: 2, label: 'tmchi', value: 'tmchi' },
        { id: 3, label: 'tmchi111', value: 'tmchi1111' },
    ]);

    const [startdate, setStartDate] = useState(new Date());
    const [isOpenStartDate, setIsOpenStartDate] = useState(false);
    const setChangeStartDate = ((event, date) => {
        console.log("event:", event, "setStartDate:", date);
        setIsOpenStartDate(false)
        setStartDate(date)
    })
    // useEffect(() => {
    //     console.log("isOpenStartDate: ", isOpenStartDate)
    // }, [isOpenStartDate])
    // useEffect(() => {
    //     console.log("startdate: ", startdate)
    // }, [startdate, deadlinedate])
    const [deadlinedate, setDeadlineDate] = useState(new Date());
    const [isOpenDeadlineDate, setIsOpenDeadlineDate] = useState(false);
    const setChangeDeadlineDate = (event, date) => {
        console.log("event:", event, "setDeadlineDate:", date);
        setIsOpenDeadlineDate(false)
        setDeadlineDate(date)
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDateTime(d) {
        return (
            [d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':')
        );
    }

    //Modal
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

    const Task = [{
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
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Third Item',
            },
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
    {
        id: 2,
        listName: 'InProgress',
        detail: [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'First Item',
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Second Item',
            }
        ]
    }
    ];
    const renderItem = ({ item }) => (
        <View key={item.id} style={{
            marginBottom: 6,
        }}>
            <TouchableOpacity
                onPress={() => (
                    console.log("onPress", item.id),
                    setIdModal(item.id),
                    setModalOpen(true)
                )}
                style={styles.item}
            >
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );
    function componentDidMount() {
        setTimeout(() => { this.scrollView.scrollTo({ x: -30 }) }, 1) // scroll view position fix
    }
    // React.useEffect(() => {
    //     console.log("useEffect")
    //     console.log("value: ", value)
    // }, [value])
    return (
        console.log("route: ", route),
        console.log('TaskList: ', TaskList, TaskList.length),
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                visible={modalOpen}
                animationType="slide"
            >
                <View
                    style={{ flex: 1 }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: theme.colors.background,
                            // color: "#000"
                            height: 50,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',

                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}
                    >
                        <MaterialIcons
                            name='close' size={32}
                            color={'#000'}
                            onPress={() => {
                                console.log('Add Topic')
                                setModalOpen(false)
                            }}
                            style={{ marginHorizontal: 2 }}
                        />
                        <View
                            style={{
                                alignItems: 'center',
                                width: 240,
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}
                                numberOfLines={1} >
                                Tên tag
                            </Text>
                            <Text
                                numberOfLines={1}>
                                {idModal} xxxxxxxxx
                            </Text>
                        </View>
                        <FontAwesome name="ellipsis-v" size={24} color="black"
                            style={{ marginHorizontal: 10 }} />
                    </View>

                    <View style={{ flex: 1, backgroundColor: '#f3f5f7' }}>

                        {/* <SelectDropdown
                            data={countries}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        /> */}
                        {/* description */}
                        <View
                            style={{
                                width: '100%',
                                height: 58,
                                backgroundColor: theme.colors.background,
                                marginTop: 10,
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                            <MaterialIcons name="description" size={24} color="black" style={styles.icon} />
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ backgroundColor: '#fff', width: 280 }}
                                    placeholder='Add tag description'
                                    value={description}
                                    onChangeText={description => setDescription(description)}
                                />
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{ position: 'relative' }}>
                            {/* Members */}
                            <View
                                style={{
                                    width: '100%',
                                    height: 58,
                                    backgroundColor: theme.colors.background,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    zIndex: 2
                                }}>
                                <Octicons name="person" size={24} color="black" style={{ marginHorizontal: 12 }} />
                                <View style={{ zIndex: 10 }}>
                                    <DropDownPicker
                                        listItemLabelStyle={{
                                            color: "#000",
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#ccc'
                                        }}
                                        flatListProps={{
                                            initialNumToRender: 3
                                        }}
                                        maxHeight={200}
                                        dropDownContainerStyle={{
                                            backgroundColor: '#ddd',
                                            borderWidth: 0,
                                        }}
                                        // dropDownDirection={'TOP'}
                                        placeholder="Members..."
                                        placeholderStyle={{
                                            color: "grey",
                                            fontWeight: "300",
                                            marginLeft: 8,
                                            fontSize: 16,
                                        }}
                                        style={{ width: 290, borderWidth: 0 }}
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        key={(id) => key.id}
                                        // defaultValue={items[0]}
                                        multiple={true}
                                        mode="BADGE"
                                        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                                    />
                                </View>
                            </View>

                            {/* Date */}
                            <View
                                style={{
                                    width: '100%',
                                    height: 116,
                                    backgroundColor: theme.colors.background,
                                    marginTop: 10,
                                    zIndex: 0
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}>
                                    <AntDesign name="clockcircleo" size={24} color="black" style={styles.icon} />
                                    <View style={{ flex: 1 }}>
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            width: 280
                                            // justifyContent: 'fles',
                                        }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                {isOpenStartDate &&
                                                    <Text style={{}}>
                                                        <RNDateTimePicker mode={'date'} value={startdate} onChange={setChangeStartDate} />;
                                                    </Text>}
                                                <TouchableOpacity
                                                    onPress={() => { setIsOpenStartDate(true) }}
                                                >
                                                    <Text style={{ fontSize: 16 }}>Ngày bắt đầu : </Text>
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{formatDateTime(startdate)}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View
                                    style={{
                                        borderTopWidth: 0.5,
                                        borderTopColor: '#ccc',
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}>
                                    {/* <AntDesign name="clockcircleo" size={24} color="black" style={styles.icon} /> */}
                                    <View style={{ flex: 1, marginLeft: 44 }}>
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            width: 280
                                        }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                {isOpenDeadlineDate &&
                                                    <Text style={{ flex: 1, borderWidth: 1, height: 50 }}>
                                                        <RNDateTimePicker value={deadlinedate} onChange={setChangeDeadlineDate} />;
                                                    </Text>}
                                                <TouchableOpacity
                                                    onPress={() => { setIsOpenDeadlineDate(true) }}
                                                >
                                                    <Text style={{ fontSize: 16 }}>Ngày kết thúc: </Text>
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{formatDateTime(deadlinedate)}</Text>
                                            </View>

                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>

                        {/* Activity */}
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: theme.colors.third,
                                marginTop: 10,
                                // flexDirection: 'row',
                                // alignItems: 'center',
                            }}>
                            <Text
                                style={{ fontSize: 18 }}
                            >
                                Hoạt động
                            </Text>
                        </View>
                    </View>
                </View>

            </Modal>

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

            <View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    contentInset={{
                        top: 0,
                        left: 30,
                        bottom: 0,
                        right: 30,
                    }}
                    style={{ height: '100%' }}
                >
                    {Task.length > 0
                        ? Task.map((taskItem) => {
                            return (
                                <View>
                                    <View
                                        key={taskItem.id}
                                        style={styles.view}
                                    >
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
                                        </View>

                                        <View
                                            style={{
                                                maxHeight: 462
                                            }}>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={taskItem?.detail}
                                                renderItem={renderItem}
                                                keyExtractor={item => item.id}
                                            />

                                            {addTag == true && taskItem.id == addTagID
                                                ? <View style={{
                                                    flexDirection: 'row',
                                                    // marginVertical: 0,
                                                    paddingVertical: 4,
                                                    borderTopWidth: 1,
                                                    borderTopColor: '#fff'
                                                }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            flex: 1,
                                                            paddingHorizontal: 8,
                                                            height: 38,
                                                            borderRadius: 10,
                                                            alignItems: 'center',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',

                                                        }}
                                                        onPress={() => {
                                                            setAddTag(false)
                                                            console.log("Đóng thêm tag")
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
                                                        placeholder="Nhập tên thẻ"
                                                        value={text}
                                                        onChangeText={text => setText(text)}
                                                        style={{
                                                            flex: 10,
                                                            height: 38,
                                                            backgroundColor: '#fff'
                                                        }}
                                                    />
                                                    <TouchableOpacity
                                                        style={{
                                                            flex: 1,
                                                            paddingHorizontal: 8,
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
                                                                    {
                                                                        this: taskItem.detail.push({
                                                                            id: Math.floor(Math.random() * 10),
                                                                            title: text
                                                                        })
                                                                    },
                                                                    console.log("Đã thêm thẻ", taskItem.detail),
                                                                    setAddTag(false),
                                                                    setText('')
                                                                )
                                                                : ToastAndroid.show('Tên thẻ không được rỗng!', ToastAndroid.SHORT);
                                                        }}
                                                    >
                                                        <Icon
                                                            name='check'
                                                            type='font-awesome'
                                                            color={'#fff'}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                : <View
                                                    style={{
                                                        marginHorizontal: 4,
                                                        borderTopWidth: 1,
                                                        borderTopColor: '#fff',
                                                        height: 36,

                                                    }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            height: '100%',
                                                            paddingHorizontal: 8,
                                                            flexDirection: 'row',
                                                            // justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            // backgroundColor: 'red'
                                                        }}
                                                        onPress={() => {
                                                            console.log("onPress add tag: ", taskItem.id)
                                                            setAddTag(true)
                                                            setAddTagId(taskItem.id)
                                                        }}
                                                    >
                                                        <Icon
                                                            size={20}
                                                            name='plus'
                                                            type='font-awesome'
                                                            color={'#fff'}
                                                        />
                                                        <Text
                                                            style={{
                                                                color: '#fff',
                                                                fontSize: 16,
                                                                marginHorizontal: 4
                                                            }}>Add tag</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                        : ''
                    }
                    {clickedAddTopic == false
                        ?
                        <View style={styles.viewNotItem}>
                            <TouchableOpacity
                                // style={{ paddingHorizontal: 8 }}
                                onPress={() => {
                                    setclickedAddTopic(true)
                                    console.log('Add Topic')
                                    // setModalOpen(true)
                                }}
                            >
                                <Text style={{ color: theme.colors.background }}>Thêm danh sách</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.viewAddTopicInput}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 8,
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
                                    backgroundColor: '#fff'
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
        backgroundColor: '#fff',
        marginVertical: 4,
        marginHorizontal: 10,
        borderRadius: 4,
        height: 38,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginHorizontal: 8,
        color: '#000'
    },
    view: {
        // flex: 1,
        marginVertical: 10,
        backgroundColor: theme.colors.third,
        width: width - 90,
        marginHorizontal: 10,
        borderRadius: 10,
        borderRadius: 10,
    },
    viewNotItem: {
        marginVertical: 10,
        backgroundColor: theme.colors.third,
        width: width - 90,
        marginHorizontal: 10,
        height: 38,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    viewAddTopicInput: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: theme.colors.third,
        width: width - 90,
        marginHorizontal: 10,
        height: 38,
        borderRadius: 10,
    },
    icon: {
        marginHorizontal: 10
    },
    text: {
        // marginHorizontal: 10,
        fontSize: 18,
        fontWeight: '100',
        fontStyle: 'italic',
    }
});
export default Topic;
