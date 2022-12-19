import * as React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../theme/Theme'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { getAccount, updateAccount } from '../../apis/api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import md5 from "react-native-md5";

function PersonalInfo({ route }) {
    console.log("Personal Info: ", route)
    const [data, setData] = useState({})
    useEffect(() => {
        const fetch = async (data) => {
            const result = await getAccount(data, undefined)
            if (result.length == 1) {
                setData(result[0])
            }
        }
        fetch(route.params.username)
    }, [route])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <AntDesign
                name="infocirlceo"
                size={40}
                color='#0179c0'
                style={{
                    marginVertical: 10
                }}
            />
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 10
                }}
            >
                Thông tin tài khoản
            </Text>
            <TextInput
                disabled={true}
                mode='outlined'
                label="Tên tài khoản"
                value={data.username}
                onChangeText={text => console.log(text)}
                style={{
                    width: '90%',
                    height: 48,
                    marginBottom: 10
                }}
            />

            <TextInput
                disabled={true}
                mode='outlined'
                label="Ngày sinh"
                value={data?.dob || '14/10/1999'}
                onChangeText={text => console.log(text)}
                style={{
                    width: '90%',
                    height: 48,
                    marginBottom: 10
                }}
            />

            <TextInput
                disabled={true}
                mode='outlined'
                label="Số điện thoại"
                value={data?.phone || '0898641337'}
                onChangeText={text => console.log(text)}
                style={{
                    width: '90%',
                    height: 48,
                    marginBottom: 10
                }}
            />

            <TextInput
                disabled={true}
                mode='outlined'
                label="Tên đầy đủ"
                value={data.fullName}
                onChangeText={text => console.log(text)}
                style={{
                    width: '90%',
                    height: 48,
                    marginBottom: 10
                }}
            />
        </View>
    );
}

function ChangePassword({ navigation, route }) {

    const [data, setData] = useState({})
    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')

    const [checkOldPasswd, setCheckOldPassword] = useState(false)
    const [checkRePasswd, setCheckRePassword] = useState(false)
    useEffect(() => {
        const fetch = async (data) => {
            const result = await getAccount(data, undefined)
            if (result.length == 1) {
                setData(result[0])
            }
        }
        fetch(route.params.username)
    }, [route])

    const handleSubmit = async () => {
        if (data.password != md5.hex_md5(oldPassword) || newPassword != reNewPassword) {
            Alert.alert(
                "Thông báo",
                "Vui lòng kiểm tra lại thông tin",
            )
        } else {
            const update = await updateAccount({ _id: data.password, password: md5.hex_md5(reNewPassword) })
            console.log("updateAccount: ", update)
            Alert.alert(
                "Thông báo",
                "Đã cập nhật mật khẩu thành công",
            )
            setOldPassword('')
            setNewPassword('')
            setReNewPassword('')
        }
    }
    return (
        <ScrollView style={{ flex: 1, }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name="account-key-outline"
                    size={40}
                    color='#0179c0'
                    style={{
                        marginVertical: 10
                    }}
                />
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        marginBottom: 10
                    }}
                >
                    Thay đổi mật khẩu
                </Text>

                <TextInput
                    // disabled={true}
                    mode='outlined'
                    label="Mật khẩu cũ"
                    value={oldPassword}
                    onChangeText={text => setOldPassword(text)}
                    style={{
                        width: '90%',
                        height: 48,
                        marginBottom: 10
                    }}
                    secureTextEntry
                />
                {checkOldPasswd && <Text style={{
                    color: 'red',
                    position: 'relative',
                    left: -106,
                    top: -10
                }}>Mật khẩu cũ đã xai!</Text>}
                <TextInput
                    // disabled={true}
                    mode='outlined'
                    label="Mật khẩu mới"
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    style={{
                        width: '90%',
                        height: 48,
                        marginBottom: 10
                    }}
                    secureTextEntry
                />

                <TextInput
                    // disabled={true}
                    mode='outlined'
                    label="Nhập lại mật khẩu mới"
                    value={reNewPassword}
                    onChangeText={text => setReNewPassword(text)}
                    style={{
                        width: '90%',
                        height: 48,
                        marginBottom: 10
                    }}
                    secureTextEntry
                />
                {checkRePasswd && <Text style={{
                    color: 'red',
                    position: 'relative',
                    left: -88,
                    top: -10
                }}>Nhập lại chưa trùng khớp!</Text>}
                <Button icon="send" mode="contained" onPress={() => {
                    console.log(1111)
                    handleSubmit()
                }}>
                    {/* Gửi yêu cầu đên Admin */}
                    Cập nhật thông tin
                </Button>
            </View>


        </ScrollView>

    );
}

function ForgotPassword() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Forgot password!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

const MyTask = ({ navigation, route }) => {
    console.log("Route: ", route)


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName="Info"
                activeColor="#e91e63"
                labelStyle={{ fontSize: 12 }}
                barStyle={{ backgroundColor: 'tomato' }}
            >
                <Tab.Screen
                    name="Thông tin tài khoản người dùng"
                    component={PersonalInfo}
                    initialParams={{ username: route.params.username }}
                    options={{
                        tabBarLabel: 'INFO',
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="infocirlceo" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Thay đổi mật khẩu"
                    initialParams={{ username: route.params.username }}
                    component={ChangePassword}
                    options={{
                        tabBarLabel: 'CHANGE PASSWORD',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account-key-outline" size={26} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Quên mật khẩu"
                    component={ForgotPassword}
                    options={{
                        tabBarLabel: 'FORGOT PASSWORD',
                        tabBarIcon: ({ color }) => (
                            < Ionicons name="md-key-outline" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default MyTask;
