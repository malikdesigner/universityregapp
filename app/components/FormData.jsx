import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Import Ionicons from Expo for the 3-dot icon
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import apiUrl from './apiUrl';
import axios from 'axios';

let ToastAndroid;
if (Platform.OS === 'android') {
    ToastAndroid = require('react-native').ToastAndroid;
}
let api_key = "65f1799bd9e19304693331bxo16e469";
const FormData = ({ navigation, route: routeProp }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [locationDetails, setLocationDetails] = useState([]);

    const usersData = routeProp.params.user;
    // const latitude = 33.7803;
    // const longitude = 72.363533;

    // Convert user data object to an array of key-value pairs
    const userDataArray = Object.entries(usersData).map(([key, value]) => ({ label: key, value }));
console.log(userDataArray)
    const handleEdit = () => {
        navigation.navigate('SignUp', { user: routeProp.params.user });
    };
    const handleSignout = () => {
        navigation.navigate('Login');
    };
  
    const renderItem = ({ item }) => {
        const trimmedLabel = item.label.trim(); // Trim the label
        if (trimmedLabel && trimmedLabel !== 'role' && trimmedLabel !== 'id') {
            return (
                <View style={[styles.itemContainer, styles.itemWithBorder]}>
                    <Text style={styles.label}>{trimmedLabel.charAt(0).toUpperCase() + trimmedLabel.slice(1)}</Text>
                    <Text style={styles.value}>{typeof item.value === 'string' ? item.value.charAt(0).toUpperCase() + item.value.slice(1) : item.value}</Text>
                </View>
            );
        } else {
            return null; // Return null if the trimmed label is empty, 'Role', or 'id'
        }
    };
    


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/usw-logo-01.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.heading}>Your Form Data</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.link,{marginRight:10}]} onPress={handleEdit}>Edit</Text>

                    <Text style={[styles.link,{marginLeft:10}]} onPress={handleSignout}>Signout</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <FlatList
                        data={userDataArray}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1} // Set the number of columns
                    />
                    {/* <TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#ccc',
    },
    itemWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    label: {
        flex: 1,
        textAlign: 'left',
        color: 'white',
        marginRight: 8,
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
        color: 'white',
        textAlign: 'left',
        marginLeft: 8,
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
    button: {
        width: '40%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#be0f34',
        color: 'white',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
    },
    content: {
        width: "50%",
        alignSelf: 'center',
        paddingTop: 2,
        paddingBottom: 2
    },
    link: {
        color: '#be0f34',
        textDecorationLine: 'underline',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default FormData;
