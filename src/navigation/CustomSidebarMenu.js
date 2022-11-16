import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomSidebarMenu = (props, navigation) => {
    const [info, setInfo] = React.useState({})
    async function getData() {
        try {
            const fullName = await AsyncStorage.getItem('fullName')
            const userName = await AsyncStorage.getItem('userName')
            const tagName = await AsyncStorage.getItem('tagName')
            setInfo({ ...info, displayName: fullName, email: userName, tag: `@${tagName}` })
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])
    return (
        console.log("info: ", info),
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.individualInfo}>
                <Image
                    source={require('../assets/no-avatar.png')}
                    style={styles.sideMenuProfileIcon}
                />
                <View style={styles.sideInfo}>
                    <Text style={styles.sideTextInfo}>{info.displayName}</Text>
                    <Text style={{ color: '#fff' }}>{info.tag}</Text>
                    <Text style={{ color: '#fff' }}>{info.email}</Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 10 }}>
                <Icon.Button
                    name="tag"
                    backgroundColor={Theme.Theme.colors.third}
                    onPress={() => {
                        console.log("on press on Project")
                        props.navigation.navigate('Boards')
                    }}
                >
                    Project
                </Icon.Button>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 8 }}>
                <Icon.Button
                    name="bar-chart-o"
                    backgroundColor={Theme.Theme.colors.third}
                    onPress={() => {
                        console.log("on press on My Tash")
                        props.navigation.navigate('Overview')
                    }}
                >
                    Overview
                </Icon.Button>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 8 }}>
                <Icon.Button
                    name="list"
                    backgroundColor={Theme.Theme.colors.third}
                    onPress={() => {
                        console.log("on press on My Tash")
                        props.navigation.navigate('MyTask')
                    }}
                >
                    Tasks
                </Icon.Button>
            </View>
            {/* 
            <View style={styles.WorkspacesInfo}>
                <View style={styles.WorkspacesInfoText}> */}
            {/* <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Workspaces
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: Theme.Theme.colors.third
                            }}>
                            ({listWorkSpaces.length})
                        </Text>
                    </Text> */}
            {/* </View> */}

            {/* <ScrollView showsVerticalScrollIndicator={false}>
                    {listWorkSpaces.map(item => {
                        return (
                            <View key={item._id} style={{ marginBottom: 8 }}>
                                <Icon.Button
                                    name={'building'}
                                    backgroundColor={Theme.Theme.colors.third}
                                    onPress={() => props.navigation.navigate('MainBoard', { workSpaceId: item._id })}
                                >
                                    {item.projectName}
                                </Icon.Button>
                            </View>
                        )
                    })}
                </ScrollView> */}
            {/* </View> */}

            <View style={{
                flex: 1,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "#ccc",
                paddingTop: 10
            }}>
                <View style={{ marginHorizontal: 10, marginBottom: 8 }}>
                    <Icon.Button
                        name="gear"
                        backgroundColor={Theme.Theme.colors.third}
                        onPress={() => {
                            console.log("on press on Setting")
                            props.navigation.navigate('Setting System')
                        }}
                    >
                        Setting
                    </Icon.Button>
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 8 }}>
                    <Icon.Button
                        name="question"
                        backgroundColor={Theme.Theme.colors.third}
                        onPress={() => {
                            console.log("on press on Setting")
                            props.navigation.navigate('Help')
                        }}
                    >
                        <Text style={{ marginLeft: 10, color: "#fff" }}>
                            Help
                        </Text>
                    </Icon.Button>
                </View>
            </View>
            {/* <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView> */}
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    individualInfo: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
        paddingBottom: 10,
        backgroundColor: Theme.Theme.colors.third,
        marginBottom: 10
    },
    WorkspacesInfo: {
        marginHorizontal: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        maxHeight: 170,
        paddingBottom: 5
    },
    WorkspacesInfoText: {
        width: '100%',
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
        marginTop: 24,
    },
    sideInfo: {
        margin: 10,
        alignItems: 'center',
    },
    sideTextInfo: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#fff'
    },
});

export default CustomSidebarMenu;