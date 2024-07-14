import axios from 'axios';

const API_KEY = process.env.GOOGLE_API_KEY; 
const API_URL = 'https://places.googleapis.com/v1/places:searchNearby';

interface Location {
  latitude: number;
  longitude: number;
}

interface SearchNearbyParams {
  location: Location;
  radius: number;
}

export const getNearbyRestaurants = async (params: SearchNearbyParams) => {
  const { location, radius } = params;
  try {
    const response = await axios.post(API_URL, {
      includedTypes: ['restaurant'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: location,
          radius: radius
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types,places.websiteUri'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    throw error;
  }
};
