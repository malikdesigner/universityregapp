import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import apiUrl from './apiUrl';
let ToastAndroid;
if (Platform.OS === 'android') {
    ToastAndroid = require('react-native').ToastAndroid;
}
const AddSubject = ({ navigation }) => {
  
    const Stack = createStackNavigator();
    const [subject, setSubject] = useState('');
    const handleBack = ()=>{
        navigation.navigate('AllUserData');
    }
    const handleSubmit = async () => {      
            const formData = {
                subject
            };
            console.log(formData);
                try {
                    // Make a POST request to your backend API using Axios
                    const response = await axios.post(`${apiUrl}/addSubject`, formData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const result = response.data;
                    console.log(result);

                    // Handle success
                    if (result.ok) {
                        // Show a success toast
                        if (ToastAndroid) {
                            ToastAndroid.show('Record saved successfully', ToastAndroid.SHORT);
                        } else {
                            alert('Record saved successfully');
                        }
                        navigation.navigate('AllUserData');
                    } else {
                        // Show an error toast
                        if (ToastAndroid) {
                            ToastAndroid.show(result.message || 'Error saving record', ToastAndroid.SHORT);
                        } else {
                            alert('Error saving record');
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                    // Handle network error and show an error toast
                    if (ToastAndroid) {
                        ToastAndroid.show('Network error', ToastAndroid.SHORT);
                    } else {
                        alert('Network error');
                    }
                
            
        }
    };
    return (
        <View style={styles.container}>
            {/* Image */}
            <Image source={require('../assets/usw-logo-01.png')} style={styles.logo} />
            <Text style={styles.registerText}>Add a new Subject</Text>

            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="Subject"
                value={subject}
                onChangeText={(text) => setSubject(text)}
            />

            
            {/* Login Button */}
            <TouchableOpacity style={[styles.button,{backgroundColor:'#be0f34',color:'white'}]} onPress={handleSubmit}>
                <Text style={{color:'white'}}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'white',color:'black'}]} onPress={handleBack}>
                <Text style={{color:'black'}}>Back</Text>
            </TouchableOpacity>           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#222222'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 70,
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
    },
    button: {
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      
    },
    
    registerText: {
        color: '#fff',
        marginTop: 10,
        marginTop: 20,
        fontSize:20

    },

    iconContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',

    },
});

export default AddSubject