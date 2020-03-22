const MarkdownIt = require('markdown-it');
const addAttrs = require('..');

test('Markdown It', () => {
	const md = MarkdownIt();
	const result = md.render('## Hello');
	expect(result).toBe('<h2>Hello</h2>\n');
});

test('no opts', () => {
	const md = MarkdownIt().use(addAttrs);
	const result = md.render('## Hello');
	expect(result).toBe('<h2>Hello</h2>\n');
});

test('add attr', () => {
	const md = MarkdownIt().use(addAttrs, {
		attr: ['hello', 'world']
	});
	const result = md.render('## Hello');
	expect(result).toBe('<h2 hello="world">Hello</h2>\n');
});

test('add boolean attr', () => {
	const md = MarkdownIt().use(addAttrs, {
		attr: ['hello']
	});
	const result = md.render('## Hello');
	expect(result).toBe('<h2 hello>Hello</h2>\n');
});

test('add class', () => {
	const md = MarkdownIt().use(addAttrs, {
		class: 'hello-world',
	});
	const result = md.render('## Hello');
	expect(result).toBe('<h2 class="hello-world">Hello</h2>\n');
});

test('html with class', () => {
	const md = MarkdownIt({ html: true }).use(addAttrs, {
		class: 'hello-world',
	});
	const result = md.render('<div>Hello</div>\n<div class="b">World</div>');
	expect(result).toBe('<div class="hello-world">Hello</div>\n<div class="b hello-world">World</div>');
});

test('html with attr', () => {
	const md = MarkdownIt({ html: true }).use(addAttrs, {
		attr: ['hello'],
	});
	const result = md.render('# Hello World\n<div>Hello</div>\n<div>World</div>');
	expect(result).toBe('<h1 hello>Hello World</h1>\n<div hello="true">Hello</div>\n<div hello="true">World</div>');
});