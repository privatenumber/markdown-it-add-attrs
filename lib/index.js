const { escapeHtml } = require('markdown-it/lib/common/utils');
const cheerio = require('cheerio');

function renderAttrs(token) {
	var i, l, result;

	if (!token.attrs) { return ''; }

	result = '';

	for (i = 0, l = token.attrs.length; i < l; i++) {
		let key = token.attrs[i][0];
		let value = token.attrs[i][1];
		result += ' ' + escapeHtml(key) + (value ? '="' + escapeHtml(value) + '"' : '');
	}

	return result;
}

function addAttrsPlugin(md, opts) {
	if (!opts) { return; }

	md.renderer.renderAttrs = renderAttrs;

	function onToken(token) {
		if (token.tag && token.type.endsWith('_open')) {
			if (opts.class) {
				if (!token.attrs) {
					token.attrs = [];
				}

				const hasClass = token.attrs.find(a => a[0] === 'class');
				if (hasClass) {
					hasClass[1] += ` ${opts.class}`;
				} else {
					token.attrs.push(['class', opts.class]);
				}
			}

			if (opts.attr) {
				if (!token.attrs) {
					token.attrs = [];
				}
				token.attrs.push(opts.attr);
			}
		}

		if (token.type === 'html_block') {
			const $ = cheerio.load(token.content, { xmlMode: true });
			const allEls = $('*');

			if (opts.class) {
				allEls.addClass(opts.class);
				token.content = $.html();
			}

			if (opts.attr) {
				allEls.attr(opts.attr[0], opts.attr[1] || true);
				token.content = $.html();
			}
		}

		if (token.children) {
			token.children.forEach(onToken);
		}
	}

	md.core.ruler.push('add-attrs', state => {
		state.tokens.forEach(onToken);
	});
}

module.exports = addAttrsPlugin;
