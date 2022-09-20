import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const MyCard = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text>My Card</Text>
                <Button
                    onPress={() => navigation.navigate('Boards')}
                    title="Boards"
                />
            </View>
        </SafeAreaView>
    );
};

export default MyCard;
