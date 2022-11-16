import { Title, TextInput, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { View, Image, ScrollView, BackHandler, Alert, StyleSheet, TouchableOpacity, ToastAndroid, Text } from 'react-native';
import { useFormik } from 'formik';
import Theme from '../../theme';
import CarImage from '../../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../apis/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Login({ navigation }) {
    const [passwordSecured, setPasswordSecured] = useState(false)
    const [backPressCount, setBackPressCount] = useState(0)
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Quá ngắn!')
            .max(50, 'Quá dài!')
            .required('Vui lòng nhập tên của bạn'),
        password: Yup.string().required('Vui lòng nhập mật khẩu')
    });

    async function toLogin(data) {
        const member = await login(data)
        console.log("member: ", member)
        if (member != null) {
            try {
                await AsyncStorage.setItem('userName', member.username);
                await AsyncStorage.setItem('fullName', member.fullName);
                await AsyncStorage.setItem('tagName', member.tagName);
                navigation.navigate('MainScreen')
            } catch (e) {
                console.log(e)
            }
        } else {
            Alert.alert('Thông báo', 'Có lỗi xảy ra khi đăng nhập, sai tên tài khoản hoặc mật khẩu!');
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values);
            toLogin(values)
            // FormApi.login(values).then(res => {
            // AsyncStorage.setItem('token', res.accessToken);
            // AsyncStorage.setItem('refreshToken', res.refreshToken);
            //     FormApi.getInfoCustomer().then(res => {
            //         AsyncStorage.setItem('role', res.roles);
            //         navigation.navigate('Home', { data: res.roles });
            //     }).catch(err => {
            //         console.log(err);
            //     });
            // }).catch(err => {
            // Alert.alert('Thông báo', 'Có lỗi xảy ra khi đăng nhập, sai tên tài khoản hoặc mật khẩu!');
            // });
        },
    });
    const handleBackPress = useCallback(() => {
        if (backPressCount === 0) {
            setBackPressCount(prevCount => prevCount + 1);
            setTimeout(() => setBackPressCount(0), 2000);
            ToastAndroid.show('Nhấn thêm lần nữa để thoát!', ToastAndroid.SHORT);
        } else if (backPressCount === 1) {
            BackHandler.exitApp();
        }
        return true;
    }, [backPressCount]);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, [backPressCount]);


    async function clearAll() {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log(e)
        }
        console.log('Done.')
    }

    useEffect(() => {
        clearAll()
    }, [])
    return (
        < ScrollView style={{ backgroundColor: '#fff' }
        }>
            <View style={Theme.StyleCommon.Form}>
                <Image
                    source={CarImage}
                    style={Theme.StyleCommon.LogoImage}
                />
                <Title style={{
                    fontStyle: 'italic', textAlign: 'center', paddingTop: 40, paddingBottom: 20,
                    marginBottom: 50
                }}>
                    <Title style={{ fontSize: 50, color: Theme.Theme.colors.third }}>
                        Task
                        <Title style={{ fontSize: 50, color: '#202c45' }}>Time</Title>
                    </Title>
                </Title>
                <Title style={{ textAlign: 'center', fontSize: 28, marginBottom: 10 }}>
                    Login
                </Title>
                <TextInput
                    name="username"
                    label="Username"
                    autoCapitalize='none'
                    keyboardType="username-address"
                    mode="outlined"
                    value={formik.values.username}
                    onBlur={formik.handleBlur('username')}
                    onChangeText={(text) => formik.setFieldValue('username', text)}
                />
                <HelperText type="error" visible={formik.touched.username && Boolean(formik.errors.username)}>
                    {formik.touched.username && formik.errors.username}
                </HelperText>
                <TextInput
                    name="password"
                    autoCapitalize='none'
                    label="Mật khẩu"
                    secureTextEntry
                    mode="outlined"
                    value={formik.values.password}
                    onBlur={formik.handleBlur('password')}
                    onChangeText={(text) => formik.setFieldValue('password', text)}
                />
                <HelperText type="error" visible={formik.touched.password && Boolean(formik.errors.password)}>
                    {formik.touched.password && formik.errors.password}
                </HelperText>
                <Button mode="contained"
                    // backgroundColor={ 'red'}
                    style={{ marginBottom: 20, backgroundColor: Theme.Theme.colors.primary }}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    onPress={formik.handleSubmit}>
                    {/* onPress={() => (
                        console.log("onPress Button Login -> MainScreen"),
                        navigation.navigate('MainScreen'))}> */}
                    Đăng nhập
                </Button>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text> Chưa có tài khoản?</Text>
                    <Button mode="text"
                        color={Theme.Theme.colors.third}
                        onPress={() => navigation.navigate('Register')}>
                        Đăng kí
                    </Button>
                </View>
            </View>
        </ScrollView >
    )
}
