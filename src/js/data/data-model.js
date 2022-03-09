const config = {
  tip: 'brownLeather',
  tongue: 'brownLeather',
  heel: 'brownLeather',
  strap: 'brownLeather',
  shaft: 'brownLeather',
  sole: 'tpu',
  laces: 'dark',
}

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
