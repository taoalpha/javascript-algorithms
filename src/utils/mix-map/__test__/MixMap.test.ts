import MixMap from '../MixMap';

describe('MixMap', () => {
  it('should be able to store and retrieve, check, delete primitive keys', () => {
    const map = new MixMap();

    map.set("a", "aaa");
    map.set(2, "a");
    map.set("2", "b");
    map.set("true", "t");
    map.set(true, "true");
    map.set("false", "f");
    map.set(false, "false");
    let sym = Symbol(2);
    map.set(sym, "aha");

    expect(map.keys()).toEqual(["a", 2, "2", "true", true, "false", false, sym]);

    expect(map.get('a')).toBe("aaa");
    expect(map.get('2')).toBe("b");
    expect(map.get(2)).toBe("a");
    expect(map.get('true')).toBe("t");
    expect(map.get(true)).toBe("true");
    expect(map.get('false')).toBe("f");
    expect(map.get(false)).toBe("false");
    expect(map.get(sym)).toBe("aha");
    expect(map.get(Symbol(2))).toBe(undefined);

    expect(map.has('a')).toBe(true);
    expect(map.has('2')).toBe(true);
    expect(map.has(2)).toBe(true);
    expect(map.has('true')).toBe(true);
    expect(map.has(true)).toBe(true);
    expect(map.has('false')).toBe(true);
    expect(map.has(false)).toBe(true);
    expect(map.has(sym)).toBe(true);
    expect(map.has(Symbol(2))).toBe(false);
  
    map.delete("a");
    map.delete(2);
    map.delete("2");
    map.delete("true");
    map.delete(true);
    map.delete("false");
    map.delete(false);
    map.delete(sym);

    expect(map.get('a')).toBe(undefined);
    expect(map.get('2')).toBe(undefined);
    expect(map.get(2)).toBe(undefined);
    expect(map.get('true')).toBe(undefined);
    expect(map.get(true)).toBe(undefined);
    expect(map.get('false')).toBe(undefined);
    expect(map.get(false)).toBe(undefined);
    expect(map.get(sym)).toBe(undefined);
    expect(map.get(Symbol(2))).toBe(undefined);

    expect(map.has('a')).toBe(false);
    expect(map.has('2')).toBe(false);
    expect(map.has(2)).toBe(false);
    expect(map.has('true')).toBe(false);
    expect(map.has(true)).toBe(false);
    expect(map.has('false')).toBe(false);
    expect(map.has(false)).toBe(false);
    expect(map.has(sym)).toBe(false);
    expect(map.has(Symbol(2))).toBe(false);
  });

  it('should be able to store and retrieve, check, delete object keys', () => {
    const map = new MixMap();

    let a = {a: 1}
    map.set(a, "aaa");

    expect(map.get(a)).toBe("aaa");
    expect(map.has(a)).toBe(true);
    expect(map.get({})).toBe(undefined);

    map.delete(a);
    expect(map.has(a)).toBe(false);
    expect(map.get(a)).toBe(undefined);
    expect(map.get({})).toBe(undefined);
  });
});
