// all averages are represented as a day of size 24 where at position 0 is the measurement 
export class PredictionManager {
  constructor(data=null, azi=110, tilt=35, lon=-1.8942216, lat=53.9436528) {
    // responses from api saved to avoid recalling api
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
    this.panelNum = 11
    this.shadeFactor = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  }

  // can only get data per month from the API
  getMonthAvg(monthData) {
    let response = monthData
    response = response.estimated_actuals
    let days = response.length / 24
    let avgSum = new Array(24).fill(0)
    for (let i=0; i < response.length; i++) {
      obj = response[i]
      let date = new Date(obj.period_end)
      let hour = date.getHours()
      avgSum[hour - 1] += obj.gti
    }

    let avg = avgSum.map((item) => {return item/days})
    return avg
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
    for (let i=0; i < leftEstimate.length; i++) {
      combination = (leftEstimate[i] + rightEstiamte[i])/2
      combinedEst.push(combination)
    }
    return combinedEst
  }

  hourlyToOverall(hourlyArry, withShade=false) {
    let sum = 0 
    for (let i=0; i<hourlyArry.length; i++) {
      if (withShade) {
        sum = sum + (hourlyArry[i] * this.shadeFactor[i])
      } else {
        sum = sum + hourlyArry[i]
      }
    }
    let result = sum * this.panelNum * this.panelArea
    return result
  }

  predictMonthPower(month, efficency=0.2) {
    let monthData = this.data[month - 1]
    // get the number of days in the month 
    let days = monthData.estimated_actuals.length / 24
    let avgIrrHour = this.getPredictHourly(monthData)
    let dailyPower = this.hourlyToOverall(avgIrrHour, withShade=true) * efficency

    console.log((dailyPower * days)/ 1000)
  }


  // takes in a hourly array and multiplies it with the shade factor from the sky model for each hour
  addShadeFactor(hourlyArry) {
    let temp = new Array()
    for (let i=0; i < hourlyArry.length; i++) {
      temp.push(hourlyArry[i] * this.shadeFactor[i])
    }
    return temp
  }

  runTesting() {
    // let result = this.hourlyToOverall(this.getDayPredictHourly())
    // console.log(result/1000, 'kwh')
    // console.log(this.getMonthAvg())
    let result = this.predictMonthPower(12)
  }

}

