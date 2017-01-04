'use strict';

let assert = require('assert');
let moment = require('moment');
let TimeRepository = require('../src/repository/time');

describe('getWeekInfo()', function () {
    it('is correct on first day of academic year', function () {
        let now = moment("2016-09-01")
        let week = TimeRepository.getWeekInfo(now);

        assert.equal(week.index, 1);
        assert.equal(week.type, 'upper');
    });
});

describe('getWeekInfo()', function () {
    it('is correct on last day of first week', function () {
        let now = moment("2016-09-07")
        let week = TimeRepository.getWeekInfo(now);

        assert.equal(week.index, 1);
        assert.equal(week.type, 'upper');
    });
});

describe('getWeekInfo()', function () {
    it('is correct on first day of second week', function () {
        let now = moment("2016-09-08")
        let week = TimeRepository.getWeekInfo(now);

        assert.equal(week.index, 2);
        assert.equal(week.type, 'lower');
    });
});

describe('getWeekInfo()', function () {
    it('is correct on second day of second week', function () {
        let now = moment("2016-09-09")
        let week = TimeRepository.getWeekInfo(now);

        assert.equal(week.index, 2);
        assert.equal(week.type, 'lower');
    });
});

describe('getWeekInfo()', function () {
    it('is correct on a week after the New Year', function () {
        let now = moment("2017-01-03")
        let week = TimeRepository.getWeekInfo(now);

        assert.equal(week.index, 18);
        assert.equal(week.type, 'lower');
    });
});