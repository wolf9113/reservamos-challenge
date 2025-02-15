import { Weather } from '@/models/Weather';
import weatherApiClient from '@/api/clients/weatherApiClient';

const API_KEY = '5758bb245013b66b8a349c50c4b099bf';

/**
 * Get weather by coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<Weather>}
 */
const getWeatherByCoordinates = async (latitude: number, longitude: number): Promise<Weather> => {
  try {
    const response = await weatherApiClient.get('/onecall', {
      params: {
        lat: latitude,
        lon: longitude,
        exclude: 'minutely,alerts', // hourly,current,daily,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

const weatherApi = {
  getWeatherByCoordinates: getWeatherByCoordinates,
};

export default weatherApi;
