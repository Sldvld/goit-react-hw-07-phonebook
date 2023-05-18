import axios from 'axios';

axios.defaults.baseURL = 'https://64660601228bd07b35596438.mockapi.io';

export async function fetchContacts() {
  const response = await axios.get('/contacts');
  console.log(response.data);
  return response.data;
}
