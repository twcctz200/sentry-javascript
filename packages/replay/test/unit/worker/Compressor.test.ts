import pako from 'pako';

import { Compressor } from '../../../worker/src/Compressor';

describe('Unit | worker | Compressor', () => {
  it('compresses multiple events', () => {
    const compressor = new Compressor();

    const events = [
      {
        id: 1,
        foo: ['bar', 'baz'],
      },
      {
        id: 2,
        foo: [false],
      },
    ];

    events.forEach(event => compressor.addEvent(event));

    const compressed = compressor.finish();

    const restored = pako.inflate(compressed, { to: 'string' });

    expect(restored).toBe(JSON.stringify(events));
  });

  it('throws on invalid/undefined events', () => {
    const compressor = new Compressor();

    // @ts-ignore ignoring type for test
    expect(() => void compressor.addEvent(undefined)).toThrow();

    const compressed = compressor.finish();

    const restored = pako.inflate(compressed, { to: 'string' });

    expect(restored).toBe(JSON.stringify([]));
  });
});
