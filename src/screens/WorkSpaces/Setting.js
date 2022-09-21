import * as React from 'react';
import { Button, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Theme from '../../theme/Theme'
const SettingWordspace = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text>Setting Wordspace</Text>
            </View>
        </SafeAreaView >
    );
};

export default SettingWordspace; 