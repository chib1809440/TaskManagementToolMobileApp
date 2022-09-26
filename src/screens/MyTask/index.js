// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const MyTask = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    // margin: 10,
                    backgroundColor: '#f2f',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}>
                <View style={{ width: '45%', height: '20%', marginTop: 10, borderRadius: 10, backgroundColor: '#ccc' }}>
                    <View
                        style={{
                            width: '100%',
                            height: '60%',
                            backgroundColor: '#fcc',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}>
                    </View>
                    <View style={{ width: '100%', height: '40%', justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16 }}>T-Building</Text>
                    </View>
                </View>
                <View style={{ width: '45%', height: '20%', marginTop: 10, borderRadius: 10, backgroundColor: '#fff' }}>

                </View>
                <View style={{ width: '45%', height: '20%', marginTop: 10, borderRadius: 10, backgroundColor: '#000' }}>

                </View>
                <View style={{ width: '45%', height: '20%', marginTop: 10, borderRadius: 10, backgroundColor: '#2fa' }}>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default MyTask;
