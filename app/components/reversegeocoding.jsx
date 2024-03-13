const getReverseGeocoding = async (latitude, longitude) => {
    try {
        const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=65f1799bd9e19304693331bxo16e469`);
      
        const data = await response.json();

        // Log the response to understand its structure
        console.log(data);

        if (data && data.display_name) {
            // Extract the formatted address from the response
            const address = data.address.residential + ','+ data.address.city+', '+ data.address.country;
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
const parseAddress = (address) => {
    const addressParts = address.split(',').map(part => part.trim());
    return {
        residential: addressParts[0],
        city: addressParts[2],
        country: addressParts[addressParts.length - 1]
    };
};
const extractCoordinates = (userLocation) => {
    const [longitude, latitude] = userLocation.split('|').map(coord => parseFloat(coord));
    return [longitude, latitude];
};
useEffect(() => {
    const fetchUserLocations = async () => {
        const updatedUserDataArray = [];
        const locations = [];
        for (const userData of userDataArray) {
            if (userData.label === 'userlocation') {
                const [longitude, latitude] = extractCoordinates(userData.value);
                try {
                    const address = await getReverseGeocoding(latitude, longitude);
                    if (address) {
                        setLocationDetails(parseAddress(address));
                        updatedUserDataArray.push({
                            label: 'userlocation', // Use the same label
                            value: address // Replace the original user location with the fetched address
                        });
                    } else {
                        console.log('Failed to retrieve location.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                updatedUserDataArray.push(userData);
            }
        }
        setLocationDetails(updatedUserDataArray);
    };

    fetchUserLocations();
}, []); // Run once on component mount
