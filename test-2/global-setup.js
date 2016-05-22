var Application = require('spectron').Application
var assert = require('assert')
//var chai = require('chai')
//var chaiAsPromised = require('chai-as-promised')
var path = require('path')

//global.before(function () {
//    chai.should()
//    chai.use(chaiAsPromised)
//})

exports.getElectronPath = function () {
    var electronPath = path.join(__dirname, '../', 'node_modules', '.bin', 'electron')
    return electronPath
}

exports.setupTimeout = function (test) {
    if (process.env.CI) {
        test.timeout(30000)
    } else {
        test.timeout(10000)
    }
}

exports.startApplication = function (options) {
    options.path = exports.getElectronPath()
    if (process.env.CI) options.startTimeout = 30000

    var app = new Application(options)
    return app.start().then(function () {
        //assert.equal(app.isRunning(), true)
        //chaiAsPromised.transferPromiseness = app.transferPromiseness
        return app
    })
}

exports.stopApplication = function (app) {
    if (!app || !app.isRunning()) return

    return app.stop().then(function () {
        //assert.equal(app.isRunning(), false)
    })
}