class GlobalsClass {
  constructor() {
    // [lat, long]
    this.location = [53.943989, -1.882660]
    this.radiationAPIKey = 'D24MFNil09iOtUdxr3di3BzTN4Yo4p0Q'
  }

  getLocation() {
    return this.location
  }

  setLocation(location) {
    this.location = location
  }

  getRadAPIKey() {
    return this.radiationAPIKey
  }
}

export default Globals = new GlobalsClass()