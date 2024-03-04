import { TemporaryDirectoryPath } from 'react-native-fs'

// all averages are represented as a day of size 24 where at position 0 is the measurement 
export class PredictionManager {
  constructor(azi = 290, tilt = 35, lon = -1.8942216, lat = 53.9436528, panelNum=11, efficency=0.2) {
    // responses from api saved to avoid recalling api
    this.data = []
    this.data = [
      require('../assets/apiResponse/jan23.json'),
      require('../assets/apiResponse/feb23.json'),
      require('../assets/apiResponse/mar23.json'),
      require('../assets/apiResponse/apr23.json'),
      require('../assets/apiResponse/may23.json'),
      require('../assets/apiResponse/jun23.json'),
      require('../assets/apiResponse/jul23.json'),
      require('../assets/apiResponse/aug23.json'),
      require('../assets/apiResponse/sep23.json'),
      require('../assets/apiResponse/oct23.json'),
      require('../assets/apiResponse/nov23.json'),
      require('../assets/apiResponse/dec23.json')
    ]
    this.azi = azi
    this.tilt = tilt
    this.lon = lon
    this.lat = lat
    this.panelArea = 1.95
    this.panelNum = panelNum
    this.efficency = efficency
    this.shadeFactor = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }

  // converts degrees angle to radians
  toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  toDegrees(radians) {
    return radians * 180.0 / Math.PI
  }

  setPanelNum(num) {
    this.panelNum = num
  }

  setEfficency(percent) {
    this.efficency = percent / 100
  }

  setAzi(degree) { 
    this.azi = degree
  }

  setTilt(degree) { 
    this.tilt = degree
  }

