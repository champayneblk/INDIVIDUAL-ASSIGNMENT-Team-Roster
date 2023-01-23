import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/members/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const AddMember = (memberObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/members.json`, memberObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/members/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateMember = (memberObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/members/${memberObj.firebaseKey}.json`, memberObj)
    .then(resolve)
    .catch(reject);
});

const teamCaptain = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const onSale = Object.values(data).filter((item) => item.sale);
      resolve(onSale);
    })
    .catch(reject);
});

export {
  getMembers,
  AddMember,
  deleteMember,
  getSingleMember,
  updateMember,
  teamCaptain,
};
