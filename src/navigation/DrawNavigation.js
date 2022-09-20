import 'react-native-gesture-handler';
import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Boards from '../screens/Boards';
import MyCard from '../screens/MyCard';
import WorkSpaces from '../screens/WorkSpaces';
import SecondPage from '../screens/MyTask';
import ThirdPage from '../screens/Info';
import theme from '../theme/Theme'
import CustomSidebarMenu from './CustomSidebarMenu'

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

function FirstScreenStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Boards">
            <Stack.Screen
                name="Boards"
                component={Boards}
                options={{
                    title: 'Boards',
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.primary, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen
                name="MyCard"
                component={MyCard}
                options={{
                    title: 'MyCard',
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.primary, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen
                name="WorkSpaces"
                component={WorkSpaces}
                options={{
                    title: 'WorkSpaces',
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.primary, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function SecondScreenStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="SecondPage"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerStructure navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: theme.colors.primary, //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="SecondPage"
                component={SecondPage}
                options={{
                    title: 'Second Page', //Set Header Title
                }}
            />
            <Stack.Screen
                name="ThirdPage"
                component={ThirdPage}
                options={{
                    title: 'Third Page', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
}

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 5 },
            }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen
                name="Boards"
                options={{ drawerLabel: 'First page Option' }}
                component={FirstScreenStack}
            />
            <Drawer.Screen
                name="SecondPage"
                options={{ drawerLabel: 'Second page Option' }}
                component={SecondScreenStack}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;
