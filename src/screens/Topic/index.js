import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Dimensions, ToastAndroid, FlatList, Modal, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import theme from '../../theme/Theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome, AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { addTask, getAllListName, getMember, getActivities, getAccount, addMemberstoProject, getMemberstoProject, addList, updateTask } from '../../apis/api';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { Pressable } from 'react-native';
import { Formik } from 'formik';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const Topic = ({ navigation: { goBack }, navigation }) => {
    const route = useRoute();

    const [addTagID, setAddTagId] = React.useState('')
    const [addTag, setAddTag] = React.useState(false);
    const [infoModal, setInfoModal] = React.useState({})
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalAddmember, setModalAddmember] = React.useState(false)
    const [clickedAddTopic, setclickedAddTopic] = React.useState(false)
    const [text, setText] = React.useState("");
    const [listTask, setListTask] = React.useState([])
    //Modal
    const [selectedTaskType, setSelectedTaskType] = useState('')
    const [selectedlistType, setSelectedListType] = useState('')

    const [userNameAddMember, setUserNameAddMember] = useState('')

    const bgColorTaskType = [
        { type: 'New Feature', color: "#00b4d8" },
        { type: 'Improvement', color: "#e9c46a" },
        { type: 'QA Test', color: "#e76f51" },
        { type: 'Bug', color: "#DC143C" },
    ]
    const taskType = [
        'New Feature',
        'Improvement',
        'QA Test',
        'Bug',
    ]

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const [listType, setListType] = React.useState([])
    const [description, setDescription] = React.useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([])

    const [startdate, setStartDate] = useState(new Date());
    const [isOpenStartDate, setIsOpenStartDate] = useState(false);
    const setChangeStartDate = ((event, date) => {
        console.log("event:", event, "setStartDate:", date);
        setIsOpenStartDate(false)
        setStartDate(date)
    })
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
            d.getFullYear()].join('-')
        );
    }

    function formatDate(m) {
        return (
            m.getUTCDate() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()
        );
    }

    const [defaultListName, setDefaultListName] = React.useState([])
    const renderItem = ({ item, index }) => (
        console.log("item: ", item),
        <View key={index} style={{
            marginBottom: 6,
        }}>
            <TouchableOpacity
                onPress={() => (
                    setSelectedTaskType(item.issueType),
                    setSelectedListType(item.listName),
                    setItems(listMember.reduce((prev, curr) => [...prev, { label: curr.username, value: curr.username }], [])),
                    setValue(item.assignee),
                    setDescription(item.taskDescription),
                    // console.log("new Date(item.startDate): ", (item.startDate), new Date(item.startDate)),
                    // console.log("new Date(item.endDate): ", (item.endDate), new Date(item.endDate.toString())),
                    // setStartDate(new Date(item.startDate) || new Date()),
                    // setDeadlineDate(new Date(item.endDate) || new Date()),
                    setInfoModal(item),
                    setModalOpen(true)
                )}
                style={{
                    backgroundColor: (bgColorTaskType.find(type => type.type == item.issueType).color || '#fff'),
                    marginVertical: 4,
                    marginHorizontal: 10,
                    borderRadius: 4,
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}
            >
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        marginHorizontal: 8,
                        color: '#000',
                        fontSize: 18
                    }}>{item.taskName}</Text>

                    <View style={{
                        width: 100,
                        height: 18,
                        // borderWidth: 1,
                        flexDirection: 'row',
                        overflow: 'hidden',
                    }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                // marginHorizontal: 8,
                                color: '#000',
                                fontSize: 12,
                                width: '100%',
                                // borderWidth: 1
                            }}>{item.assignee[0]}</Text>
                    </View>
                </View>
                <View style={{
                    // borderWidth: 1,
                    // flexDirection: 'row',
                }}>
                    {item.startDate ? <Text style={styles.title}> Start Date: {item.startDate}</Text> : ''}
                    {item.endDate ? <Text style={styles.title}> End Date: {item.endDate}</Text> : ''}
                    {item.duration ? <Text style={styles.title}> Duration: {item.duration} days</Text> : ''}

                </View>
            </TouchableOpacity>
        </View >
    );
    function componentDidMount() {
        setTimeout(() => { this.scrollView.scrollTo({ x: -30 }) }, 1) // scroll view position fix
    }

    async function getListName() {
        const getListName = await getAllListName(route.params.projectID)
        setListTask(getListName)
        setDefaultListName(getListName.reduce((prev, curr) => [...prev, { listNameId: curr._id, listName: curr.listName }], []))
    }

    const [addTaskNameInList, setAddTaskNameInList] = React.useState({})
    React.useEffect(() => {
        async function fetchData() {
            const createTask = await addTask(addTaskNameInList)
            if (createTask == 'Create Task successfully') {
                const getListName = await getAllListName(route.params.projectID)
                setListTask(getListName)
            }
        }
        fetchData()
    }, [addTaskNameInList]);

    async function fetchData() {
        const getListName = await getAllListName(route.params.projectID)
        setListTask(getListName)
        setDefaultListName(getListName.reduce((prev, curr) => [...prev, { listNameId: curr._id, listName: curr.listName }], []))
    }

    const renderAction = ({ item }) => {
        return (
            <View style={{ width: '100%' }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    marginBottom: 0
                    // backgroundColor: '#ccc'
                }}>
                    <View style={{
                        width: 12,
                        height: 12,
                        borderRadius: 10,
                        backgroundColor: '#62bd4e',
                    }}></View>
                    <Text>{item.createdAt}</Text>
                    <Text>{item.owner}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 20,
                    // backgroundColor: '#ccc',
                    // marginTop: '-10px'
                }}>
                    <View style={{
                        width: 2,
                        height: '150%',
                        backgroundColor: '#62bd4e',
                        marginLeft: 5,
                        position: 'relative',
                        top: -3
                    }}></View>
                    <Text>Chi Thai Minh was assigned to task - "#711 : [OP] Payment on web"</Text>
                </View>
            </View>
        );
    };
    const testActivity = [
        {
            "_id": "635e8187e2bb371821cbcad4",
            "owner": "tmchi@tma.com.vn",
            "projectId": "635369852679ce44b44de970",
            "listNameId": "634bcfc3f7a6cfef9e240f52",
            "taskId": "634bd9bfff5168bd77f4afd0",
            "action": "Created Task",
            "createAt": 1667096249689,
            "createdAt": "2022-10-30T13:52:07.664Z",
            "updatedAt": "2022-10-30T13:52:07.664Z",
            "__v": 0
        },
        {
            "_id": "63614dca8e52609f3c434d28",
            "owner": "tmchi@tma.com.vn",
            "projectId": "635369852679ce44b44de970",
            "listNameId": "634bcfc3f7a6cfef9e240f52",
            "taskId": "634bd9bfff5168bd77f4afd0",
            "action": "Assigned Task",
            "createAt": 1667096249689,
            "createdAt": "2022-11-01T16:48:10.087Z",
            "updatedAt": "2022-11-01T16:48:10.087Z",
            "__v": 0
        },
        {
            "_id": "63614dca8e52609f3c434d28",
            "owner": "tmchi@tma.com.vn",
            "projectId": "635369852679ce44b44de970",
            "listNameId": "634bcfc3f7a6cfef9e240f52",
            "taskId": "634bd9bfff5168bd77f4afd0",
            "action": "Assigned Task",
            "createAt": 1667096249689,
            "createdAt": "2022-11-01T16:48:10.087Z",
            "updatedAt": "2022-11-01T16:48:10.087Z",
            "__v": 0
        },
        {
            "_id": "63614dca8e52609f3c434d28",
            "owner": "tmchi@tma.com.vn",
            "projectId": "635369852679ce44b44de970",
            "listNameId": "634bcfc3f7a6cfef9e240f52",
            "taskId": "634bd9bfff5168bd77f4afd0",
            "action": "Assigned Task",
            "createAt": 1667096249689,
            "createdAt": "2022-11-01T16:48:10.087Z",
            "updatedAt": "2022-11-01T16:48:10.087Z",
            "__v": 0
        },
        {
            "_id": "63614dca8e52609f3c434d28",
            "owner": "tmchi@tma.com.vn",
            "projectId": "635369852679ce44b44de970",
            "listNameId": "634bcfc3f7a6cfef9e240f52",
            "taskId": "634bd9bfff5168bd77f4afd0",
            "action": "Assigned Task",
            "createAt": 1667096249689,
            "createdAt": "2022-11-01T16:48:10.087Z",
            "updatedAt": "2022-11-01T16:48:10.087Z",
            "__v": 0
        }
    ]
    // const [showActivity, setShowActivity] = React.useState([])
    // setShowActivity()
    // async function getActivity(owner) {
    //     const getActivity = await getActivities(owner)
    //     console.log("getActivity: ", getActivity)
    //     // setShowActivity([...getActivity])
    //     setShowActivity([{}])
    //     console.log("showActivity: ", showActivity)
    // }

    // React.useEffect(() => {
    //     getActivity("tmchi@tma.com.vn")
    // }, [])

    React.useEffect(() => {
        fetchData()
    }, [route])
    const [listAddUser, setListAddUser] = useState([])
    const [isTrue, setIsTrue] = useState('')

    async function getSearchAccount(userNameAddMember) {
        try {
            const username = await AsyncStorage.getItem('userName')
            const listAccount = await getAccount(userNameAddMember, username)
            setListAddUser(listAccount)
        } catch (e) {
            console.log("getSearchAccount Error:", e)
        }
    }

    React.useEffect(() => {
        getSearchAccount(userNameAddMember)
    }, [userNameAddMember])

    const onPressAccountSearch = (username) => {
        if (isTrue == username) {
            setIsTrue('')
        } else {
            setIsTrue(username)
        }
    }

    const handleAddUserToProject = async (projectId, username) => {
        if (username.length == 0) {
            Alert.alert('Thông báo', 'Vui lòng chọn thành viên cần thêm vào dự án');
        } else {
            const putMembers = await addMemberstoProject(projectId, username)
            Alert.alert('Thông báo', putMembers);
            setSwitchListMember(!switchListMember)
        }

    }
    const renderAddUser = ({ item, index }) => (
        <View key={index} style={{
            marginBottom: 6,
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 10
        }}>
            <TouchableOpacity
                onPress={() => onPressAccountSearch(item.username)}
                style={styles.item}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        marginHorizontal: 8,
                        color: (isTrue == item.username ? 'green' : '#000')
                    }}>{item.username}</Text>
                    <Feather name="check-circle"
                        size={24}
                        color={isTrue == item.username ? 'green' : '#000'} />
                </View>
            </TouchableOpacity>
        </View >
    );

    const [switchListMember, setSwitchListMember] = React.useState(false)
    const [listMember, setListMember] = React.useState([])
    const handleSwitch = async projectId => {
        try {
            const getListMember = await getMemberstoProject(projectId)
            setListMember(getListMember.members)
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        handleSwitch(route.params.projectID)
    }, [switchListMember == true])
    const rendergetUser = ({ item, index }) => (
        <View key={index} style={{
            marginBottom: 6,
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 10,
            backgroundColor: "#fff",
        }}>
            <TouchableOpacity>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 55,
                    backgroundColor: (item.color),
                    borderRadius: 10,
                }}>
                    <Text style={{
                        marginHorizontal: 8,
                        color: '#000'
                    }}>{item.username}</Text>
                    <Text style={{
                        marginHorizontal: 8,
                        color: '#000'
                    }}>{item.role}</Text>
                    <Text style={{
                        marginHorizontal: 8,
                        color: '#000',
                        numberOfLines: 1
                    }}>{formatDate(new Date(item.dateAdded))}</Text>

                </View>
            </TouchableOpacity>
        </View >
    );

    async function addNewListName(projectID, listName) {
        const addNewList = await addList(projectID, listName)
        setclickedAddTopic(false)
        setText('')
        fetchData()
    }

    async function putTask(data) {
        data.listNameId = listTask.find(list => list.listName == data.listName)._id
        const result = await updateTask({ ...data, _id: infoModal._id, })
        if (result == 'Update Task successfully') {
            setModalOpen(false)
            fetchData()
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                visible={modalOpen}
                animationType="slide"
            >
                <View style={{ flex: 1 }}>
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
                                console.log('close modal')
                                setModalOpen(false)
                            }}
                        />
                        <View
                            style={{
                                alignItems: 'center',
                                // borderBottomWidth: 1,
                                width: 280,
                                marginRight: 10
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}
                                numberOfLines={1} >
                                {infoModal.taskName}
                            </Text>
                        </View>
                        <MaterialIcons
                            name='check' size={32}
                            color={'#000'}
                            onPress={() => {
                                putTask({
                                    listNameId: '',
                                    listName: selectedlistType,
                                    issueType: selectedTaskType,
                                    taskDescription: description,
                                    assignee: value,
                                    startDate: formatDateTime(startdate),
                                    endDate: formatDateTime(deadlinedate)
                                })
                                // setModalOpen(false)
                            }}
                        />
                    </View>

                    <View style={{ flex: 1, backgroundColor: '#f3f5f7' }}>
                        <View
                            style={{
                                // borderWidth: 1,
                                // backgroundColor: 'red',
                                flexDirection: 'row',
                                justifyContent: 'space-between',

                            }}
                        >

                            <View
                                style={{
                                    width: '50%',
                                    borderRightWidth: 1,
                                    borderColor: '#f3f5f7',
                                    backgroundColor: '#fff'
                                }}>

                                <Picker
                                    // style={{ backgroundColor: (bgColorTaskType.find(item => item.type === selectedTaskType))?.color }}
                                    selectedValue={selectedTaskType}
                                    onValueChange={(itemVal, indexVal) => {
                                        setSelectedTaskType(itemVal)
                                    }}
                                >
                                    {taskType.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index} />)
                                    })}

                                </Picker>
                            </View>
                            <View
                                style={{
                                    width: '50%',
                                    borderRightWidth: 1,
                                    borderColor: '#f3f5f7',
                                    backgroundColor: '#fff'
                                }}>

                                <Picker
                                    // style={{ backgroundColor: (bgColorListType.find(item => item.type === selectedlistType))?.color }}
                                    selectedValue={selectedlistType}
                                    onValueChange={(itemVal, indexVal) => {
                                        setSelectedListType(itemVal)
                                    }}
                                >
                                    {defaultListName.map((item, index) => {
                                        return (<Picker.Item label={item.listName} value={item.listName} key={index} />)
                                    })}

                                </Picker>
                            </View>

                        </View>
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
                                        placeholder="Assignee..."
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
                                        key={(id) => key.id.toString()}
                                        // defaultValue={items[0]}
                                        multiple={true}
                                        mode="BADGE"
                                        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4", "#e9cc"]}
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
                                                    <Text style={{ position: 'relative', left: -20 }}>
                                                        <RNDateTimePicker mode={'date'} value={startdate} onChange={setChangeStartDate} />
                                                    </Text>}
                                                <TouchableOpacity
                                                    style={{ height: '100%', width: '72%', marginTop: 40 }}
                                                    onPress={() => { setIsOpenStartDate(true) }}
                                                >
                                                    <Text style={{ fontSize: 16 }}>Chọn ngày bắt đầu : </Text>
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
                                                    <Text>
                                                        <RNDateTimePicker value={deadlinedate} onChange={setChangeDeadlineDate} />
                                                    </Text>
                                                }
                                                <TouchableOpacity
                                                    style={{ height: '100%', width: '72%', marginTop: 40 }}
                                                    onPress={() => { setIsOpenDeadlineDate(true) }}
                                                >
                                                    <Text style={{ fontSize: 16 }}>Chọn ngày kết thúc: </Text>
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
                                height: 242,
                                backgroundColor: '#fff',
                                marginTop: 10,
                                // flexDirection: 'row',
                                // alignItems: 'center',
                            }}>
                            <Text
                                style={{ fontSize: 18, margin: 6 }}
                            >
                                Hoạt động
                            </Text>
                            <FlatList
                                // style={{ backgroundColor: "#ccc" }}
                                data={testActivity}
                                renderItem={renderAction}
                                keyExtractor={(item) => item.id}
                            // extraData={selectedId}
                            />
                        </View>
                    </View>


                </View>


            </Modal>

            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalAddmember}
                onRequestClose={() => {
                    setModalOpen(!modalAddmember);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View
                                style={{
                                    width: '100%',
                                    height: 40,
                                    // backgroundColor: '#ccc',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: 1,
                                    borderColor: '#ccc',
                                    backgroundColor: '#0179c0'
                                }}
                            >
                                <Pressable
                                    style={{
                                        marginLeft: 10
                                    }}
                                    onPress={() => {
                                        setIsTrue('')
                                        setListAddUser([])
                                        setUserNameAddMember('')
                                        setModalAddmember(!modalAddmember)
                                    }}
                                >
                                    <AntDesign name="close" size={24} color="#fff" />
                                </Pressable>
                                {switchListMember == false
                                    ? <View>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 18,
                                            // borderBottomWidth: 1,
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}>Thêm thành viên vào dự án</Text>
                                    </View>
                                    : <View>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 18,
                                            // borderBottomWidth: 1,
                                            fontWeight: 'bold',
                                            color: '#fff'
                                        }}>Danh sách thành viên </Text>
                                    </View>}
                                {switchListMember == false
                                    ? <Pressable
                                        style={{
                                            marginRight: 10
                                        }}
                                        onPress={() => {
                                            console.log("list")
                                            setSwitchListMember(!switchListMember)
                                        }}
                                    >
                                        <Feather name="list" size={24} color="#fff" />
                                    </Pressable>
                                    : <Pressable
                                        style={{
                                            marginRight: 10
                                        }}
                                        onPress={() => {
                                            console.log("list")
                                            setSwitchListMember(!switchListMember)
                                        }}
                                    >
                                        <AntDesign name="adduser" size={24} color="#fff" />
                                    </Pressable>}

                            </View>

                            {switchListMember == false
                                ? <View
                                    style={{
                                        width: '100%',
                                        height: '84%',
                                    }}
                                >
                                    <View style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            color: '#0179c0',
                                            marginHorizontal: 16,
                                            fontSize: 16,
                                            position: 'relative',
                                            top: -4,
                                            flex: 1
                                        }}>Username</Text>
                                        <TextInput
                                            style={{
                                                marginHorizontal: 16, backgroundColor: '#fff',
                                                flex: 3
                                            }}
                                            value={userNameAddMember}
                                            placeholderTextColor="#ccc"
                                            onChangeText={(userNameAddMember) => {
                                                setUserNameAddMember(userNameAddMember)
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            maxHeight: '89%',
                                            // borderWidth: 1,
                                            marginTop: '2%',
                                            borderColor: '#ccc',
                                        }}
                                    >
                                        <FlatList
                                            data={listAddUser}
                                            renderItem={renderAddUser}
                                            keyExtractor={(item) => item.id}
                                        // extraData={selectedId}
                                        />
                                        <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => handleAddUserToProject(route.params.projectID, isTrue)}
                                            >
                                                <Text style={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    textAlign: "center"
                                                }}>Add User to Project</Text>
                                            </Pressable>
                                        </View>

                                    </View>
                                </View>
                                : <View style={{
                                    width: '100%',
                                    height: '92%',
                                    marginTop: 10
                                }}>
                                    <FlatList
                                        data={listMember}
                                        renderItem={rendergetUser}
                                        keyExtractor={(item) => item.id}
                                    />
                                </View>}


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
                            // setListTask([])
                            console.log("onPress back list mainBoard")
                            navigation.navigate('Boards', {
                                screen: 'MainBoard',
                                params: {},
                            })
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
                        {route.params.tagNameProject}
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
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
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
                    {route.params.currentUser == route.params.owner ? <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            console.log("onPress add member")
                            setModalAddmember(true)
                        }}
                    >
                        <AntDesign name="addusergroup" size={24} color={'#fff'} />
                    </TouchableOpacity> : ''}
                </View>
            </View>

            <View>
                <ScrollView
                    // key={listTask.length}
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
                    {listTask.length > 0
                        ? listTask.map((taskItem, index) => {
                            return (
                                <View>
                                    <View
                                        key={index}
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
                                                maxHeight: 520
                                            }}>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={taskItem?.tasks}
                                                renderItem={renderItem}
                                                keyExtractor={item => item.id}
                                            />

                                            {addTag == true && taskItem._id == addTagID
                                                ? <View style={{
                                                    flexDirection: 'row',
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
                                                            console.log("text: ", text)
                                                            console.log("addTagID: ", addTagID)
                                                            text.length > 0
                                                                ? (
                                                                    setAddTaskNameInList({ listNameId: addTagID, taskName: text }),
                                                                    setAddTag(false),
                                                                    setAddTagId(''),
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
                                                            console.log("onPress add tag: ", taskItem._id)
                                                            setAddTag(true)
                                                            setAddTagId(taskItem._id)
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
                                            console.log("Đã thêm List Topic: ", { projectID: route.params.projectID, listName: text }),
                                            addNewListName(route.params.projectID, text)

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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        // margin: 10,
        backgroundColor: "#fff",
        // borderRadius: 20,
        // padding: 100,
        width: '100%',
        height: '100%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        width: '40%',
        height: 40,
        borderRadius: 20,
        padding: 10,
        marginTop: 30
        // elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
});
export default Topic;
