export interface Place {
  id: number;
  slug: string;
  citySlug: string;
  display: string;
  asciiDisplay: string;
  cityName: string;
  cityAsciiName: string;
  state: string;
  country: string;
  lat: number;
  long: number;
  resultType: string;
  popularity: number;
  sortCriteria: number;
}

/**
 * Converts an API response object into a `Place` model
 * @param {any} data - API response data
 * @returns {Place}
 */
export const mapToPlace = (data: any): Place => ({
  id: data.id,
  slug: data.slug,
  citySlug: data.city_slug,
  display: data.display,
  asciiDisplay: data.ascii_display,
  cityName: data.city_name,
  cityAsciiName: data.city_ascii_name,
  state: data.state,
  country: data.country,
  lat: parseFloat(data.lat),
  long: parseFloat(data.long),
  resultType: data.result_type,
  popularity: parseFloat(data.popularity),
  sortCriteria: data.sort_criteria,
});

export const dummyPlace: Place = {
  id: 697,
  slug: 'mexicali',
  citySlug: 'mexicali',
  display: 'Mexicali',
  asciiDisplay: 'mexicali',
  cityName: 'Mexicali',
  cityAsciiName: 'mexicali',
  state: 'Baja California',
  country: 'México',
  lat: 32.6245389,
  long: -115.4522623,
  resultType: 'city',
  popularity: 0.0568217690510765,
  sortCriteria: 0.6227287076204305,
};