  // get the data from the api for a given month(1-12) in a given year 
  async getMonthData(year, month) {
    month = month - 1
    let startDate = new Date()
    let endDate = new Date()
    // startDate.setMilliseconds(0)
    startDate.setUTCFullYear(year, month, 1)
    startDate.setUTCHours(0, 0, 0, 0)
    // endDate.setMilliseconds(0)
    endDate.setUTCFullYear(year, month + 1, 1)
    endDate.setUTCHours(0, 0, 0, 0)
    key = 'D24MFNil09iOtUdxr3di3BzTN4Yo4p0Q'
    // SORT THE CORRECT AZI OUT
    apiAzi = -(360 - this.azi)
    req = `https://api.solcast.com.au/data/historic/radiation_and_weather?period=PT60M&output_parameters=gti,dhi,dni,azimuth&latitude=${this.lat}&longitude=${this.lon}&azimuth=${apiAzi}&tilt=${this.tilt}&start=${startDate.toISOString()}&end=${endDate.toISOString()}&format=json&time_zone=utc&api_key=${key}`
    
    let resData = null
    await fetch(req, {
      method: 'GET'
    }).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      resData = data
    }).catch(function (err) {
      console.log('something went wrong', err);
      console.log('Failed to load for ', month, ' ', year);
    });
    return resData
  }

  // can only get data per month from the API
  getMonthAvg(monthData) {
    let response = monthData
    response = response.estimated_actuals
    let days = response.length / 24
    let avgSum = new Array(24).fill(0)
    for (let i = 0; i < response.length; i++) {
      obj = response[i]
      let date = new Date(obj.period_end)
      let hour = date.getHours()
      let gti = this.objToGti(obj)
      avgSum[hour - 1] += gti
    }
    let avg = avgSum.map((item) => { return item / days })
    return avg
  }

  objToGti(obj) {
    const dayOfYear = date =>
      Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86_400_000);

    let date = new Date(obj.period_end)
    let day = dayOfYear(date)
    
    // the sIncident is the beam irradiance/irradience recived directly from the sun beam perpendicuar to the sun
    let sIncident = obj.dni
    // phi is the latitude
    let phi = this.lat
    // delta is the declanation angle 
    let delta = 23.45 * Math.sin(this.toRadians(((360 / 365) * (284 + day))))
    // the elevation angle
    let alpha = 90 - phi + delta
    // console.log(alpha)

    // api measures azimuth differently where -90 is west converts to 290 for west for example
    let sunAzi = obj.azimuth
    if (sunAzi < 0) {
      sunAzi = 360 + sunAzi
    }
  

    let sModule = sIncident * ((Math.cos(this.toRadians(alpha))) *  Math.sin(this.toRadians(this.tilt)) * (Math.cos(this.toRadians(this.azi - sunAzi))) + (Math.sin(this.toRadians(alpha)) *  Math.cos(this.toRadians(this.tilt))) )

    // if sModule is negative then just set it to 0 
    if (sModule < 0) {
      sModule = 0
    }

    let dhi = obj.dhi 
    let diffuse = dhi * ((180 - this.tilt)/180)

    // global tilt irradience (irradience taking into account the tilt of and orientation of the module) 
    let gti = sModule + diffuse

    return gti
  }

  async loadData() {
    const promise = await new Promise(async (resolve, reject) => {
      for (let i=0; i< 12; i++) {
        // TO FETCH DATA FROM API DO THIS
        // tempData = await this.getMonthData(2023, i+1)
        // this.data.push(tempData)
        console.log('got month')
      }
      console.log('load finished')
      resolve(1)
    });
    return promise
  } 

  // given some data of GTI per hour of the data returns an array of power for each hour [0 - 23]
  getLeftPredict(monthData) {
    let data = this.getMonthAvg(monthData)
    let gtiArr = new Array()
    // add 0 to the start since the left side prediction for hour 0-1 cannot be done with the data so assumed it is 0
    gtiArr.push(0)
    for (let i = 0; i < data.length - 1; i++) {
      gti = data[i]
      gtiArr.push(gti)
    }
    return gtiArr
  }

  getRightPredict(monthData) {
    let data = this.getMonthAvg(monthData)
    let gtiArr = new Array()
    for (let i = 1; i < data.length; i++) {
      gti = data[i]
      gtiArr.push(gti)
    }
    // add 0 to end since right prediction for 23-24 will not be in the data
    gtiArr.push(0)
    return gtiArr
  }

  // gets the predicted hourly solar energy recived by pannel for one day in wh/m^2
  getPredictHourly(monthData) {
    let leftEstimate = this.getLeftPredict(monthData)
    let rightEstiamte = this.getRightPredict(monthData)
    let combinedEst = new Array()
    for (let i = 0; i < leftEstimate.length; i++) {
      combination = (leftEstimate[i] + rightEstiamte[i]) / 2
      combinedEst.push(combination)
    }
    return combinedEst
  }

  hourlyToOverall(hourlyArry, withShade = false) {
    let sum = 0
    for (let i = 0; i < hourlyArry.length; i++) {
      if (withShade) {
        sum = sum + (hourlyArry[i] * this.shadeFactor[i])
      } else {
        sum = sum + hourlyArry[i]
      }
    }
    let result = sum * this.panelNum * this.panelArea
    return result
  }

  predictMonthPower(month) {
    let monthData = this.data[month - 1]
    // get the number of days in the month 
    let days = monthData.estimated_actuals.length / 24
    // getss the average w/m^2 for each hour of the month
    let avgIrrHour = this.getPredictHourly(monthData)
    // converst the average power per hour 
    let dailyPower = this.hourlyToOverall(avgIrrHour, withShade = true) * this.efficency
    return (dailyPower * days) / 1000
  }

  predictYearPower() {
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum = sum + this.predictMonthPower(i + 1)
    }
    return sum
  }

  // takes in a hourly array and multiplies it with the shade factor from the sky model for each hour
  addShadeFactor(hourlyArry) {
    let temp = new Array()
    for (let i = 0; i < hourlyArry.length; i++) {
      temp.push(hourlyArry[i] * this.shadeFactor[i])
    }
    return temp
  }

  async runTesting() {
    let dataTest = this.data[6]
  }

}

