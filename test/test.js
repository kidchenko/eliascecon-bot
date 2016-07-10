import chai from 'chai';
import EliasBot from '../src/eliasBot.js';
chai.should();

describe('eliasBot', () => {
    var bot = new EliasBot({
        token: process.env.ELIASTOKEN,
    });
    it('sanitize should transform to lower case', () => {
        bot.sanitize('FOO').should.be.equal('foo');
    });
    it('sanitize should remove dots', () => {
        bot.sanitize('FOO!?.').should.be.equal('foo');
    });
});