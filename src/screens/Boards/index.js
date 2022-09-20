import * as React from 'react';
import { Button, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
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
                        onPress={() => navigation.navigate('WorkSpaces')}
                    >
                        <Icon
                            name='ellipsis-h'
                            type='font-awesome'
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
                <Text>Boards 111111</Text>
            </View>
        </SafeAreaView >
    );
};

export default Boards; 