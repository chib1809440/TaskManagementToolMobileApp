import moment from 'moment';
import * as Yup from 'yup';
import Theme from '../../theme';
import { useState } from 'react';
import { useFormik } from 'formik';
import GoogleLogin from './Google';
import { Alert } from 'react-native';
// import FormApi from '../../api/formApi';
import CarImage from '../../assets/logo.png';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import { Title, TextInput, Button, HelperText } from 'react-native-paper';

function CheckEmail(value) {
    return new Promise((resolve, reject) => {
        FormApi.existAccount({ email: value }).then(res => {
            if (res.exist) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

export default function Register({ navigation }) {
    const [data, setData] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [valueDateShow, setValueDateShow] = useState(null);
    const [valueDate, setValueDate] = useState();
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        setValueDate(date);
        formik.setFieldValue('dateOfBirth', date);
        setValueDateShow(moment(date).format('DD/MM/YYYY'));
        hideDatePicker();
    };
    const handleRedirect = (value, data) => {
        setData(data);
        navigation.navigate(value, data);
    }
    const registerSchema = Yup.object().shape({
        email: Yup.string()
            .min(3, 'Quá ngắn!')
            .max(50, 'Quá dài!')
            .required('Vui lòng nhập tên của bạn')
            .test('Unique Email', 'Email đã tồn tại', // <- key, message
                CheckEmail
            ),
        password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        rePassword: Yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
        firstName: Yup.string().required('Vui lòng nhập tên của bạn'),
        lastName: Yup.string().required('Vui lòng nhập họ của bạn'),
        phoneNumber: Yup.number().typeError('Vui lòng nhập số').required('Vui lòng nhập số điện thoại').min(100000000, 'Số điện thoại không hợp lệ'),
        dateOfBirth: Yup.date().typeError('Vui lòng chọn ngày sinh').max(new Date(), "Ngày sinh không hợp lệ"),

    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rePassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            dateOfBirth: null,
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            const signUpFormData = values;
            FormApi.signUp(signUpFormData).then(res => {
                console.log(res);
                Alert.alert('Thông báo', 'Đăng ký tài khoản mới thành công, đăng nhập để sử dụng!');
                navigation.navigate('Login');

            }).catch(err => {
                console.log(err);
                Alert.alert('Thông báo', 'Đăng ký tài khoản mới thất bại!');
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
                    <Title style={{ fontSize: 50, color: Theme.Theme.colors.third }}>
                        Task
                        <Title style={{ fontSize: 50, color: '#202c45' }}>Time</Title>
                    </Title>
                </Title>
                <Title style={{ textAlign: 'center', fontSize: 28 }}>
                    Sign up
                </Title>

                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="lastName"
                    label="Tên đầy đủ"
                    mode="outlined"
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur('lastName')}
                    onChangeText={(text) => formik.setFieldValue('lastName', text)}
                />
                <HelperText type="error" visible={formik.touched.lastName && Boolean(formik.errors.lastName)}>
                    {formik.touched.lastName && formik.errors.lastName}
                </HelperText>
                {/* <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="firstName"
                    label="Tên"
                    mode="outlined"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur('firstName')}
                    onChangeText={(text) => formik.setFieldValue('firstName', text)}
                />
                <HelperText type="error" visible={formik.touched.firstName && Boolean(formik.errors.firstName)}>
                    {formik.touched.firstName && formik.errors.firstName}
                </HelperText> */}

                <TouchableOpacity
                    activeOpaticy={1}
                    onPress={showDatePicker}>
                    <TextInput
                        label="Ngày sinh"
                        name="dateOfBirth"
                        value={valueDateShow}
                        mode="outlined"
                        editable={false} // optional
                        onChangeText={text => {
                            formik.setFieldValue('dateOfBirth', text);
                            setValueDateShow(text);
                        }}
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    maximumDate={new Date()}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <HelperText type="error" visible={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}>
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                </HelperText>
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="phoneNumber"
                    label="Số điện thoại"
                    keyboardType="numeric"
                    mode="outlined"
                    value={formik.values.phoneNumber}
                    onBlur={formik.handleBlur('phoneNumber')}
                    onChangeText={(text) => formik.setFieldValue('phoneNumber', text)}
                />
                <HelperText type="error" visible={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </HelperText>
                <TextInput
                    style={Theme.StyleCommon.TextInput}
                    name="email"
                    label="Username"
                    keyboardType="email-address"
                    mode="outlined"
                    value={formik.values.email}
                    // onBlur={formik.handleBlur('email')}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                />
                <HelperText type="error" visible={formik.touched.email && Boolean(formik.errors.email)}>
                    {formik.touched.email && formik.errors.email}
                </HelperText>
                <TextInput
                    name="password"
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
                <TextInput
                    name="rePassword"
                    label="Nhập lại mật khẩu"
                    secureTextEntry
                    mode="outlined"
                    value={formik.values.rePassword}
                    onBlur={formik.handleBlur('rePassword')}
                    onChangeText={(text) => formik.setFieldValue('rePassword', text)}
                />
                <HelperText type="error" visible={formik.touched.rePassword && Boolean(formik.errors.rePassword)}>
                    {formik.touched.rePassword && formik.errors.rePassword}
                </HelperText>
                <Button mode="contained"
                    style={{ marginBottom: 20 }}
                    color={Theme.Theme.colors.third}
                    dark={true}
                    labelStyle={{ padding: 5 }}
                    onPress={formik.handleSubmit}>
                    Đăng kí
                </Button>
                <Button mode="text"
                    color={Theme.Theme.colors.third}
                    onPress={() => navigation.navigate('Login')}>
                    Đăng nhập với tài khoản
                </Button>
                {/* <GoogleLogin redirect={handleRedirect} /> */}
            </View>
        </ScrollView>
    )
}