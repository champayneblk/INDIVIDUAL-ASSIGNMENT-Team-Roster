import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const AddMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members.json`, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
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
