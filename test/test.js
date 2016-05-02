var should = require('chai').should()
var app = require('../index.js');

describe('app', function() {
  describe('triggers', function () {
    
    it('"bom dia" should be a trigger', function () {
      app.isTriggerMessage('bom dia').should.eq(true);
    });
    
    it('"tudo bem" should be a trigger', function () {
      app.isTriggerMessage('tudo bem').should.eq(true);
    });
    
    it('trigger should ignore case', function () {
        app.isTriggerMessage('TUDO BEM').should.eq(true);
    })
  });
});