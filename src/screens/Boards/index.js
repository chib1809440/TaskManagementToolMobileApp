import * as React from 'react';
import { Button, View, Text, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import Theme from '../../theme/Theme'
const Boards = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#ccc',
                        height: 40,
                        alignItems: 'center',
                        backgroundColor: Theme.colors.third,
                    }}
                >
                    <Text style={{ marginLeft: 8, color: '#fff' }}>T-Building's Workspace</Text>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 8 }}
                        onPress={() => {
                            ToastAndroid.show('onPress Menu Wordspace', ToastAndroid.SHORT);
                            navigation.navigate('WorkSpaces')
                        }}
                    >
                        <Icon
                            name='ellipsis-h'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
                <Text>Chứa danh sách các Topic task của wordspace</Text>
                <TouchableOpacity
                    style={{ paddingHorizontal: 8 }}
                    onPress={() => {
                        console.log("onPress to switch topic screen")
                        navigation.navigate('Topic')
                    }}
                >
                    <Icon
                        name='tag'
                        type='font-awesome'
                        color={'#000'}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
};

export default Boards; 