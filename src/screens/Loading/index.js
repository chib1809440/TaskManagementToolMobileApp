import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, View, TextInput, Linking, Button, ToastAndroid, Pressable, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Loading({ navigation }) {
    const { name, setName } = useState(' ')
    const getData = () => {
        try {
            AsyncStorage.getItem('Username')
                .then(async (value) => {
                    if (value !== null) {
                        setName(value)
                        await navigation.navigate('MainScreen')
                    } else {
                        await navigation.navigate('Login')
                    }
                }).catch(e => console.log(e))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        console.log("loading", name)
        getData()
    }, [])
    return (
        <View style={styles.body}>
            <View style={styles.body}>
                <Image
                    style={styles.img}
                    source={require('../../assets/NicePng_time-management-png_9104153.png')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 250,
        height: 250
    }
})