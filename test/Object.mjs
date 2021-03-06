import JSONTag from '../src/JSONTag.mjs'
import tap from 'tap'

tap.test('Create', t => {
	let d = {}
	t.equal(JSONTag.stringify(d), '{}')
	t.end()
})

tap.test('Properties', t => {
	let d = { foo: 'Bar' }
	t.equal(JSONTag.stringify(d), '{"foo":"Bar"}')
	t.end()
})

tap.test('Class', t => {
	let d = { name: "John"}
	JSONTag.setAttribute(d, 'class','Person')
	t.equal(JSONTag.stringify(d), '<object class="Person">{"name":"John"}')
	t.end()
})

tap.test('Class2', t => {
	let d = {}
	JSONTag.setAttribute(d, 'class','Person')
	JSONTag.addAttribute(d, 'class','User')
	d.name = 'John'
	t.equal(JSONTag.stringify(d), '<object class="Person User">{"name":"John"}')
	t.end()
})

tap.test('foo', t => {
	let d = new JSONTag.UUID('5d98b6e3-8feb-4163-be4d-c56446371e89')
	//TODO
	t.end()
})