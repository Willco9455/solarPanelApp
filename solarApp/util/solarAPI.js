import { decode as atob, encode as btoa } from 'base-64'

let globToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjoxLCJ1c2VyIjoibm9uZV9qb25zb25fc3RldmUiLCJpc3MiOiJsb2dpbi5tZXRlb21hdGljcy5jb20iLCJleHAiOjE3MDc4NDY1NDIsInN1YiI6ImFjY2VzcyJ9.IamyeUU_hW1fJBppcD2GiefKoEilq-_sQm5DWuAQcQwxfPZsJsYKNKvUgejquMXfh5sZ5pUIuIHpKaTYrdnmOw'

// converts degrees angle to radians
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// takes azimuth and elevation angles and converts to real world(ar) coordinates
export function to3d(az, el) {
  let x = null
  let y = null
  let z = null
  let scale = 1000
  if ((az >= 0) && (az <= 90)) {
    x = Math.cos(toRadians(az)) * scale
    y = Math.sin(toRadians(az)) * scale
  } else if ((az > 90) && (az <= 180)) {
    x = -Math.cos(toRadians(180 - az)) * scale
    y = Math.sin(toRadians(180 - az)) * scale
  } else if ((az > 180) && (az <= 270)) {
    x = -Math.cos(toRadians(az - 180)) * scale
    y = -Math.sin(toRadians(az - 180)) * scale
  } else {
    x = Math.cos(toRadians(360 - az)) * scale
    y = -Math.sin(toRadians(360 - az)) * scale
  }
  z = Math.tan(toRadians(el)) * 1000
  return [x,y,z]
}


export async function getToken() {
  // If the app already has a token then return 
  if (globToken != null) {
    return globToken
  }

  let headers = new Headers()
  username = "none_jonson_steve"
  password = "OiBk8F7kY3"
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

  await fetch('https://login.meteomatics.com/api/v1/token', {
    method: 'GET', headers: headers
  }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    globToken = data.access_token;
    console.log('token ', data.access_token)
  }).catch(function (err) {
    console.log('something went wrong', err);
  });
  return globToken
}

// takes in start time and end time and longitude and latitude as array [lat, long] returns json response 
// response is an array [{"date": "<>", "value": "<>"}]
export async function getAsimov(startTime, endTime, loc) {
  // for testing to avoid requests
  return [
    { "date": "2024-02-13T00:00:39Z", "value": 351 },
    { "date": "2024-02-13T03:00:39Z", "value": 52.8 },
    { "date": "2024-02-13T06:00:39Z", "value": 93.7 },
    { "date": "2024-02-13T09:00:39Z", "value": 130.2 },
    { "date": "2024-02-13T12:00:39Z", "value": 174.2 },
    { "date": "2024-02-13T15:00:39Z", "value": 219.9 },
    { "date": "2024-02-13T18:00:39Z", "value": 257.7 },
    { "date": "2024-02-13T21:00:39Z", "value": 295.8 }
  ]

  startTime = new Date()
  endTime = new Date()
  startTime.setHours(0, 0)
  endTime.setHours(23, 59)

  loc = [53.480759, -2.242631]

  req = 'https://api.meteomatics.com/' +
    startTime.toISOString() + '--' +
    endTime.toISOString() +
    '/sun_azimuth:d/' +
    loc[0] + ',' +
    loc[1] +
    '/json' + '?' +
    'access_token=' + globToken

  let asiData = 'Test'

  await fetch(req, {
    method: 'GET'
  }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    asiData = data.data[0].coordinates[0].dates
    console.log('Asimov data Successfully fetched')
  }).catch(function (err) {
    console.log('something went wrong', err);
  });

  return (asiData)
}

export async function getElevation(startTime, endTime, loc) {

  return [
  { "date": "2024-02-13T00:00:37Z", "value": -49.8 }, 
  { "date": "2024-02-13T03:00:37Z", "value": -39.6 }, 
  { "date": "2024-02-13T06:00:37Z", "value": -14.3 }, 
  { "date": "2024-02-13T09:00:37Z", "value": 10.3 }, 
  { "date": "2024-02-13T12:00:37Z", "value": 22.8 }, 
  { "date": "2024-02-13T15:00:37Z", "value": 14.9 }, 
  { "date": "2024-02-13T18:00:37Z", "value": -7.8 }, 
  { "date": "2024-02-13T21:00:37Z", "value": -34.1 }
]
  startTime = new Date()
  endTime = new Date()
  startTime.setHours(0, 0)
  endTime.setHours(23, 59)

  loc = [53.480759, -2.242631]

  req = 'https://api.meteomatics.com/' +
    startTime.toISOString() + '--' +
    endTime.toISOString() +
    '/sun_elevation:d/' +
    loc[0] + ',' +
    loc[1] +
    '/json' + '?' +
    'access_token=' + globToken

  let asiData = 'Test'

  await fetch(req, {
    method: 'GET'
  }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    asiData = data.data[0].coordinates[0].dates
    console.log('Elevation data Successfully fetched')
  }).catch(function (err) {
    console.log('something went wrong', err);
  });

  return (asiData)
}