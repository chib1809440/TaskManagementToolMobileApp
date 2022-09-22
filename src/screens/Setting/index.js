import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const SettingSystem = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text>Setting System</Text>
            </View>
        </SafeAreaView>
    );
};

export default SettingSystem;
