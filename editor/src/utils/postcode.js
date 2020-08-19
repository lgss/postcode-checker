exports.parsePostcodes = (postcodeBlock) => {
  if (!postcodeBlock)
    return []

  return postcodeBlock.toUpperCase().split('\n')
}

exports.displayPostcodes = (postcodes) => {
  if(postcodes){
    if(postcodes.lengh > 0){
      return postcodes.join('\n')
    } else {
      return postcodes[0]
    }
  } else {
    return null
  }
}