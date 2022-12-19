import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid, FlatList, Modal, Keyboard, Alert, SectionList, ScrollView } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import theme from '../../theme/Theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome, AntDesign, MaterialIcons, Octicons, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { addTask, getAllListName, saveActivity, getActivities, getAccount, addMemberstoProject, getMemberstoProject, addList, updateTask } from '../../apis/api';
import { Picker } from '@react-native-picker/picker';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { addCheckList, addDesc, addIsDone } from '../../redux/createReducer/index';
import { CheckBox } from 'react-native-elements';

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

    const [startdate, setStartDate] = useState();
    const [isOpenStartDate, setIsOpenStartDate] = useState(false);
    const setChangeStartDate = ((event, date) => {
        setIsOpenStartDate(false)
        setStartDate(date)
    })
    const [deadlinedate, setDeadlineDate] = useState();
    const [isOpenDeadlineDate, setIsOpenDeadlineDate] = useState(false);
    const setChangeDeadlineDate = (event, date) => {
        setIsOpenDeadlineDate(false)
        setDeadlineDate(date)
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDateTime(d) {
        const a = new Date(d)
        return (
            [a.getDate(), a.getMonth() + 1, a.getFullYear()].join('-')
        );
    }

    function formatActivity(d) {
        const a = new Date(d)
        return (
            [a.getMonth() + 1,
            a.getDate(),
            a.getFullYear()].join('/') + ' ' +
            [a.getHours(),
            a.getMinutes(),
            a.getSeconds()].join(':')
        )
    }

    function formatDate(m) {
        return (
            m.getUTCDate() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds()
        );
    }

    const [durationDay, setDurationDay] = useState(0)
    const [storyPoint, setStoryPoint] = useState(0)
    const [defaultListName, setDefaultListName] = React.useState([])
    const [checkIsDone, setCheckIsDone] = useState(false)

    const renderItem = ({ item, index }) => (

        <View key={index + Math.random() * 1000000}
            style={{
                marginBottom: 6,
            }}>
            <TouchableOpacity
                onPress={() => (
                    console.log("item: ", index, item),
                    console.log("deadlinedate: ", deadlinedate),
                    console.log("startdate: ", startdate),

                    getActivity(item._id),
                    setCheckListInfo(item.checkList),
                    setSelectedTaskType(item.issueType),
                    setSelectedListType(item.listName),
                    setItems(listMember.reduce((prev, curr) => [...prev, { label: curr.username, value: curr.username }], [])),
                    setValue(item.assignee),
                    handleTodoClick(item.taskDescription),
                    handleSaveCheckList(item.checkList),
                    handleCheckIsDone(item.isDone),
                    setCheckIsDone(item.isDone == true ? true : false),
                    setStartDate(item.startDate && item.startDate.length > 0 ? new Date(item.startDate) : ''),
                    setDeadlineDate(item.endDate && item.endDate.length > 0 ? new Date(item.endDate) : ''),
                    console.log("deadlinedate: ", deadlinedate),
                    console.log("startdate: ", startdate),
                    console.log("checkIsDone: ", checkIsDone),
                    setDurationDay(item.duration),
                    setStoryPoint(item.storyPointEstimate),
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
                    {item.startDate ? <Text style={styles.title}> Start Date: {formatDateTime(item.startDate)}</Text> : ''}
                    {item.endDate ? <Text style={styles.title}> End Date: {formatDateTime(item.endDate)}</Text> : ''}
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
    const [newTask, setNewTask] = React.useState({})
    React.useEffect(() => {
        async function fetchData() {
            const createTask = await addTask(addTaskNameInList)
            console.log("createTask: ", createTask)
            if (createTask && Object.keys(createTask).length > 0) {
                saveAction(
                    route.params.currentUser,
                    createTask._id,
                    `${route.params.currentUser} was created ${createTask.taskName}`
                )
                const getListName = await getAllListName(route.params.projectID)
                setNewTask(createTask)
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


    const [testActivity, setTestActivity] = useState([])
    const getActivity = async (taskId) => {
        const getAction = await getActivities(taskId)
        setTestActivity(getAction)
    }

    const saveAction = async (owner, taskId, action) => {
        await saveActivity({
            "owner": owner,
            "taskId": taskId,
            "action": action,
            "createAt": new Date().getTime()
        })
    }
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
    const [checkListInfo, setCheckListInfo] = useState([])
    async function putTask(data) {
        data.listNameId = listTask.find(list => list.listName == data.listName)._id
        const result = await updateTask({ ...data, _id: infoModal._id, })
        if (result == 'Update Task successfully') {
            saveAction(
                route.params.currentUser,
                infoModal._id,
                `${route.params.currentUser} was updated`
            )
            if (data.assignee) {
                saveAction(
                    route.params.currentUser,
                    infoModal._id,
                    `${route.params.currentUser} was assigned ${data.assignee}`
                )
            }
            if (data.isDone && data.isDone == true) {
                saveAction(
                    route.params.currentUser,
                    infoModal._id,
                    `${route.params.currentUser} was changed status to DONE`
                )
            }
            setModalOpen(false)
            setCheckListInfo([])
            fetchData()
        }
    }

    const [showCheckList, setShowCheckList] = useState(false)
    const [showModalTitleList, setShowModalTitleList] = useState(false)
    const [showModalDetailTitleList, setShowModalDetailTitleList] = useState(false)
    const [titleCheckList, setTitleCheckList] = useState('')
    const [detailCheckList, setDetailTitleCheckList] = useState('')
    const [titleDetailCheckList, setTitleDetailTitleCheckList] = useState('')


    const handleAddTitleList = (value) => {
        setCheckListInfo([...checkListInfo, {
            title: value.title,
            data: []
        }])
        setShowModalTitleList(false)
        setTitleCheckList('')
    }

    const handleAddDetaiTitlelList = async (value) => {
        const checkListInfoTemp = checkListInfo.map(item => {
            if (item.title == titleDetailCheckList) {
                item.data.push(value)
            }
            return item
        })
        setCheckListInfo(checkListInfoTemp)
        setShowModalDetailTitleList(false);
        setTitleDetailTitleCheckList('')
        setDetailTitleCheckList('')
        // }
    }

    async function updateTaskCheckList(data) {
        return await updateTask({ checkList: data, _id: infoModal._id, })
    }

    const handleCloseToDoList = async (value) => {
        setShowCheckList(false)
    }

    const [tabBarCustom, setTabBarCustom] = useState(1)
    const listTabScroll = [
        { id: 1, name: 'Main', icon: 'home' },
        { id: 2, name: 'CheckList', icon: 'view-list' },
        { id: 3, name: 'Tracking', icon: 'bell-badge-outline' },
    ]

    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todos);
    console.log("todoList: ", todoList);
    const handleTodoClick = (desc) => {
        console.log('handleTodoClick: ', desc)
        const action = addDesc(desc);
        dispatch(action);
    }
    const handleSaveCheckList = (data) => {
        console.log('handleSaveCheckList: ', data)
        const action = addCheckList(data);
        dispatch(action);
    }

    const handleCheckIsDone = (data) => {
        const action = addIsDone(data);
        dispatch(action);
    }

    class TabViewExample extends React.Component {
        state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Main' },
                { key: 'third', title: 'Check list' },
            ],
            message: ''
        };

        callbackFunction = (childData) => {
            this.setState({ ...this.state, message: childData })
            console.log("callbackFunction: ", this.setState)
        }
        render() {
            return (
                <View style={{ flex: 1, marginTop: 10 }}>
                    <TabView
                        navigationState={this.state}
                        renderScene={SceneMap({
                            first: MainTab,
                            third: TodoTab
                        })}
                        onIndexChange={index => {
                            this.setState({ index })
                        }}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        // style={styles.container}
                        renderTabBar={props => (
                            <TabBar
                                {...props}
                                activeColor={'red'}
                                // scrollEnabled={true}
                                pressColor="#0179c0"
                                renderLabel={({ route, color }) => (
                                    <Text style={{ color: 'black', margin: 8, alignItems: 'center', fontSize: 17, flexDirection: 'row', justifyContent: 'center' }}>
                                        {route.key == 'first'
                                            ? <MaterialCommunityIcons name="home" size={24} color="black" />
                                            : (
                                                route.key == 'second'
                                                    ? <Entypo name="bell" size={24} color="black" />
                                                    : <MaterialCommunityIcons name="format-list-text" size={24} color="black" />
                                            )}
                                        {route.title}
                                    </Text>
                                )}
                                style={{
                                    backgroundColor: 'white',
                                    shadowOffset: { height: 0, width: 0 },
                                    shadowColor: 'transparent',
                                    shadowOpacity: 0,
                                    elevation: 0
                                }}
                            />
                        )}
                    />
                </View>
            );
        }
    }

    const get_day_of_time = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    class MainTab extends React.Component {
        state = {
            desc: todoList.desc,
        }

        onChangeDesc = (value) => {
            this.setState({ desc: value })
        }
        render() {
            return (
                <ScrollView style={{ flex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            height: 58,
                            backgroundColor: theme.colors.background,
                            marginTop: 1,
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                        <MaterialIcons name="description" size={24} color="black" style={styles.icon} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ backgroundColor: '#fff', width: 300 }}
                                placeholder='Add tag description'
                                value={this.state.desc}
                                onChangeText={(value) => {
                                    this.onChangeDesc(value);
                                }}
                                onBlur={() => {
                                    handleTodoClick(this.state.desc)
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>



                    {/* Date */}
                    <View
                        style={{
                            width: '100%',
                            height: 116,
                            backgroundColor: theme.colors.background,
                            marginTop: 1,
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
                                                <RNDateTimePicker mode={'date'} value={new Date()} onChange={setChangeStartDate} />
                                            </Text>}
                                        <TouchableOpacity
                                            style={{ height: '100%', width: '79%', marginTop: 40 }}
                                            onPress={() => {
                                                setIsOpenStartDate(true)
                                            }}
                                        >
                                            <Text style={{ fontSize: 16 }}>Chọn ngày bắt đầu : </Text>
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{startdate != undefined && startdate.length != 0 ? formatDateTime(startdate) : ''}</Text>
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
                                                <RNDateTimePicker value={new Date()} onChange={setChangeDeadlineDate} />
                                            </Text>
                                        }
                                        <TouchableOpacity
                                            style={{ height: '100%', width: '79%', marginTop: 40 }}
                                            onPress={() => { setIsOpenDeadlineDate(true) }}
                                        >
                                            <Text style={{ fontSize: 16 }}>Chọn ngày kết thúc: </Text>
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{deadlinedate != undefined && deadlinedate.length != 0 ? formatDateTime(deadlinedate) : null}</Text>
                                    </View>

                                </View>
                            </View>

                        </View>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            height: 58,
                            backgroundColor: theme.colors.background,
                            marginTop: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            zIndex: 2
                        }}>
                        <Octicons name="calendar" size={24} color="black" style={{ marginHorizontal: 12 }} />
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            width: '83%'
                        }}>

                            <Text
                                style={{ fontSize: 16 }}>
                                Duration : {durationDay ? `${durationDay} days` : 'chưa có thời hạn'}
                            </Text>
                            <Text style={{ fontSize: 16 }}>Story Point : {storyPoint} point</Text>
                        </View>
                        {route.params.currentUser == route.params.owner && <View style={{ backgroundColor: 'white', position: 'relative', right: 90 }}>
                            <CheckBox
                                disabled={checkIsDone == true ? true : false}
                                containerStyle={{ backgroundColor: '#fff' }}
                                title='Done'
                                checked={todoList.isDone}
                                onPress={() => handleCheckIsDone(!todoList.isDone)}
                            />
                        </View>}
                    </View>

                    <View
                        style={{
                            width: '100%',
                            backgroundColor: '#fff',
                            marginTop: 1,
                            // flexDirection: 'row',
                            // alignItems: 'center',
                        }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            minHeight: 58
                        }}>
                            <Feather name="activity" size={24} color="black" style={{ marginHorizontal: 12 }} />
                            <Text
                                style={{ fontSize: 24 }}
                            >
                                Activity
                            </Text>
                        </View>
                        {testActivity.map((item, key) => (
                            <View style={{ width: '100%' }} key={key}>
                                <View style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                    marginBottom: 0,

                                    // backgroundColor: '#ccc'
                                }}>
                                    <View style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 10,
                                        backgroundColor: '#62bd4e',
                                        marginRight: 10,

                                    }}></View>
                                    <Text>{formatActivity(item.createdAt)}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginHorizontal: 10,
                                    // backgroundColor: '#ccc',
                                    // marginTop: '-10px'
                                }}>
                                    <View style={{
                                        width: 2,
                                        height: '170%',
                                        backgroundColor: '#62bd4e',
                                        marginLeft: 5,
                                        position: 'relative',
                                        top: -3,
                                        marginRight: 10
                                    }}></View>
                                    <Text style={{
                                        width: '100%',
                                        marginleft: 20,

                                    }}>{item.action}</Text>
                                </View>
                            </View>
                        ))}

                        {testActivity.length > 0 && <View style={{
                            width: '100%',
                            height: 12,
                        }}>
                            <View style={{
                                width: 12,
                                height: '100%',
                                backgroundColor: '#62bd4e',
                                marginLeft: 10,
                                borderRadius: 10,
                            }}>

                            </View>
                        </View>}

                    </View>
                </ScrollView >
            )
        }
    }

    class TodoTab extends React.Component {

        state = {
            changeIcon: false,
            showCheckListItemInput: false,
            checkList: JSON.parse(JSON.stringify(todoList.checkList)),
            titleCheckList: '',
            checkListItem: '',
            idCheckListItem: '',
            countChecked: 0,
            countUnChecked: 0
        }

        change = () => {
            this.setState({
                changeIcon: !this.state.changeIcon,
            });
        };

        test = () => {
            console.log("Test")
            let countChecked = 0
            let countUnChecked = 0

            for (let i = 0; i < this.state.checkList.length; i++) {
                for (let j = 0; j < this.state.checkList[i].data.length; j++) {
                    if (this.state.checkList[i].data[j].isChecked == true) {
                        countChecked++
                    } else {
                        countUnChecked++
                    }
                }
            }
            console.log("countChecked: ", countChecked)
            console.log("countUnChecked: ", countUnChecked)
            this.setState({
                countChecked: countChecked,
                countUnChecked: countUnChecked
            })
        }
        render() {
            return (
                <ScrollView style={{ flex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            height: 58,
                            backgroundColor: theme.colors.background,
                            marginTop: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 2,
                        }}>
                        <FontAwesome name="list-ol" size={24} color="black" style={{ marginHorizontal: 12 }} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '85%',
                        }}>
                            <Text style={{ fontSize: 16 }}>Progress:  {(this.state.countChecked * 100 / (this.state.countUnChecked + this.state.countChecked)) || 0}%</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        handleSaveCheckList(this.state.checkList)
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="content-save-settings-outline"
                                        size={24}
                                        color={"green"}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => {
                                        this.change();
                                    }}
                                >
                                    {this.state.changeIcon == true
                                        ? <MaterialCommunityIcons name="minus-box" size={24} color="black" />
                                        : <Octicons name="diff-added" size={24} color="black" />
                                    }
                                </TouchableOpacity>


                            </View>
                        </View>
                    </View>
                    {
                        this.state.changeIcon
                            ?
                            <View style={{
                                width: '100%',
                            }}>
                                <Text style={{ color: '#000111' }}>Checklist</Text>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ backgroundColor: '#fff', marginHorizontal: 10 }}
                                        placeholder='Write a title for checklist'
                                        value={this.state.titleCheckList}
                                        onChangeText={(value) => {
                                            this.setState({ titleCheckList: value })
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    marginRight: 10
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            height: 30,
                                            width: 60,
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 4,
                                            marginRight: 4
                                        }}
                                        onPress={() => {
                                            console.log("cancel")
                                            this.change()
                                        }}
                                    >
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        // disabled={this.state.titleCheckList.length > 0 ? true : false}
                                        style={{
                                            height: 30,
                                            width: 60,
                                            backgroundColor: '#62bd4e',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: 4,

                                        }}
                                        onPress={() => {
                                            console.log("titleCheckList: ", this.state.titleCheckList)
                                            console.log("checkList: ", this.state.checkList)
                                            console.log("this.state", this.state)
                                            this.setState({
                                                checkList:
                                                    [...this.state.checkList,
                                                    { id: Math.floor(Math.random() * 10000000), title: this.state.titleCheckList, data: [] }
                                                    ]
                                            })
                                            this.setState({ titleCheckList: '' })
                                        }}
                                    >
                                        <Text>Create</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null
                    }
                    <View style={{ width: '100%', marginTop: 10, }}>
                        {this.state.checkList.map((item, key) => (
                            <View key={key + Math.random() * 10000000}>
                                <View style={{
                                    width: '100%',
                                    height: 36,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    backgroundColor: '#FFF',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ fontSize: 16 }}>{item.title}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={{
                                                height: 30,
                                                width: 60,
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 4,
                                                marginRight: 2
                                            }}
                                            onPress={() => {
                                                console.log("show checkList item input", item.id)
                                                this.setState({
                                                    showCheckListItemInput: !this.state.showCheckListItemInput,
                                                });
                                                this.setState({ idCheckListItem: item.id })
                                            }}
                                        >
                                            <Ionicons name="ios-add" size={24} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                height: 30,
                                                width: 60,
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 4
                                            }}
                                            onPress={() => {
                                                console.log("delete checkList item input")
                                                // this.change()
                                            }}
                                        >
                                            <AntDesign name="delete" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {item.data.length > 0
                                    ?
                                    item.data.map(dataItem => (
                                        <View style={{
                                            width: 300,
                                            height: 60,
                                            // borderWidth: 1,
                                            // borderColor: '#ccc',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}>
                                            <CheckBox
                                                title={dataItem.item}
                                                checked={dataItem.isChecked}
                                                onPress={() => {
                                                    console.log('dataItem.id: ', dataItem.id)
                                                    let getItemtoUpdate = this.state.checkList.filter(list => list.id == item.id)
                                                    console.log("getItemtoUpdate: ", getItemtoUpdate)
                                                    for (let i = 0; i < getItemtoUpdate[0].data.length; i++) {
                                                        if (getItemtoUpdate[0].data[i].id == dataItem.id) {
                                                            getItemtoUpdate[0].data[i].isChecked = !getItemtoUpdate[0].data[i].isChecked
                                                        }
                                                    }
                                                    console.log(" getItemtoUpdate[0].data: ", getItemtoUpdate[0].data)
                                                    console.log("checkList: ", this.state.checkList)
                                                    this.setState({
                                                        checkList: this.state.checkList
                                                    })
                                                    this.test()
                                                }}
                                            />
                                        </View>
                                    ))
                                    : null}

                                {this.state.showCheckListItemInput && this.state.idCheckListItem == item.id
                                    ? <View style={{
                                        width: '100%',
                                        minHeight: 100,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        paddingHorizontal: 10,
                                        alignItems: 'center'
                                    }}>
                                        <View style={{
                                            width: '100%',
                                            marginBottom: 4,
                                        }}>
                                            <Text style={{ color: '#000111' }}>Checklist item</Text>
                                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                                <TextInput
                                                    underlineColorAndroid="transparent"
                                                    style={{ backgroundColor: '#fff', marginHorizontal: 10 }}
                                                    placeholder='Add checklist item'
                                                    value={this.state.checkListItem}
                                                    onChangeText={(value) => {
                                                        this.setState({ checkListItem: value })
                                                    }}
                                                />
                                            </TouchableWithoutFeedback>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                marginRight: 8
                                            }}>
                                                <TouchableOpacity
                                                    style={{
                                                        height: 30,
                                                        width: 60,
                                                        borderWidth: 1,
                                                        borderColor: '#ccc',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 4,
                                                        marginRight: 4
                                                    }}
                                                    onPress={() => {
                                                        console.log("cancel checkList item")
                                                        this.setState({
                                                            showCheckListItemInput: !this.state.showCheckListItemInput,
                                                        });
                                                    }}
                                                >
                                                    <Text>Cancel</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{
                                                        height: 30,
                                                        width: 60,
                                                        backgroundColor: '#62bd4e',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 4,

                                                    }}
                                                    onPress={() => {
                                                        let getItemCheckListbyID = this.state.checkList.filter(itemValue => itemValue.id == item.id)
                                                        getItemCheckListbyID[0].data.push({
                                                            id: Math.floor(Math.random() * 10000000).toString(),
                                                            "isChecked": false,
                                                            "item": this.state.checkListItem
                                                        })
                                                        console.log("this.state.checkList: ", this.state.checkList)

                                                        this.setState({ checkListItem: '' })
                                                        this.setState({
                                                            showCheckListItemInput: !this.state.showCheckListItemInput,
                                                        });
                                                    }}
                                                >
                                                    <Text>Create</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    : item.data.length > 0
                                        ? null
                                        : <View style={{
                                            width: '100%',
                                            minHeight: 50,
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            paddingHorizontal: 10,
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>No items available</Text>
                                        </View>
                                }
                            </View>

                        ))}

                    </View>
                </ScrollView >
            )
        }
    }

    const [nameTaskNewAdd, setNameTaskNewAdd] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLoading}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            </Modal>

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
                            backgroundColor: '#0179c0',
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
                            color={'#fff'}
                            onPress={() => {
                                console.log("checkList redux: ", todoList.checkList, todoList.checkList.length)
                                console.log('close modal')
                                setTabBarCustom(1)
                                setCheckListInfo([])
                                setStartDate(undefined)
                                setDeadlineDate(undefined)
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
                                    color: 'white'
                                }}
                                numberOfLines={1} >
                                {infoModal.taskName}
                            </Text>
                        </View>
                        <MaterialIcons
                            name='check' size={32}
                            color={'#fff'}
                            onPress={() => {
                                putTask({
                                    listNameId: '',
                                    listName: selectedlistType,
                                    issueType: selectedTaskType,
                                    taskDescription: todoList.desc,
                                    assignee: value,
                                    startDate: (startdate),
                                    endDate: (deadlinedate),
                                    checkList: todoList.checkList,
                                    isDone: todoList.isDone,
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
                                flexDirection: 'column',
                                justifyContent: 'space-between',

                            }}
                        >

                            <View
                                style={{
                                    width: '100%',
                                    borderRightWidth: 1,
                                    borderColor: '#f3f5f7',
                                    backgroundColor: '#fff'
                                }}>

                                <Picker
                                    style={{ backgroundColor: (bgColorTaskType.find(item => item.type === selectedTaskType))?.color }}
                                    selectedValue={selectedTaskType}
                                    onValueChange={(itemVal, indexVal) => {
                                        setIsLoading(true)
                                        setSelectedTaskType(itemVal)
                                        setIsLoading(false)
                                    }}
                                >
                                    {taskType.map((item, index) => {
                                        return (
                                            <Picker.Item label={item} value={item} key={index} />
                                        )
                                    })}

                                </Picker>
                            </View>
                            <View
                                style={{
                                    width: '100%',
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
                            <View
                                style={{
                                    width: '100%',
                                    height: 58,
                                    backgroundColor: theme.colors.background,
                                    marginTop: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    zIndex: 2,
                                }}>
                                <Octicons
                                    name="person"
                                    size={24}
                                    color="black"
                                    style={{ marginHorizontal: 12 }} />
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
                                        style={{ width: 310, borderWidth: 0 }}
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
                        </View>

                        <TabViewExample />
                    </View>
                </View>


            </Modal >

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

            <Modal
                animationType="slide"
                transparent={true}
                visible={addTag}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setAddTag(!addTag);
                }}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView1}>
                        <View
                            style={{
                                width: '100%',
                                height: 50,
                                backgroundColor: 'white',
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Add Task Name</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // backgroundColor: 'pink',
                            marginTop: 8,
                        }}>
                            <Pressable
                                style={{
                                    marginHorizontal: 4
                                }}
                                onPress={() => {
                                    setAddTag(!addTag);
                                    setAddTagId('')
                                    setNameTaskNewAdd('')
                                }}
                            >
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                            <TextInput
                                style={{
                                    marginLeft: 10,
                                    backgroundColor: '#fff',
                                    flex: 1,
                                }}
                                value={nameTaskNewAdd}
                                placeholder='Please enter name task...'
                                placeholderTextColor="#ccc"
                                onChangeText={(nameTaskNewAdd) => {
                                    setNameTaskNewAdd(nameTaskNewAdd)
                                }}
                            />
                            <Pressable
                                style={{
                                    marginHorizontal: 4
                                }}
                                onPress={() => {
                                    console.log("nameTaskNewAdd:", nameTaskNewAdd)
                                    console.log("listNameId:", addTagID)

                                    setAddTaskNameInList({ listNameId: addTagID, taskName: nameTaskNewAdd }),
                                        setAddTag(false),
                                        setAddTagId(''),
                                        setNameTaskNewAdd('')
                                }}
                                disabled={nameTaskNewAdd.length > 0 ? false : true}
                            >
                                <Feather
                                    name="check-circle"
                                    size={24}
                                    color={nameTaskNewAdd.length > 0 ? 'green' : 'black'}
                                />
                            </Pressable>

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
                    // showsHorizontalScrollIndicator={false}
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
                                <View key={index}>
                                    <View
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
                                                borderBottomColor: '#000',
                                                height: 36
                                            }}>
                                            <Text style={{
                                                marginHorizontal: 8,
                                                color: '#000',
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

                                            <View
                                                style={{
                                                    marginHorizontal: 4,
                                                    borderTopWidth: 1,
                                                    borderTopColor: '#000',
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
                                                        color={'#000'}
                                                    />
                                                    <Text
                                                        style={{
                                                            color: '#000',
                                                            fontSize: 16,
                                                            marginHorizontal: 4
                                                        }}>Add tag</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {/* } */}
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
        // backgroundColor: theme.colors.third,
        backgroundColor: 'rgba(255,255, 255, 0.9)',
        width: width - 90,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
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
        backgroundColor: "rgba(0,0,0,0.3)"
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
    modalView1: {
        // margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 100,
        width: '90%',
        // height: '80%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
