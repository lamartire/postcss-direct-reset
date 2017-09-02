const postcss = require('postcss')
const directResetPlugin = require('./../src')
const fs = require('fs')
const path = require('path')

const cssFixturesPath = path.resolve(__dirname, './fixtures/css')

function run (input, opts) {
  return postcss([directResetPlugin()])
    .process(input)
    .then(res => {
      return res.css.replace(/\t/gm, '  ')
    })
}

describe('Reset of "p" element', () => {
  const pCss = fs.readFileSync(
    path.join(cssFixturesPath, './p/p.css'),
    'utf-8'
  )
  const pResetedCss = fs.readFileSync(
    path.join(cssFixturesPath, './p/p.reseted.css'),
    'utf-8'
  )

  it('@reset rule was replaced by rules from reset.css', () => {
    return expect(run(pCss)).resolves.toEqual(pResetedCss)
  })
})

describe('Reset of "blockquote" element', () => {
  const blockquoteCss = fs.readFileSync(
    path.join(cssFixturesPath, './blockquote/blockquote.css'),
    'utf-8'
  )
  const blockquoteResetedCss = fs.readFileSync(
    path.join(cssFixturesPath, './blockquote/blockquote.reseted.css'),
    'utf-8'
  )

  it('@reset rule was replaced by rules from reset.css', () => {
    return expect(run(blockquoteCss)).resolves.toEqual(blockquoteResetedCss)
  })
})
