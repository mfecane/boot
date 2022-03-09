import { getDefaultConfig } from 'js/data/parameters'

let config = getDefaultConfig()

export const setConfigItem = (id, value) => {
  if (!config[id]) {
    throw new Error('Could not find part ' + id + ' in config.')
  }

  config[id] = value
}

export const getConfigItem = (id) => {
  if (!config[id]) {
    throw new Error('Could not find part ' + id + ' in config.')
  }

  return config[id]
}

export const getConfig = () => {
  return config
}

export const setConfig = (value) => {
  config = value
}
