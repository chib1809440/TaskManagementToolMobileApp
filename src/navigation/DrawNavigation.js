import 'react-native-gesture-handler';
import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Boards from '../screens/Boards';
import MyCard from '../screens/MyCard';
import Topic from '../screens/Topic';
import WorkSpaces from '../screens/WorkSpaces';
import SettingWorkSpaces from '../screens/WorkSpaces/Setting';
import theme from '../theme/Theme'
import CustomSidebarMenu from './CustomSidebarMenu'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements';
import { ToastAndroid } from 'react-native';

const Tab = createBottomTabNavigator();
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

// function FirstScreenStack({ navigation }) {
//     return (
//         <Tab.Navigator
//             initialRouteName="Boards"
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, size, color }) => {
//                     let iconName;
//                     if (route.name === 'Boards') {
//                         iconName = 'trello';
//                         size = focused ? 25 : 20;
//                         color = focused ? theme.colors.third : '#555';
//                     } else if (route.name === 'MyCard') {
//                         iconName = 'tasks';
//                         size = focused ? 25 : 20;
//                         color = focused ? theme.colors.third : '#555';
//                     }
//                     else if (route.name === 'WorkSpaces') {
//                         iconName = 'calendar';
//                         size = focused ? 25 : 20;
//                         color = focused ? theme.colors.third : '#555';
//                     }
//                     else if (route.name === 'Notification') {
//                         iconName = 'bell';
//                         size = focused ? 25 : 20;
//                         color = focused ? theme.colors.third : '#555';
//                     } else {
//                         iconName = 'cog';
//                         size = focused ? 25 : 20;
//                     }
//                     return (
//                         <FontAwesome5
//                             name={iconName}
//                             size={size}
//                             color={color}
//                         />
//                     )
//                 }
//             })}
//             tabBarOptions={{
//                 initialRouteName: "Boards",
//                 activeTintColor: '#0080ff',
//                 activeBackgroundColor: '#fff',
//                 // inactiveBackgroundColor: '#ccc',
//                 // showLabel: false,
//                 labelStyle: { fontSize: 14 },
//                 showIcon: true,
//             }}
//             activeColor='#f0edf6'
//             inactiveColor='#3e2465'
//             barStyle={{ backgroundColor: '#694fad' }}
//         >
//             <Tab.Screen
//                 name="Boards"
//                 component={Boards}
//                 options={{
//                     headerShown: false,
//                     title: 'Boards',
//                     headerLeft: () => (
//                         <NavigationDrawerStructure navigationProps={navigation} />
//                     ),
//                     headerStyle: {
//                         backgroundColor: theme.colors.primary, //Set Header color
//                     },
//                     headerTintColor: '#fff', //Set Header text color
//                     headerTitleStyle: {
//                         fontWeight: 'bold', //Set Header text style
//                     },
//                 }}
//             />
//             <Tab.Screen
//                 name="MyCard"
//                 component={MyCard}
//                 options={{
//                     headerShown: false,
//                     title: 'MyCard',
//                     headerLeft: () => (
//                         <NavigationDrawerStructure navigationProps={navigation} />
//                     ),
//                     headerStyle: {
//                         backgroundColor: theme.colors.primary, //Set Header color
//                     },
//                     headerTintColor: '#fff', //Set Header text color
//                     headerTitleStyle: {
//                         fontWeight: 'bold', //Set Header text style
//                     },
//                 }}
//             />
//             <Tab.Screen
//                 name="WorkSpaces"
//                 component={WorkSpaces}
//                 options={{
//                     headerShown: true,
//                     title: 'WorkSpaces',
//                     headerLeft: () => (
//                         <NavigationDrawerStructure navigationProps={navigation} />
//                     ),
//                     headerStyle: {
//                         backgroundColor: theme.colors.primary, //Set Header color
//                     },
//                     headerTintColor: '#fff', //Set Header text color
//                     headerTitleStyle: {
//                         fontWeight: 'bold', //Set Header text style
//                     },
//                 }}
//             />
//         </Tab.Navigator>
//     );
// }

function BoardsScreen({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="SecondPage"
            screenOptions={{
                // headerLeft: () => (
                //     <NavigationDrawerStructure navigationProps={navigation} />
                // ),
                headerStyle: {
                    backgroundColor: theme.colors.primary, //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="Boards"
                component={Boards}
                options={{
                    title: 'Boards xxx', //Set Header Title
                    headerShown: false,
                }}
            />
            <Stack.Screen
                headerShown={false}
                name="Topic"
                component={Topic}
                options={{
                    title: 'Topic', //Set Header Title
                    headerShown: true,
                    headerStyle: { height: 40, backgroundColor: theme.colors.third },
                    headerRight: () => (
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 8 }}
                                onPress={() => {
                                    console.log("onPress room chat")
                                    ToastAndroid.show('onPress room chat', ToastAndroid.SHORT);
                                    // navigation.navigate('SettingWorkSpaces')
                                }}
                            >
                                <Icon
                                    name='comments'
                                    type='font-awesome'
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 8 }}
                                onPress={() => {
                                    console.log("onPress notification")
                                    ToastAndroid.show('onPress notification', ToastAndroid.SHORT);
                                    // navigation.navigate('SettingWorkSpaces')
                                }}
                            >
                                <Icon
                                    name='bell'
                                    type='font-awesome'
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 8 }}
                                onPress={() => {
                                    console.log("onPress setting topic")
                                    ToastAndroid.show('onPress setting topic', ToastAndroid.SHORT);
                                    // navigation.navigate('SettingWorkSpaces')
                                }}
                            >
                                <Icon
                                    name='gear'
                                    type='font-awesome'
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="WorkSpaces"
                component={WorkSpaces}
                options={{
                    title: 'Menu WorkSpaces', //Set Header Title
                    headerStyle: { height: 40, backgroundColor: theme.colors.third },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ paddingHorizontal: 8 }}
                            onPress={() => {
                                console.log("onPress setting")
                                ToastAndroid.show('onPress Setting Wordspace', ToastAndroid.SHORT);
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
                    title: 'Setting WorkSpaces', //Set Header Title
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
            screenOptions={{ headerShown: true }}
            drawerContentOptions={{
                activeTintColor: theme.colors.third,
                itemStyle: { marginVertical: 5 },
            }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen
                name="Boards"
                options={{ drawerLabel: 'Board page Option' }}
                component={BoardsScreen}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;