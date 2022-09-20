import { Title, TextInput, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { View, Image, ScrollView, BackHandler, Alert, StyleSheet, TouchableOpacity, ToastAndroid, Text } from 'react-native';
import { useFormik } from 'formik';
import Theme from '../../theme';
import CarImage from '../../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FormApi from '../../api/formApi';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Login({ navigation }) {
    const [passwordSecured, setPasswordSecured] = useState(false)
    const [backPressCount, setBackPressCount] = useState(0)
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .min(3, 'Quá ngắn!')
            .max(50, 'Quá dài!')
            .required('Vui lòng nhập tên của bạn'),
        password: Yup.string().required('Vui lòng nhập mật khẩu')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            FormApi.login(values).then(res => {
                AsyncStorage.setItem('token', res.accessToken);
                AsyncStorage.setItem('refreshToken', res.refreshToken);
                FormApi.getInfoCustomer().then(res => {
                    AsyncStorage.setItem('role', res.roles);
                    navigation.navigate('Home', { data: res.roles });
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                Alert.alert('Thông báo', 'Có lỗi xảy ra khi đăng nhập, sai tên tài khoản hoặc mật khẩu!');
            });
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
    return (
        <ScrollView>
            <View style={Theme.StyleCommon.Form}>
                <Image
                    source={CarImage}
                    style={Theme.StyleCommon.LogoImage}
                />
                <Title style={{
                    fontStyle: 'italic', textAlign: 'center', paddingTop: 40, paddingBottom: 20,
                    marginBottom: 50
                }}>
                    <Title style={{ fontSize: 50, color: Theme.Theme.colors.primary }}>
                        Task
                        <Title style={{ fontSize: 50, color: '#202c45' }}>Time</Title>
                    </Title>
                </Title>
                <Title style={{ textAlign: 'center', fontSize: 28, marginBottom: 10 }}>
                    Đăng Nhập
                </Title>
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="email"
                    label="Email"
                    autoCapitalize='none'
                    keyboardType="email-address"
                    mode="outlined"
                    value={formik.values.email}
                    onBlur={formik.handleBlur('email')}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                />
                <HelperText type="error" visible={formik.touched.email && Boolean(formik.errors.email)}>
                    {formik.touched.email && formik.errors.email}
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
                    color={Theme.Theme.colors.primary}
                    style={{ marginBottom: 20 }}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    // onPress={formik.handleSubmit}>
                    onPress={() => navigation.navigate('MainScreen')}>
                    Đăng nhập
                </Button>
                <Button mode="text"
                    color={Theme.Theme.colors.primary}
                    onPress={() => navigation.navigate('Register')}>
                    Chưa có tài khoản? Đăng kí
                </Button>
            </View>
        </ScrollView >
    )
}
