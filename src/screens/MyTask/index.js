import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../theme/Theme'

const MyTask = ({ navigation }) => {
    const listWorkSpaces = [
        { id: 1, "name": 'T-Building', icon: 'building' },
        { id: 2, "name": 'Video-Service', icon: 'camera' },
        { id: 3, "name": 'Sphera', icon: 'camera' },
        { id: 4, "name": 'Sphera xxxxx', icon: 'camera' },
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}>

                {listWorkSpaces.map(workSpace => (
                    <View
                        key={workSpace.id}
                        style={{ width: '45%', height: '20%', marginTop: 10, borderRadius: 10, backgroundColor: '#ccc' }}>
                        <View
                            style={{
                                width: '100%',
                                height: '60%',
                                backgroundColor: theme.colors.third,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Icon
                                name={workSpace.icon}
                                color="#4F8EF7"
                                size={36}
                            />
                        </View>
                        <View style={{ width: '100%', height: '40%', justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(`onPress ${workSpace.name}`)
                                    navigation.navigate('Boards', { screen: 'MainBoard' }, { workSpaceId: workSpace.id });
                                }}
                            >
                                <Text style={{ fontSize: 16 }}>{workSpace.name}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default MyTask;
