exports.parsePostcodes = (postcodeBlock) => {
  return postcodeBlock.toUpperCase().split('\n')
}

exports.displayPostcodes = (postcodes) => {
  if (!postcodes)
    return ''
    
  return postcodes.join('\n')
}