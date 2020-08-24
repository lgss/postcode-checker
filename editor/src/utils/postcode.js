exports.parsePostcodes = (postcodeBlock) => {
  return postcodeBlock.toUpperCase().split('\n')
}

exports.displayPostcodes = (parent) => {
  if (!parent || !parent.postcodes)
    return ''

  return parent.postcodes.join('\n')
}