import { expect } from 'chai';
import classNames from '../../src/lib/classNames';

describe('classNames', function() {
    it('should concat class names', function() {
        const result = classNames('foo', 'bar');
        expect(result).to.equal('foo bar');
    });

    it('should allow arrays', function() {
        const result = classNames('foo', ['bar', 'baz']);
        expect(result).to.equal('foo bar baz');
    });

    it('should allow objects', function() {
        const result = classNames('foo', { bar: false, baz: true });
        expect(result).to.equal('foo baz');
    });

    it('should work for empty input', function() {
        const result = classNames();
        expect(result).to.equal('');
    });
});
