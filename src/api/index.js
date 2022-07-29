import axios from 'axios'

const baseUrl = 'https://eonet.gsfc.nasa.gov/api/v2.1/events'

export const fetchEvents = async (id) => {
    const response = await axios.get(baseUrl);
    const {events} = response.data;
    return events;
}