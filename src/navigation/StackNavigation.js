import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation'
import Loading from '../screens/Loading'
import Login from '../screens/Form/Login'
import Register from '../screens/Form/Register'
import MainScreen from '../screens/MainScreen'

const Stack = createStackNavigator();
export default function StackNavigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="Loading"
                    component={Loading}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                />
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}