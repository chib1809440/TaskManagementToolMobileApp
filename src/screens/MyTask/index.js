import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, View, TextInput, Linking, Button, ToastAndroid, Pressable, Alert, } from 'react-native';


export default function MyTask({ navigation }) {
    return (
        <View style={styles.body}>
            <View style={styles.body}>
                <Text
                    style={
                        styles.text
                    }>
                    MyTask!
                </Text>
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
    text: {
        fontSize: 40,
        margin: 10,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 50,
        marginBottom: 10
    }
})