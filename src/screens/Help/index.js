import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const Help = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text>Help</Text>
            </View>
        </SafeAreaView>
    );
};

export default Help;
