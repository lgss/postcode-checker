exports.group = () => {
    return {
        id: String,
        sortkey: String,
        group_name: String,
        postcodes: [String]
    }
}

exports.notice = () => {
    return {
        id: String,
        sortKey: String,
        notice_name: String,
        notice_default: Boolean,
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