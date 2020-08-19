exports.parsePostcodes = (postcodeBlock) => {
  return postcodeBlock.toUpperCase().split('\n')
}

exports.displayPostcodes = (postcodes) => {
  return postcodes.join('\n')
