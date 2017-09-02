# PostCSS Direct Reset [![Build Status](https://travis-ci.org/lamartire/postcss-direct-reset.svg?branch=master)](https://travis-ci.org/lamartire/postcss-direct-reset)
-----------------------
[PostCSS](https://github.com/postcss/postcss) plugin to easy and fast reset
elements with [reset.css](https://www.npmjs.com/package/reset-css).

If you don't wanna to global reset all css-elements, you can reset elements
directly.

### Usage

```css
.block {
  @reset(element-selector)
}
```

### Example

```css
.block {
  display: block;
  margin: 1em auto;
}

/* p element */
.block__element {
  @reset('p');
  color: '#f00';
}
```

Will be processed to:

```css
.block {
  display: block;
  margin: 1em auto;
}

.block__element {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  color: '#f00';
}
```

### Roadmap

[ ] - insert pseudo-elements if that needs
