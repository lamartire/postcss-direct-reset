'use strict'

const postcss = require('postcss')
const Rule = require('postcss/lib/rule')
const fs = require('fs')
const path = require('path')

let resetCssMap = []
const resetCss = fs.readFileSync(
  path.resolve(__dirname, '../node_modules/reset-css/reset.css'),
  'utf-8'
)

function buildMap () {
  postcss.parse(resetCss).walkRules(function (rule) {
    let resetRule = {
      selectors: rule.selectors,
      decls: []
    }

    rule.walkDecls(function (decl) {
      resetRule.decls.push(decl)
    })

    resetCssMap.push(resetRule)
  })
}

module.exports = postcss.plugin('direct-reset', function (options = {}) {
  if (resetCssMap.length === 0) {
    buildMap()
  }

  return function (root, result) {
    root.walkRules(function (rule) {
      rule.walkAtRules(function (atRule) {
        const resetSelector = atRule.params.replace(/\('|'\)/g, '')
        const resetDecls = resetCssMap
          .filter(function (rule) {
            return rule.selectors.indexOf(resetSelector) !== -1
          })
          .map(function (rule) {
            return rule.decls
          })
          .reduce(function (a, b) {
            return a.concat(b)
          })

        atRule.replaceWith(resetDecls)
      })
    })
  }
})
