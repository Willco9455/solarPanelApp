class GlobalsClass {
  constructor() {
    this.location = [null, null]
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