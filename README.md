# markdown-it-add-attrs

> [markdown-it](https://github.com/markdown-it/markdown-it) plugin to add attributes to all rendered elements


## :raising_hand: Why?
So I can specifically target the markdown using a [markdown stylesheet](https://github.com/sindresorhus/github-markdown-css) without interfering with some of the other code in the markdown.


## Install
```
$ npm i markdown-it-add-attrs
```

## Usage
```js
import addAttrsPlugin from 'markdown-it-add-attrs';

md.use(addAttrsPlugin, {

	// This "class" attribute will be added to all markdown elements
	class: 'md-doc',
});

```

## License
MIT