'use strict';

const MultipleError = require('lib/browser/commands/assert-view/errors/multiple-error');

describe('MultipleError', () => {
    it('should be an instance of Error', () => {
        assert.instanceOf(new MultipleError(), Error);
    });

    it('should has name MultipleError', () => {
        const err = new MultipleError();
        assert.strictEqual(err.name, 'MultipleError');
    });

    it('should has empty fields if has no errors in constructor', () => {
        const multipleErr = new MultipleError();
        assert.strictEqual(multipleErr.message, '');
        assert.strictEqual(multipleErr.stack, '');
        assert.deepEqual(multipleErr.errors, []);
    });

    it('should throw original message and stack if has single error in constructor', () => {
        const errors = [{
            message: 'messageStub',
            stack: 'stackStub'
        }];
        const multipleErr = new MultipleError(errors);
        assert.strictEqual(multipleErr.message, 'messageStub');
        assert.strictEqual(multipleErr.stack, 'stackStub');
        assert.deepEqual(multipleErr.errors, errors);
    });

    it('should concatenate messages and stacks if has two errors in constructor', () => {
        const errors = [{
            message: 'messageStub1',
            stack: 'stackStub1'
        }, {
            message: 'messageStub2',
            stack: 'stackStub2'
        }];
        const multipleErr = new MultipleError(errors);
        assert.strictEqual(multipleErr.message, 'messageStub1; messageStub2');
        assert.strictEqual(multipleErr.stack, 'messageStub1; messageStub2\nstackStub1\nstackStub2');
        assert.deepEqual(multipleErr.errors, errors);
    });

    it('should creates objects composed of the picked errors properties', () => {
        const error = new Error();
        error.name = 'some name';
        error.message = 'some message';
        error.stack = 'some stack';
        error.stateName = 'some stateName';
        error.screenshot = 'some screenshot';
        error.foobar = 'should be removed';

        const multipleErr = new MultipleError([error]);
        assert.deepEqual(multipleErr.errors, [{
            name: 'some name',
            message: 'some message',
            stack: 'some stack',
            stateName: 'some stateName',
            screenshot: 'some screenshot'
        }]);
    });
});
