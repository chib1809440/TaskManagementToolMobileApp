import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import Theme from '../theme/'
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomSidebarMenu = (props, navigation) => {
    const BASE_PATH =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
    const proileImage = 'react_logo.png';
    const logo = '../assets/myLove.png'
    const listWorkSpaces = [
        { id: 1, "name": 'T-Building', icon: 'building' },
        { id: 2, "name": 'Video-Service', icon: 'camera' },
        { id: 3, "name": 'Sphera', icon: 'camera' },
        { id: 4, "name": 'Sphera xxxxx', icon: 'camera' },
        // { id: 5, "name": 'Sphera xxxxx', icon: 'camera' },
        // { id: 6, "name": 'Sphera xxxxx', icon: 'camera' },
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.individualInfo}>
                <Image
                    source={require('../assets/myLove.png')}
                    style={styles.sideMenuProfileIcon}
                />
                <View style={styles.sideInfo}>
                    <Text style={styles.sideTextInfo} >Thái Minh Chí</Text>
                    <Text >@tmchi</Text>
                    <Text >tmchi@tma.com.vn</Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <Icon.Button
                        name="trello"
                        backgroundColor={Theme.Theme.colors.third}
                        onPress={() => {
                            console.log("on press on boards")
                            props.navigation.navigate('Boards')
                        }}
                    >
                        Boards
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
                        My Task
                    </Icon.Button>
                </View>
            </View>

            <View style={styles.WorkspacesInfo}>
                <View style={styles.WorkspacesInfoText}>
                    <Text
                        style={{ fontSize: 18, fontWeight: "bold" }}
                    >
                        Workspaces
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: Theme.Theme.colors.third
                            }}>
                            ({listWorkSpaces.length})
                        </Text>
                    </Text>
                </View>
                <ScrollView>
                    {listWorkSpaces.map(item => {
                        return (
                            <View key={item.id} style={{ marginBottom: 8 }}>
                                <Icon.Button
                                    name={item.icon}
                                    backgroundColor={Theme.Theme.colors.third}
                                    onPress={() => null}
                                >
                                    {item.name}
                                </Icon.Button>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>

            <View style={{
                flex: 1,
                marginTop: 10,
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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10
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
        marginTop: 24
    },
    sideInfo: {
        margin: 10,
        alignItems: 'center',
    },
    sideTextInfo: {
        fontSize: 18,
        fontWeight: "bold"
    },
});

export default CustomSidebarMenu;