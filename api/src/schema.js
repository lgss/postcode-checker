exports.group = () => {
    return {
        id: String,
        sortkey: String,
        name: String,
        postcodes: [String]
    }
}

exports.notice = () => {
    return {
        id: String,
        sortKey: String,
        name: String,
        default: Boolean,
        content: String,
        postcodes: [String]
    }
}

// exports.postcode = () => {
//     return {
//         id: String,
//         sortkey: String,
//         name: String,
//         notices: [String]
//     }
// }