// // import * as React from 'react';
// // import { Button, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
// // import { Icon } from 'react-native-elements';
// // import Theme from '../../theme/Theme'
// // const SettingWordspace = ({ navigation }) => {
// //     return (
// //         <SafeAreaView style={{ flex: 1 }}>
// //             <View style={{ flex: 1 }}>
// //                 <Text>Setting Wordspace</Text>
// //             </View>
// //         </SafeAreaView >
// //     );
// // };

// // export default SettingWordspace;
// import React, { useState } from 'react'
// import { View, Text, StyleSheet, Button, TextInput, Picker } from 'react-native'
// import DateTimePicker from '@react-native-community/datetimepicker'
// import DatePicker from 'react-native-modern-datepicker';
// function useInput() {
//     const [date, setDate] = useState(new Date());
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);

//     const showMode = (currentMode) => {
//         setShow(true);
//         setMode(currentMode);
//     };
//     const showDatepicker = () => {
//         showMode('date');
//     };
//     const showTimepicker = () => {
//         showMode('time');
//     };
//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date
//         setShow(Platform.OS === 'ios');
//         setDate(currentDate);
//     }
//     return {
//         date,
//         showDatepicker,
//         showTimepicker,
//         show,
//         mode,
//         onChange
//     }
// }

// const SettingWordspace = ({ navigation }) => {
//     const [selectedDate, setSelectedDate] = useState('');

//     const input = useInput(new Date())
//     const input2 = useInput(new Date())
//     return (
//         <DatePicker
//             onSelectedChange={date => setSelectedDate(date)}
//         />
//         // <View >
//         //     <Button
//         //         onPress={input.showDatepicker}
//         //         title={input.date.toLocaleDateString()} />
//         //     {input.show && (
//         //         <DateTimePicker
//         //             testID="dateTimePicker1"
//         //             value={input.date}
//         //             mode={input.mode}
//         //             is24Hour={true}
//         //             display="default"
//         //             onChange={input.onChange}
//         //         />
//         //     )}

//         //     <Button
//         //         onPress={input2.showTimepicker}
//         //         title={(input2.date.toLocaleDateString())} />
//         //     {input2.show && (
//         //         <DateTimePicker
//         //             testID="dateTimePicker2"
//         //             value={input2.date}
//         //             mode={input2.mode}
//         //             is24Hour={true}
//         //             display="default"
//         //             onChange={input2.onChange}
//         //         />
//         //     )}

//         // </View>
//     )
// }
// export default SettingWordspace;

import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native'

export default SettingWordspace = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        setShow(true)
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const setDate1 = (event, date1) => {
        console.log("event:", event, "date1:", date1);
    }
    const setDate2 = (event, date2) => {
        console.log("event:", event, "date2:", date2);
    }
    return (
        <View>
            {open &&
                <Text style={{ flex: 1, borderWidth: 1, height: 50 }}>
                    <RNDateTimePicker value={new Date()} onChange={setDate1} />;
                </Text>}
            <Button
                title={"test"}
                onPress={() => { setOpen(true) }
                }>
            </Button>

            {show &&
                <Text style={{ flex: 1, borderWidth: 1, height: 50 }}>
                    <RNDateTimePicker value={new Date()} onChange={setDate2} />;
                </Text>}
            <Button
                title={"show"}
                onPress={() => { setOpen(false), setShow(true) }
                }>
            </Button>
        </View>
    );
};
