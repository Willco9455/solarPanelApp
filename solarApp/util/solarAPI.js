import { decode as atob, encode as btoa } from 'base-64'
import Globals from './Globals';


// let globToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjoxLCJ1c2VyIjoiY3liZXJzZWN1cml0eTY5X3ByZW1lbF9zdHZlbiIsImlzcyI6ImxvZ2luLm1ldGVvbWF0aWNzLmNvbSIsImV4cCI6MTcwODYzNzMxMCwic3ViIjoiYWNjZXNzIn0.ICdavamu_jA7m6DWs7_rERUJhPP4kQtA1Z0e1JKsxtd2aSsig8Lblbdmk4yHK5tOmjqx9lyZtwvxXuPr6KaBFg'
let globToken = null

// converts degrees angle to radians
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function toDegrees (radians) {
  return radians * 180.0 / Math. PI
} 

// takes azimuth and elevation angles and converts to real world(ar) coordinates
export function to3d(az, el) {
  let x = null
  let y = null
  let z = null
  let scale = 100000
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
  z = Math.tan(toRadians(el)) * scale
  return [x,y,z]
}


export async function getToken() {
  // If the app already has a token then return 
  if (globToken != null) {
    console.log('sent set token')
    return globToken
  }
  console.log('fetched new')
  let headers = new Headers()
  username = "cybersecurity69_premel_stven"
  password = "JrS2pFlR53"
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  
  await fetch('https://login.meteomatics.com/api/v1/token', {
    method: 'GET', headers: headers
  }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    globToken = data.access_token;
  }).catch(function (err) {
    console.log('something went wrong', err);
  });
  return globToken
}

// takes in start time and end time and longitude and latitude as array [lat, long] returns json response 
// response is an array [{"date": "<>", "value": "<>"}]
export async function getAsimov(time, loc) {
  
  req = 'https://api.meteomatics.com/' +
  time.toISOString() +
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
    asiData = data.data[0].coordinates[0].dates[0].value
    console.log('Asimov data Successfully fetched')
  }).catch(function (err) {
    console.log('something went wrong', err);
  });
  
  return (asiData)
}



export async function getElevation(time, loc) {

  req = 'https://api.meteomatics.com/' +
    time.toISOString() + 
    '/sun_elevation:d/' +
    loc[0] + ',' +
    loc[1] +
    '/json' + '?' +
    'access_token=' + globToken

  let elivationData = 'Test'

  await fetch(req, {
    method: 'GET'
  }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    elivationData = data.data[0].coordinates[0].dates[0].value
    console.log('Elevation data Successfully fetched')
  }).catch(function (err) {
    console.log('something went wrong', err);
  });

  return (elivationData)
}

async function getSunriseSunset(date, loc) {
  await getToken()
  req = 'https://api.meteomatics.com/' +
  date.toISOString() + 
  '/sunrise:sql,sunset:sql/' +
  loc[0] + ',' +
  loc[1] +
  '/json' + '?' +
  'access_token=' + globToken
  console.log('request ',req)
  returned = null
  
  await fetch(req, {
    method: 'GET'
  }).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    returned = data.data 
  }).catch(function (err) {
    console.log('something went wrong', err);
    console.log('PROBABLY RAN OUT OF FREE REQUESTS MAKE NEW ACCOUNT')
  });
  
  sunrise = new Date(returned[0].coordinates[0].dates[0].value)
  sunset = new Date(returned[1].coordinates[0].dates[0].value)
  return [sunrise, sunset]

}


export async function getArcFromDate(date, loc) {
  date.setHours(12, 0)
  // gets the time of the sunset and sunrise for today
  let [sunrise, sunset] = await getSunriseSunset(date, loc)

  
  // gets the elevation of the sun at midday tells how much to tilt the arc by
  middayAngle = await getElevation(date, loc)

  // 
  sunriseCoords = to3d(await getAsimov(sunrise, loc), 0)
  sunsetCoords = to3d(await getAsimov(sunset, loc), 0)
  

  xMid = (sunriseCoords[0] + sunsetCoords[0]) / 2
  yMid = (sunriseCoords[1] + sunsetCoords[1]) / 2

  obj = {
    x: xMid,
    y: yMid,
    angle: middayAngle
  }
  return obj

}



// DONT NEED ANYMORE 
export function getArcPlacement3D(sunrise, sunset) {
  x1 = sunrise[0]
  y1 = sunrise[1]
  x2 = sunset[0]
  y2 = sunset[1]

  
  m =  (y1 - y2) / (x1 - x2)
  c = y1 - (m * x1)

  x = (-y1 + (m * x1))/((1/m) + m)
  y = -(1/m) * x
  
  const lineFunc = (x) => {
    return (m*x + c)
  }

  // gets the mid point between sunrise and sunset position 
  xMid = (x1 + x2) / 2
  yMid = (y1 + y2) / 2
  console.log('Mids', xMid, yMid)
  theta = 0

  // IMPORTANT - roations for ar are counter clockwise
  // if else for different rotation angle calculations based on the gradient of arc line
  if (m = -Infinity) {
    // occurs if arc is has gradient of negative infinity 
    console.log('decided here')
    theta = 90
  } else if (m < 0) {
    // if gradient is negative
    // computes the angle to rotate the arc by, clockwise
    yLen = lineFunc(xMid -1) - yMid
    theta = 180 - toDegrees(Math.atan(yLen))
  } else if (m > 0 ) {
    // computes the angle to rotate the arc by, clockwise
    yLen = lineFunc(xMid + 1) - yMid
    // rotation angle is the obtuse angle 
    theta = toDegrees(Math.atan(yLen))
  } else if (m = 0) {
    // if gradient is 0 then no rotation is needed
    theta = 0
  } 

  return [xMid, yMid], theta
}