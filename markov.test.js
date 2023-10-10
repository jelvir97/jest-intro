const {MarkovMachine} = require('./markov')
const str = 'cat in the hat'
let mm


beforeAll(function(){
    mm = new MarkovMachine(str)
})

test('testing creation of Markov instance', function(){
    const mm = new MarkovMachine(str)

    expect(typeof mm).toBe('object')
    expect(mm.words.length).toEqual(4)
    expect(mm.words).toContain('cat')
})


test('chains test',function(){
    const chains = mm.makeChains()

    expect(typeof chains).toBe('object')
    expect(Object.keys(chains).length).toEqual(4)
    expect(chains['cat']).toContain('in')
})


test('testing makeText()', function(){
    const text = mm.makeText(numWords=10)

    expect(typeof text).toBe('string')
    expect(text.split(' ').length).toBeLessThanOrEqual(10)
    expect(text.split(' ').length).toBeGreaterThan(0)
})

test('test randProp()', function(){
    const chains = mm.makeChains()
    const prop = mm.randProp(chains)

    expect(typeof prop).toBe('string')
    expect(Object.keys(chains)).toContain(prop)
})
