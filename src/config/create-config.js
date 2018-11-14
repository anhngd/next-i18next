import defaultConfig from 'config/default-config'
import isNode from 'detect-node'

export default (userConfig) => {

  let combinedConfig = {
    ...defaultConfig,
    ...userConfig,
  }

  if (isNode) {
    const fs = require('fs')
    const path = require('path')

    const getAllNamespaces = p => fs.readdirSync(p).map(file => file.replace('.json', ''))
    const {
      allLanguages, defaultLanguage, localePath, localeStructure,
    } = combinedConfig

    combinedConfig = {
      ...combinedConfig,
      preload: allLanguages,
      ns: getAllNamespaces(path.join(process.cwd(), `${localePath}/${defaultLanguage}`)),
      backend: {
        loadPath: path.join(process.cwd(), `${localePath}/${localeStructure}.json`),
        addPath: path.join(process.cwd(), `${localePath}/${localeStructure}.missing.json`),
      },
    }
  }

  return combinedConfig

}