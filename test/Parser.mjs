import TSON from '../src/TSON.mjs'
import tap from 'tap'

tap.test('ParseJson', t => {
	let json = `
	{
		"name":"John",
		"foo":{
			"bar":true
		}, 
		"baz": null, 
		"florb": 1.234
	}`
	let result = TSON.parse(json)
	t.same(result, JSON.parse(json))
	t.equal(TSON.getType(result), 'object')
	t.end()
})

tap.test('ParseTson', t => {
	let tson = `
	<object class="Person">{
		"name": "John",
		"list": <array>[ 1, 2, 3 ]
	}
	`
	let result = TSON.parse(tson)
	let tson2 = TSON.stringify(result)
	t.equal(TSON.getType(result.list), 'array')
	t.equal(result.name, "John")
	t.equal(TSON.getType(result), 'object')
	t.equal(TSON.getTypeString(result), '<Person>')
	t.end()
})

tap.test('Link', t => {
	let tson = `{
		"foo":<object id="tson1">{
			"bar":"Baz"
		},
		"bar":<link>"#tson1"
	}`
	let result = TSON.parse(tson)
	t.equal(result.foo, result.bar)
	t.end()
})

tap.test('Link2', t => {
	let tson = `<object id="source">{
		"foo":<object id="tson1">{
			"bar":"Baz"
		},
		"bar":<link>"#source"
	}`
	let result = TSON.parse(tson)
	t.equal(result, result.bar)
	t.end()
})


