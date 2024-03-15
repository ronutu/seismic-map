const NodeGeocoder = require('node-geocoder');
const fs = require('fs');

const geocoderOptions = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: '#######################################',
    formatter: null
};

const geocoder = NodeGeocoder(geocoderOptions);

async function geocodeAddresses() {
    // Read addresses from the JSON file
    const data = fs.readFileSync('onlyAddresses2.json', 'utf8');
    const addresses = JSON.parse(data);
    let locations = [];

    for (const address of addresses) {
        try {
            const result = await geocoder.geocode(address);
            if (result.length > 0) {
                locations.push({
                    address: address,
                    lat: result[0].latitude,
                    lng: result[0].longitude
                });
            }
        } catch (error) {
            console.error('Error geocoding address:', address, error);
        }
    }

    // Save to a JSON file
    fs.writeFileSync('addressesLatLng2.json', JSON.stringify(locations, null, 2));
    console.log('Locations processed and saved in addressesLatLng2.json');

    
}

geocodeAddresses();
