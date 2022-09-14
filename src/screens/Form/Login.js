// import React, { useEffect, useState } from 'react';
// import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomButton from '../../utils/CustomButton'
// import { Button } from '@rneui/themed';
// import { Icon } from 'react-native-elements'
// import { IconButton, MD3Colors } from 'react-native-paper';


// export default function Login({ navigation }) {
//     const [name, setName] = useState('')
//     const [passwordSecured, setPasswordSecured] = useState(true)
//     const setData = async () => {
//         try {
//             await AsyncStorage.setItem('Username', name)
//             console.log("da set name in storage " + name)
//             setName('')
//             await navigation.navigate('MainScreen')
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     useEffect(() => {
//         console.log("dau tien vao" + name)
//     }, [])
//     return (
//         < View style={styles.body} >
//             <Image
//                 style={styles.logo}
//                 source={require('../../assets/logo.png')}
//             />
//             <Text
//                 style={styles.text}>
//                 Task Management Tool App
//             </Text>
//             {/* <TextInput
//                 style={styles.input}
//                 placeholder='Enter your name'
//                 defaultValue={name}
//                 value={name}
//                 onChangeText={(value) => (setName(value))}
//             /> */}
//             <View style={styles.inputView}>
//                 <IconButton
//                     icon='account'
//                     size={20}
//                 />
//                 <TextInput
//                     style={{ flex: 1, paddingHorizontal: 12 }}
//                     secureTextEntry={passwordSecured}
//                     placehoder={'Username'}
//                     textContentType='username'
//                 />
//             </View>
// <View style={styles.inputView}>
//     <IconButton
//         icon='lock'
//         size={20}
//     />
//     <TextInput
//         style={{ flex: 1, paddingHorizontal: 12 }}
//         secureTextEntry={passwordSecured}
//         placehoder={'Password'}
//         textContentType='password'
//     />
//     <TouchableOpacity
//         style={{ padding: 4 }}
//         onPress={() => setPasswordSecured(!passwordSecured)}
//     >
//         <IconButton
//             icon={passwordSecured == true ? 'eye' : 'eye-off'}
//             size={20}
//             onPress={() => setPasswordSecured(!passwordSecured)}
//         />
//     </TouchableOpacity>
// </View>
//             <Button
//                 title="LOG IN"
//                 buttonStyle={{
//                     backgroundColor: '#1eb900',
//                     borderWidth: 2,
//                     borderColor: 'white',
//                     borderRadius: 30,
//                 }}
//                 containerStyle={{
//                     width: 200,
//                     marginHorizontal: 50,
//                     marginVertical: 10,
//                 }}
//                 titleStyle={{ fontWeight: 'bold' }}
//                 onPressFunction={setData}
//             />
//         </View >
//     )
// }

// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#0080ff'
//     },
//     logo: {
//         width: 100,
//         height: 100,
//         margin: 20
//     },
//     text: {
//         fontSize: 30,
//         color: '#fff'
//     },
//     input: {
//         width: 300,
//         borderWidth: 1,
//         borderColor: '#555',
//         borderRadius: 10,
//         backgroundColor: '#fff',
//         textAlign: 'center',
//         fontSize: 20,
//         marginTop: 50,
//         marginBottom: 10
//     },
//     inputView: {
//         width: '100%',
//         height: 44,
//         backgroundColor: '#f1f3f6',
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center'
//     }
// })

import { Title, TextInput, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { View, Image, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import Theme from '../../theme';
import CarImage from '../../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FormApi from '../../api/formApi';
import { useState } from 'react';
export default function Login({ navigation }) {

    const [passwordSecured, setPasswordSecured] = useState(false)

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
                    <Title style={{ fontSize: 50, color: '#e81c2e' }}>
                        Task
                        <Title style={{ fontSize: 50, color: '#202c45' }}>Time</Title>
                    </Title>
                </Title>
                <Title style={{ textAlign: 'center', fontSize: 28, marginBottom: 10 }}>
                    Login
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
                    color={Theme.Theme.colors.secondary}
                    style={{ marginBottom: 20 }}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    onPress={formik.handleSubmit}>
                    Đăng nhập
                </Button>
                <Button mode="text"
                    color={Theme.Theme.colors.primary}
                    onPress={() => navigation.navigate('Register')}>
                    Chưa có tài khoản? Đăng kí
                </Button>
            </View>
        </ScrollView>
    )
}

// import React, { useCallback, useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// import Entypo from '@expo/vector-icons/Entypo';
// import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';

// // Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// export default function App() {
//     const [appIsReady, setAppIsReady] = useState(false);

//     useEffect(() => {
//         async function prepare() {
//             try {
//                 // Pre-load fonts, make any API calls you need to do here
//                 await Font.loadAsync(Entypo.font);
//                 // Artificially delay for two seconds to simulate a slow loading
//                 // experience. Please remove this if you copy and paste the code!
//                 await new Promise(resolve => setTimeout(resolve, 2000));
//             } catch (e) {
//                 console.warn(e);
//             } finally {
//                 // Tell the application to render
//                 setAppIsReady(true);
//             }
//         }

//         prepare();
//     }, []);

//     const onLayoutRootView = useCallback(async () => {
//         if (appIsReady) {
//             // This tells the splash screen to hide immediately! If we call this after
//             // `setAppIsReady`, then we may see a blank screen while the app is
//             // loading its initial state and rendering its first pixels. So instead,
//             // we hide the splash screen once we know the root view has already
//             // performed layout.
//             await SplashScreen.hideAsync();
//         }
//     }, [appIsReady]);

//     if (!appIsReady) {
//         return null;
//     }

//     return (
//         <View
//             style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
//             onLayout={onLayoutRootView}>
//             <Text>SplashScreen Demo! 👋</Text>
//             <Entypo name="rocket" size={30} />
//         </View>
//     );
// }