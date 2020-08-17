exports.parsePostcodes = (postcodeBlock) => {
  if (!postcodeBlock)
    return []

  return postcodeBlock.toUpperCase().split('\n')
}

exports.displayPostcodes = (block) => {
  if (!block || !block.postcodes)
    return ''
    
  return block.postcodes.join('\n')
}