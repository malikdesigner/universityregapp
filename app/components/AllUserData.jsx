import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import apiUrl from './apiUrl';

const AllUserData = ({ navigation }) => {
    const [userData, setUserData] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        console.log("Fetching User Data");
        try {
            const response = await axios.get(`${apiUrl}/getUserData`);
            console.log(response.data.userData)
            if (response.data.ok) {

                setUserData(response.data.userData);
                //  setUserData(updatedUserData);

            } else {
                console.error('Error fetching user data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const handleRegisterNow = () => {
        navigation.navigate('TeacherRegistration');
    };
    const handleSignout = () => {
        navigation.navigate('Login');
    };
    return (
        <>
            {
                Platform.OS === 'android' || Platform.OS === 'ios' ? (
                    <View style={styles.container}>

                        <View style={styles.header}>
                            <Image
                                source={require('../assets/usw-logo-01.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.heading}>Form Data</Text>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.link, { marginRight: 10, color: 'white' }]} onPress={handleRegisterNow}>Register Staff</Text>
                                <Text style={styles.link} onPress={handleSignout}>Signout</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={styles.flatList}
                                data={userData}
                                keyExtractor={(item, index) => index.toString()}
                                keyboardShouldPersistTaps="handled"
                                ListFooterComponent={<View style={{ height: 50 }} />}
                                renderItem={({ item }) => (
                                    <View style={styles.content}>
                                        <View style={styles.itemContainer}>
                                            <Text style={[styles.label, { fontSize: 25 }]}>
                                                {item.full_name.charAt(0).toUpperCase() + item.full_name.slice(1)}
                                            </Text>
                                        </View>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Date of Birth:</Text>
                                            <Text style={styles.value}>{item.dob}</Text>
                                            <Text style={[styles.label, { marginLeft: 10 }]}>Area of Interest:</Text>
                                            <Text style={styles.value}>
                                                {item.selectedArea.charAt(0).toUpperCase() + item.selectedArea.slice(1)}
                                            </Text>
                                        </View>

                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Phone Number:</Text>
                                            <Text style={styles.value}>{item.phone_code} {item.phone_number}</Text>
                                        </View>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Email:</Text>
                                            <Text style={styles.value}>{item.email}</Text>
                                        </View>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Marketing Updates:</Text>
                                            <Text style={styles.value}>{item.marketing_updates === 1 ? "Yes" : "No"}</Text>
                                        </View>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Correspondence In Welsh:</Text>
                                            <Text style={styles.value}>{item.correspondence_in_welsh === 1 ? "Yes" : "No"}</Text>
                                        </View>



                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Form Filled from:</Text>
                                            <Text style={styles.value}>{item.userlocation}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.webContainer}>
                        <View style={styles.header}>
                            <Image
                                source={require('../assets/usw-logo-01.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.heading}>Form Data</Text>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.link, { marginRight: 15, color: 'white' }]} onPress={handleRegisterNow}>Register Staff</Text>

                                <Text style={styles.link} onPress={handleSignout}>Signout</Text>
                            </View>
                        </View>

                        <View style={{flex:1, marginBottom: 10, paddingBottom: 10 }}>
                            <FlatList
                                style={styles.flatList}
                                data={userData}
                                keyExtractor={(item, index) => index.toString()}
                                keyboardShouldPersistTaps="handled"
                                ListFooterComponent={<View style={{ height: 50 }} />}
                                renderItem={({ item }) => (
                                    <View style={styles.content}>
                                        <View style={styles.itemContainer}>
                                            <Text style={[styles.label, { fontSize: 25 }]}>
                                                {item.full_name.charAt(0).toUpperCase() + item.full_name.slice(1)}
                                            </Text>
                                        </View>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Date of Birth:</Text>
                                            <Text style={styles.value}>{item.dob}</Text>
                                            <Text style={[styles.label, { marginLeft: 10 }]}>Area of Interest:</Text>
                                            <Text style={styles.value}>
                                                {item.selectedArea.charAt(0).toUpperCase() + item.selectedArea.slice(1)}
                                            </Text>
                                        </View>
                                       
                                                <View style={styles.itemContainer}>
                                                    <Text style={styles.label}>Phone Number:</Text>
                                                    <Text style={styles.value}>{item.phone_code} {item.phone_number}</Text>
                                                    <Text style={[styles.label, { marginLeft: 10 }]}>Email:</Text>
                                                    <Text style={styles.value}>{item.email}</Text>
                                                </View>
                                                <View style={styles.itemContainer}>
                                                    <Text style={styles.label}>Marketing Updates:</Text>
                                                    <Text style={styles.value}>{item.marketing_updates === 1 ? "Yes" : "No"}</Text>
                                                    <Text style={[styles.label, { marginLeft: 10 }]}>Correspondence In Welsh:</Text>
                                                    <Text style={styles.value}>{item.correspondence_in_welsh === 1 ? "Yes" : "No"}</Text>
                                                </View>
                                        
                                    
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.label}>Form Filled from:</Text>
                                            <Text style={styles.value}>{item.userlocation}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                )
            }
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222',
        paddingHorizontal: 16,
        paddingTop: 6,
        // minHeight:'100vh',
        // maxHeight: 'calc(100vh - 250px)', // Adjust as needed
        marginBottom: 10
    },
    webContainer: {
        backgroundColor: '#222222',
        paddingHorizontal: 16,
        paddingTop: 6,
        minHeight: '100vh',
        maxHeight: 'calc(100vh - 250px)', // Adjust as needed
        marginBottom: 10,
        overflowY:'auto'
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#ccc',
    },
    label: {
        flex: 1,
        textAlign: 'left',
        marginRight: 8,
        fontWeight: 'bold',
        color: 'white'
    },
    value: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 8,
        color: 'white'
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 70,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        paddingRight: 10,
        color: 'white'
    },
    content: {
        width: "100%",
        alignSelf: 'center',
        paddingTop: 2,
        paddingBottom: 2,
        borderColor: '#ccc',
        borderBottomWidth: 1
    },
    // scrollContainer: {
    //     flex: 1,
    //     maxHeight: 'calc(100vh - 150px)', // Adjust as needed
    //     overflowY: 'auto',
    // },
    flatList: {
        flexGrow: 1,
    },
    roundButton: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#be0f34',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'row'
    },

    buttonText: {
        color: 'white',
        fontSize: 10,
    },
    link: {
        color: '#be0f34',
        textDecorationLine: 'underline',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AllUserData;
