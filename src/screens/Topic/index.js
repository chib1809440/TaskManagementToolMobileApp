import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const Topic = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text>Topic</Text>
                <Text>1. Thêm danh sách như: Todo, In Progress, Ready for testing, Merge, Done</Text>
                <Text>2. drag drog các task in list</Text>
            </View>
        </SafeAreaView>
    );
};

export default Topic;
