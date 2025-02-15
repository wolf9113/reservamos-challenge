import apiClient from './clients/apiClient';
import { mapToPlace, Place } from '@/models/Place';

/**
 * Gets a list of places based on a search
 * @param {string} query - Search term (In: "Monterrey", "mty")
 * @returns {Promise<Place[]>}
 */
const getPlaces = async (query: string): Promise<Place[]> => {
  try {
    const response = await apiClient.get('/places', {
      params: {
        q: query,
      },
    });

    return response.data.map(mapToPlace);
  } catch (error: unknown) {
    throw error;
  }
};

const placeApi = {
  getPlaces: getPlaces,
};

export default placeApi;
