import 'react-native-gesture-handler';
import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainBoard from '../screens/MainBoard';
import Topic from '../screens/Topic';
import WorkSpaces from '../screens/WorkSpaces';
import SettingWorkSpaces from '../screens/WorkSpaces/Setting';
import SettingSystem from '../screens/Setting';
import MyTask from '../screens/MyTask';
import Overview from '../screens/Overview';
import Help from '../screens/Help';
import RoomChat from '../screens/Topic/RoomChat';
import theme from '../theme/Theme'
import CustomSidebarMenu from './CustomSidebarMenu'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements';
import { ToastAndroid } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={{
                        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                    }}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
};

function BoardsScreen({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="MainBoard"
            screenOptions={{
                // headerLeft: () => (
                //     <NavigationDrawerStructure navigationProps={navigation} />
                // ),
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="MainBoard"
                component={MainBoard}
                options={{
                    title: 'MainBoard',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Menu WorkSpaces"
                component={WorkSpaces}
                options={{
                    title: 'Menu WorkSpaces',
                    headerStyle: { height: 40, backgroundColor: theme.colors.third },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ paddingHorizontal: 8 }}
                            onPress={() => {
                                console.log("onPress SettingWorkSpaces")
                                navigation.navigate('SettingWorkSpaces')
                            }}
                        >
                            <Icon
                                name='gear'
                                type='font-awesome'
                                color={'#fff'}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                headerShown={false}
                name="SettingWorkSpaces"
                component={SettingWorkSpaces}
                options={{
                    title: 'Setting WorkSpaces',
                    headerShown: true,
                    headerStyle: { height: 40, backgroundColor: theme.colors.third },
                }}
            />
        </Stack.Navigator>
    );
}

function TopicScreen({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="TopicMain"
            screenOptions={{
                // headerLeft: () => (
                //     <NavigationDrawerStructure navigationProps={navigation} />
                // ),
                headerStyle: {
                    backgroundColor: theme.colors.primary, //Set Header color
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="TopicMain"
                component={Topic}
                options={{
                    title: 'Topic',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                headerShown={false}
                name="RoomChat"
                component={RoomChat}
                options={{
                    title: 'RoomChat', //Set Header Title
                    headerShown: true,
                    headerStyle: { height: 40, backgroundColor: theme.colors.third },
                }}
            />
        </Stack.Navigator>
    );
}
function DrawerNavigation() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                activeTintColor: theme.colors.third,
                itemStyle: { marginVertical: 5 },
            }}
            // drawerContentOptions={{
            // activeTintColor: theme.colors.third,
            //     itemStyle: { marginVertical: 5 },
            // }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen
                name="Boards"
                options={{ drawerLabel: 'Board' }}
                component={BoardsScreen}
            />
            <Drawer.Screen
                name="Overview"
                options={{ drawerLabel: 'Overview' }}
                component={Overview}
            />
            <Drawer.Screen
                name="MyTask"
                options={{ drawerLabel: 'My Task' }}
                component={MyTask}
            />
            <Drawer.Screen
                name="Setting System"
                options={{ drawerLabel: 'SettingSystem' }}
                component={SettingSystem}
            />
            <Drawer.Screen
                name="Help"
                options={{ drawerLabel: 'Help' }}
                component={Help}
            />
            <Drawer.Screen
                name="Topic"
                options={{ drawerLabel: 'Topic' }}
                component={TopicScreen}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;