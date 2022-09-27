import * as React from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import theme from '../../theme/Theme';

const SettingSystem = ({ navigation }) => {
    const general = [
        {
            id: '1',
            title: 'Đăng Xuất',
            navigate: 'Loading'
        },
        {
            id: '2',
            title: 'Tìm hiểu thêm TaskTime',
            navigate: 'information'
        },
        {
            id: '3',
            title: 'Liên Hệ Hỗ Trợ',
            navigate: 'Contact'
        }
    ]
    const renderItem = ({ item }) => (
        <View key={item.id} style={{ marginBottom: 6 }}>
            <TouchableOpacity
                onPress={() => (
                    console.log("onPress", item.id)
                )}
                style={{
                    backgroundColor: theme.colors.third,
                    marginVertical: 4,
                    marginHorizontal: 10,
                    borderRadius: 4,
                    height: 38,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Text style={{
                    marginHorizontal: 8,
                    color: '#000',
                    fontSize: 16
                }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text
                    style={{ marginLeft: 10, color: theme.colors.third, fontSize: 16 }}
                >
                    Tổng Quan
                </Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={general}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default SettingSystem;