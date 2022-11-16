import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ToastAndroid, Modal, StyleSheet, Keyboard, ScrollView, Pressable, Image, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import Theme from '../../theme/Theme'
import { List, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useRoute, DrawerActions } from '@react-navigation/native';
import { getProjectInfo, searchProjectInfo, addProject } from '../../apis/api'
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainBoard = ({ navigation }) => {
    const route = useRoute()
    const [modalOpen, setModalOpen] = React.useState(false)
    const [projectInfo, setProjectInfo] = React.useState([])
    const [showSearch, setShowSearch] = React.useState(false)
    const [searchProject, setSearchProject] = React.useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [owner, setOwner] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("onRefresh: ", owner)
        fetchData(owner)
        setRefreshing(false)
    }, []);

    async function getOwner() {
        try {
            const username = await AsyncStorage.getItem('userName')
            console.log("username-getOwner: ", username)
            setOwner(username)
        } catch (e) {
            console.log("Get Owner Error: ", e)
        }
    }

    async function fetchData(owner) {
        const projectInfo = await getProjectInfo(owner)
        console.log("projectInfo: ", projectInfo)
        setProjectInfo(projectInfo)
    }

    async function searchInfoProject(projectName) {
        const projectInfo = await searchProjectInfo(projectName, owner)
        console.log("projectInfo: ", projectInfo)
        setProjectInfo(projectInfo)
    }

    async function createProject(data) {
        console.log("data to create project: ", data)
        const createProject = await addProject(data)
        console.log("createProject: ", createProject)
    }
    React.useEffect(() => {
        getOwner()
        console.log("owner:", owner)
    }, [])

    React.useEffect(() => {
        fetchData(owner)
    }, [owner, modalOpen == false]);

    React.useEffect(() => {
        const query = searchProject
        if (query.length > 0) {
            searchInfoProject(query)
        } else {
            fetchData(owner)
        }
    }, [searchProject]);

    return (
        < SafeAreaView style={{ flex: 1 }
        }>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalOpen(!modalOpen);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                top: 5,
                                right: 140
                            }}
                            onPress={() => setModalOpen(!modalOpen)}
                        >
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>

                        <Image
                            source={require('../../assets/blog-word-day-updates-header-image-v-03-1560x720.png')}
                            style={{
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                resizeMode: 'center',
                                width: '100%',
                                height: '20%',
                            }}
                        />
                        <Formik
                            initialValues={{ projectName: '', tagNameProject: '', owner: owner }}
                            onSubmit={values => {
                                if (values.projectName.length == 0) {
                                    ToastAndroid.show('Không được để trống Project Name!', ToastAndroid.SHORT);
                                } else if (values.tagNameProject.length == 0) {
                                    ToastAndroid.show('Không được để trống Project Key!', ToastAndroid.SHORT);
                                } else {
                                    createProject(values)
                                    setModalOpen(!modalOpen);
                                }

                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View>
                                    <Text style={{ marginRight: 200, color: '#0179c0' }}>Project name</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ backgroundColor: '#fff', width: 280, marginBottom: 20 }}
                                        placeholderTextColor="#ccc"
                                        placeholder='project name'
                                        onChangeText={handleChange('projectName')}
                                        onBlur={handleBlur('projectName')}
                                        value={values.projectName}
                                    />

                                    <Text style={{ marginRight: 210, color: '#0179c0' }}>Project key</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ backgroundColor: '#fff', width: 280, marginBottom: 20 }}
                                        placeholder='Project key'
                                        placeholderTextColor="#ccc"
                                        onChangeText={handleChange('tagNameProject')}
                                        onBlur={handleBlur('tagNameProject')}
                                        value={values.tagNameProject}
                                    />

                                    <Text style={{ marginRight: 240, color: '#0179c0' }}>Owner</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        themes={{ colors: { text: 'red' } }}
                                        style={{ backgroundColor: '#fff', width: 280, marginBottom: 20 }}
                                        value={owner}
                                        placeholderTextColor="#ccc"
                                        editable={false} selectTextOnFocus={false}

                                    />
                                    <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            // onPress={() => setModalOpen(!modalOpen)}
                                            onPress={handleSubmit}
                                        >
                                            <Text style={styles.textStyle}>CREATE</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </Formik>

                    </View>
                </View>
            </Modal>
            <View
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: Theme.colors.third,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {showSearch == false ?
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 10 }}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                        >
                            <Icon
                                name='bars'
                                type='font-awesome'
                                color={'#fff'}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, marginHorizontal: 20, color: '#fff' }}>Project</Text>
                    </View>
                    :
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 10 }}
                            onPress={() => {
                                setShowSearch(false)
                                setSearchProject('')
                            }}
                        >
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </TouchableOpacity>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                backgroundColor: '#fff',
                                width: 260,
                                height: 40,
                            }}
                            placeholder='Search'
                            value={searchProject}
                            onChangeText={(searchProject) => {
                                setSearchProject(searchProject, owner)
                            }}
                        />
                    </View>
                }
                <View>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8, marginRight: 8 }}
                        onPress={() => {
                            console.log("onPress search project")
                            if (showSearch == true) {
                                console.log("@@@@@@@@@@@@@@@@@")
                            }
                            setShowSearch(true)

                            // navigation.navigate('Menu WorkSpaces')
                        }}
                    >
                        <Icon
                            name='search'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            {isLoading == false
                ? <View style={{ flex: 1, backgroundColor: '#ccc', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={Theme.colors.primary} style={{
                        position: 'relative',
                        top: -30
                    }} />
                </View>
                : <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Total projects: {projectInfo.length}</Text>
                    <ScrollView
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            // backgroundColor: '#ccc',
                            flex: 1,
                            marginHorizontal: 12,
                            marginBottom: 12,
                        }}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {projectInfo.length > 0 ?
                            projectInfo.map(project => {
                                return (
                                    <List.Item
                                        key={project._id}
                                        style={{
                                            // borderBottomWidth: 1,
                                            // borderBottomColor: "#ccc",
                                            backgroundColor: (project.status == 'in-progress' ? Theme.colors.background : "#e0e0e0"),
                                            marginBottom: 6,
                                            borderRadius: 10
                                        }}
                                        disabled={(project.status != 'in-progress' ? true : false)}
                                        title={project.projectName}
                                        description={project.tagNameProject}
                                        left={props => <List.Icon {...props} icon="tag" />}
                                        onPress={() => {
                                            console.log("onPress to switch topic screen :", project._id)
                                            console.log("params:", { projectID: project._id, tagNameProject: project.tagNameProject })
                                            navigation.navigate('Topic', {
                                                screen: 'TopicMain',
                                                params: { projectID: project._id, tagNameProject: project.tagNameProject, owner: project.owner, currentUser: owner },
                                            })
                                        }}
                                    />
                                )
                            })
                            :
                            <Text style={{ margin: 10 }}>{showSearch == true ? 'Không tìm thấy dự án nào trùng khớp' : 'Bạn chưa có dự án nào'}</Text>
                        }
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
                </View>}

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    title: { marginTop: 10, marginLeft: 10, marginBottom: 10, color: '#000', fontSize: 16, },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        // margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 100,
        width: '90%',
        height: '80%',
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default MainBoard; 
