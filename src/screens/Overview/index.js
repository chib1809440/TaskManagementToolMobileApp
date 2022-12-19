
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';
import {
    PieChart
} from 'react-native-chart-kit';
import { Icon } from 'react-native-elements';
import { getMemberstoProject, getProjectInfo, getStatusRate, statisticalMember, statisticalTask } from '../../apis/api'
import { Ionicons } from '@expo/vector-icons';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { AntDesign } from '@expo/vector-icons';

const Overview = ({ navigation }) => {

    const route = useRoute()

    const [projectInfo, setProjectInfo] = useState([])
    const [StatusRate, setStatusRate] = useState([])
    const [owner, setOwner] = React.useState("");
    const [isShow, setIsShow] = React.useState({
        check: false,
        id: '',
        name: ''
    });

    async function fetchData(owner) {
        const projectInfo = await getProjectInfo(owner)
        setProjectInfo(projectInfo)
    }

    async function getOwner() {
        try {
            console.log("route.params.owner: ", route.params.owner)
            setOwner(route.params.owner)
        } catch (e) {
            console.log("Get Owner Error: ", e)
        } finally {
            console.log("owner: ", owner, owner.length)
            owner && fetchData(owner)
            console.log("projectInfo: ", projectInfo, projectInfo.length)
        }
    }
    React.useEffect(() => {
        getOwner()
    }, [owner]);

    const [tableHead, setTableHead] = useState(['ID', 'Email', 'Story Point']);
    const [tableData, setTableData] = useState([]);


    const [tableHead1, setTableHead1] = useState(['ID', 'Task Name', 'IsDone', 'Story Point', 'assignee']);
    const [tableData1, setTableData1] = useState([]);

    const handleClickProject = async (projectId, projectName) => {
        const listStatusRate = await getStatusRate(projectId)
        console.log("listStatusRate: ", listStatusRate)
        setStatusRate(listStatusRate)

        const listMember = await statisticalMember(projectId)
        console.log("listMember: ", listMember)
        setTableData(listMember)

        const listTask = await statisticalTask(projectId)
        setTableData1(listTask)
        console.log("listTask: ", listTask)
        setIsShow({
            check: true,
            id: projectId,
            name: projectName
        })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isShow.check}
            >
                <View style={{
                    width: '100%',
                    height: 48,
                    backgroundColor: '#0179c0',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => setIsShow({
                            check: false,
                            id: '',
                            name: ''
                        })}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={{
                        marginRight: 16,
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>{isShow.name}</Text>
                    <Text></Text>
                </View>

                <ScrollView>
                    <View
                        style={{
                            alignItems: 'center',
                            margin: 10,
                            // borderWidth: 1,
                            borderRadius: 10,
                            // borderColor: 'rgba(0,0,0,0.4)'
                        }}>
                        <Text style={{
                            fontSize: 18,
                            lineHeight: 18,
                            fontWeight: 'bold'
                        }}>Tỷ lệ trạng thái công việc trong dự án</Text>
                        <PieChart
                            data={StatusRate}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#1cc910',
                                backgroundGradientFrom: '#eff3ff',
                                backgroundGradientTo: '#efefef',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={{
                                // marginVertical: 8,
                                // borderRadius: 16,
                                // backgroundColor: 'white'
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute //for the absolute number remove if you want percentage
                        />
                    </View>

                    <View style={styles.container}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Thống kê thành viên trong dự án</Text>
                        </View>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={tableHead} flexArr={[1, 2, 1]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={tableData} flexArr={[1, 2, 1]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View>

                    <View style={styles.container}>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Thống kê công việc trong dự án</Text>
                        </View>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={tableHead1} flexArr={[0.5, 3, 1.1, 1, 3]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={tableData1} flexArr={[0.5, 3, 1.1, 1, 3]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View>
                </ScrollView>
            </Modal>

            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                    {projectInfo.map((item, key) => {
                        return (
                            <TouchableOpacity
                                key={key}
                                style={{
                                    width: '40%',
                                    height: 150,
                                    backgroundColor: 'white',
                                    margin: 12,
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    console.log("click: ", item._id)
                                    handleClickProject(item._id, item.projectName)

                                }}>
                                <View
                                    // key={key}
                                    style={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}>{item.projectName.toUpperCase()}</Text>
                                    <Text>{item.tagNameProject}</Text>

                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        // paddingTop: 250,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.4)',
        borderRadius: 5,
        marginTop: 10,
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
    },
    wrapper: {
        flexDirection: 'row',

    },
    title: {
        flex: 1,
        backgroundColor: '#f6f8fa',
    },
    row: {
        height: 32,
    },
    text: {
        textAlign: 'center',
    },
});
export default Overview;

