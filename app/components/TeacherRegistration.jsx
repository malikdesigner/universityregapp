import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import apiUrl from './apiUrl';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';

let ToastAndroid;
if (Platform.OS === 'android') {
    ToastAndroid = require('react-native').ToastAndroid;
}

const TeacherRegistration = () => {

    const Stack = createStackNavigator();
    const navigation = useNavigation();
    // console.log(routeProp.params.user)
    const [step, setStep] = useState(1);

    //const { correspondence_in_welsh, date_added, dob, email, full_name, id, marketing_updates, password, phone_code, phone_number, selectedArea } = routeProp.params.user || {};

    const [fullName, setFullName] = useState('');
    const [emails, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCode, setPhoneCode] = useState('')
    const [passwords, setPassword] = useState('');
    const [dofb, setDOB] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [selectedAreas, setArea] = useState('');
    const [marketingUpdates, setMarketingUpdates] = useState(false);
    const [correspondenceInWelsh, setCorrespondenceInWelsh] = useState(false);
    const [longitute, setLogitute] = useState(null);
    const [latitude, setLatitute] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [subjectData, setSubjectData] = useState([]);

    // let userLocation = '';
    const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            ToastAndroid.CENTER,
            ToastAndroid.WHITE
        );
    };
    const getReverseGeocoding = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=65f1799bd9e19304693331bxo16e469`);

            const data = await response.json();

            // Log the response to understand its structure
            console.log(data);

            if (data && data.display_name) {
                // Extract the formatted address from the response
                const address = data.address.residential + ',' + data.address.city + ', ' + data.address.country;
                return address;
            } else {
                console.error('Geocoding request failed:', data);
                return null;
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
            return null;
        }
    };
    const getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Location permission not granted');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLogitute(location.coords.longitude)
        setLatitute(location.coords.latitude)
        const address = await getReverseGeocoding(location.coords.latitude, location.coords.longitude);
        setUserLocation(address)
        console.log('Current location:', location.coords);
    };

    const getAllSubjects = async () => {
        try {
            const response = await axios.get(`${apiUrl}/getAllSubjects`);
            console.log("SUBJECT DATA")
            console.log(response.data.subData)
            if (response.data.ok) {

                setSubjectData(response.data.subData);
                console.log(response.data.subData)
                //  setUserData(updatedUserData);

            } else {
                console.error('Error fetching user data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    useEffect(() => {
        getLocationAsync();
        getAllSubjects();
    }, []); // Run once on component mount


    const handleSubmit = async () => {
        console.log(isChecked);
        if (!isChecked) {
            if (ToastAndroid) {
                return showToast('Please accept terms & policy');
            } else {
                alert("Please Accept Terms and Policy");
            }
        } else {
            const formData = {
                fullName,
                dofb,
                emails,
                phoneCode,
                phoneNumber,
                passwords,
                selectedAreas,
                marketingUpdates: marketingUpdates ? 1 : 0,
                correspondenceInWelsh: correspondenceInWelsh ? 1 : 0,
                location: userLocation

            };
            console.log(formData);
            try {
                // Make a POST request to your backend API using Axios
                const response = await axios.post(`${apiUrl}/addStaffData`, formData, {
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
                    navigation.navigate('Login');
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

        }
    };
    const handleBack = () => {
        setStep(step - 1);
    };
    const handleNext = () => {
        // Perform validation
        if (step === 2 && (!fullName)) {
            if (ToastAndroid) {

                showToast('Please enter your name');
            }
            else {
                alert('Please enter your name');
            }

        } else if (step === 3 && (!phoneCode || !phoneNumber)) {
            if (ToastAndroid) {

                showToast('Please enter both phone code and number');
            }
            else {
                alert('Please enter both phone code and number');
            }

        } else if (step === 4 && !emails) {


            if (ToastAndroid) {
                showToast('Please add your email address');
            }
            else {
                alert('Please add your email address')
            }
        }
        else if (step === 4 && !emails.includes('@')) {
            if (ToastAndroid) {
                showToast('Please add correct email');
            }
            else {
                alert('Please add correct email')
            }

        } else if (step === 5 && !passwords) {
            if (ToastAndroid) {
                showToast('Please enter your password');
            }
            else {
                alert('Please enter your password');

            }
        }
        else if (step === 6 && !dofb) {

            if (ToastAndroid) {
                showToast('Please select your date of birth');
            }
            else {
                alert('Please select your date of birth')
            }
        }
        else if (step === 6 && dofb < 16) {
            if (ToastAndroid) {
                showToast('You should be 16 years older or above');
            }
            else {
                alert('You should be 16 years older or above')
            }

        }
        // else if (step === 7 && !selectedAreas) {
        //     if (ToastAndroid) {
        //         showToast('Please select your area of interest');
        //     }
        //     else {
        //         alert('Please select your  area of interest')
        //     }
        // }

        else {
            // Proceed to the next step if validation passes
            setStep(step + 1);
        }
    };
    const handleSignout = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={styles.container}>
            {step === 1 && (
                <View style={styles.container}>
                    <View style={styles.startingScreen}>
                        <Image source={require('../assets/usw-logo-01.png')} style={styles.logo} />
                        <Text style={styles.appName}>Register As Staff</Text>
                        <Text style={styles.tagline}>For </Text>

                        <Text style={styles.tagline}>Open Day </Text>

                        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
                            <TouchableOpacity style={styles.getStartedButton} onPress={handleNext}>
                                <Text style={styles.buttonTextLarge}>Get Started</Text>
                                <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.getStartedButton} onPress={handleSignout}>
                                <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                                <Text style={styles.buttonTextLarge}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            )}
            {step === 2 && (
                <View style={styles.form} >
                    <Text style={[styles.stepsHeading, { marginTop: 30, marginBottom: 10 }]}>Enter your Name</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={(text) => setFullName(text)}
                    />


                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                        <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {step === 3 && (
                <View style={styles.form} >
                    <Text style={[styles.stepsHeading, { marginTop: 30, marginBottom: 10 }]}>Enter Your mobile number</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={{
                                flex: 2,
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                padding: 10,
                                color: 'gray',
                            }}
                            placeholder="Code"
                            value={phoneCode}
                            onChangeText={(text) => setPhoneCode(text)}
                        />

                        {/* Phone Number Input */}
                        <TextInput
                            style={{
                                flex: 8,
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                padding: 10,
                                color: 'gray',
                            }}
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>
                    {/* Next Button */}
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                        <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                    </TouchableOpacity>

                </View>
            )}
            {step === 4 && (
                <View style={styles.form}>
                    <Text style={[styles.stepsHeading, { marginTop: 30, marginBottom: 10 }]}>Enter Your Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        value={emails}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text style={{ marginTop: 20, color: 'grey', alignContent: 'center', alignSelf: 'center' }}>
                        Enter Your Email to Get Started.</Text>

                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                        <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {step === 5 && (
                <View style={styles.form}>
                    <Text style={[styles.stepsHeading, { marginTop: 30, marginBottom: 10 }]}>Enter Your Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={passwords}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {/* Add more fields for Step 2 */}

                    <Text style={{ marginTop: 20, color: 'grey', alignContent: 'center', alignSelf: 'center' }}>
                        Secure your gateway with a strong key</Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                        <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {step === 6 && (
                <View style={styles.form}>
                    <Text style={[styles.stepsHeading, { marginTop: 30, marginBottom: 10 }]}>Enter Your DOB</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DOB"
                        value={dofb}
                        onChangeText={(text) => setDOB(text)}
                    />
                    {/* Add more fields for Step 2 */}

                    <Text style={{ marginTop: 20, color: 'grey', alignContent: 'center', alignSelf: 'center' }}>
                        Enter the date of birth for approval</Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                        <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {step === 7 && (
                <View style={styles.form}>
                    <Text style={[styles.stepsHeading, { marginTop: 30, marginBottom: 10 }]}>Area of interest</Text>
                    <Picker
                        selectedValue={selectedAreas}
                        style={styles.dropdown}
                        onValueChange={(itemValue, itemIndex) => setArea(itemValue)}
                    >
                        <Picker.Item label="Select Area of Interest" value="" />
                        {/* Map over subjectData to generate Picker.Item components */}
                        {subjectData.map(subject => (
                            <Picker.Item key={subject.id} label={subject.subjects} value={subject.subjects} />
                        ))}
                    </Picker>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                        <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {
                step === 8 && (
                    <View style={styles.form}>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.subHeading}>Do you agree to marketing updates?</Text>
                            <CheckBox
                                title="Agree to marketing updates?"
                                checked={marketingUpdates}
                                onPress={() => setMarketingUpdates(!marketingUpdates)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.subHeading}>Do you want correspondence in Welsh? </Text>
                            <CheckBox
                                title="Correspondence in Welsh?"
                                checked={correspondenceInWelsh}
                                onPress={() => setCorrespondenceInWelsh(!correspondenceInWelsh)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                        </View>
                        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                            <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundButton} onPress={handleNext}>
                            <Text style={styles.buttonText}>Next</Text>
                            <Icon name="arrow-right" style={styles.arrowIcon} size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )
            }

            {step === 9 && (
                <View style={styles.form}>
                    <Text style={[styles.stepsHeading, { marginTop: 30, marginBottom: 10 }]}>Terms & Privacy Notice</Text>
                    {/* Add more fields for Step 2 */}
                    <CheckBox
                        title={
                            <Text style={{ marginTop: 20, color: 'grey', alignContent: 'center', alignSelf: 'center' }}>
                                By submitting, I confirm that I have read and understood the  terms of use and privacy policy.
                            </Text>
                        }
                        checked={isChecked} // Replace isChecked with your state variable for the checkbox
                        onPress={() => setIsChecked(!isChecked)} // Replace setChecked with your state update function
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginTop: 20 }}
                    />
                    {/* <Text style={{ marginTop: 20, color: 'grey', alignContent: 'center', alignSelf: 'center' }}>
                        By using Travellers, you agree to fair conduct, secure payments, and adherence to our terms. Navigate with confidence, knowing your safety and satisfaction are our top priorities.</Text> */}
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Icon name="arrow-left" style={styles.arrowIcon} size={20} color="white" />
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Add more steps as needed */}
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
    form: {
        paddingTop: 40,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        height: '90%',
        width: '90%',
        marginTop: 20,
        marginBottom: 10,

        marginBottom: '5%',
        color: 'gray',

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        color: 'gray'
    },
    roundButton: {
        width: 100,
        height: 50,
        backgroundColor: '#be0f34',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row'
    },
    backButton: {
        width: 100,
        height: 50,
        backgroundColor: '#be0f34',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        flexDirection: 'row'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    datetimePickerButton: {
        flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: 'blue', // You can change the color
        padding: 2,
        borderRadius: 5,
        marginTop: 2,
        marginBottom: 2,
        alignItems: 'center',
    },
    selectedDateText: {
        marginVertical: 10,
    },


    startingScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222222',
        marginTop: 70
    },
    appName: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        padding: 20
    },
    logo: {
        width: 200,
        height: 200,
        padding: 30,

    },
    tagline: {
        fontSize: 40,
        padding: 10,
        color: '#e3eafa',


    },
    getStartedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#be0f34',
        padding: 15,
        paddingRight: 100,
        paddingLeft: 100,

        borderRadius: 10,
        marginBottom: 10
    },
    buttonTextLarge: {
        color: 'white',
        fontSize: 18,
        marginRight: 10,
    },
    arrowIcon: {
        width: 20,
        height: 20,
        color: 'white',
    },
    stepsHeading: {
        fontSize: 30,
        color: 'brown',
        fontWeight: 'bold'
    },
    dropdown: {
        minWidth: 100, // Adjust the minimum width as needed
        marginBottom: 10,
        padding: 5
    },
    countryLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default TeacherRegistration;
