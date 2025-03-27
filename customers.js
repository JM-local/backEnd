import { ObjectId } from 'mongodb'
import { myCollection, myTransactions } from "./mongo.js";
import date from 'date-and-time';
let getCustomers = (res, data) => {
    myCollection.find({}, { sort: { username: 1 } }, { limit: 20 }).project({ username: 1, name: 1, _id: 0, address: 1, birthdate: 1, email: 1, accounts: 1 }).toArray().then(resp => {
        resp.forEach(doc => {
            doc.birthdate = date.format(doc.birthdate, 'DD MMM YY')
        })
        res.status(200).json(resp)
    })
}
// let countCustomers = (res, num) => {
//     myCollection.find({}, { limit: num, sort: { title: -1 } }).toArray()
//         .then(resp => {
//             let genreList = []
//             resp.forEach(doc => {
//                 if (doc.genres)
//                     genreList.push(...doc.genres)
//             })
//             let genreCount = {}
//             genreList.forEach(item => {
//                 genreCount[item] = (genreCount[item] || 0) + 1;
//             })
//             res.status(200).send(genreCount)
//         })
// }
let getOnePage = (res, data) => {
    myCollection.find({}, { limit: 20, skip: (data-1)*20, sort: { username: 1 }}).project({ username: 1, name: 1, _id: 0, address: 1, birthdate: 1, email: 1, accounts: 1 }).toArray()
        .then(resp => {
            resp.forEach(doc => {
                doc.birthdate = date.format(doc.birthdate, 'DD MMM YY')

            })
            if (!resp)
                return res.status(200).json({ "message": "Nothing found" })
            return res.status(200).json(resp)
        })
        .catch(err => {
            return res.status(200).json({ "error": err })
        })
}
let getMyTransaction = (res, data) => {
    myTransactions.find({"account_id":data}, { limit: 1 }).project({ transactions: 1, account_id:1}).toArray()
        .then(resp => {
            let symbolList = []
            resp[0].transactions.forEach(doc => {
                    if (doc.symbol)
                        symbolList.push(doc.symbol)
                    doc.newid= ({"account_id":data})
                })
                // console.log (symbolList )
                let symbolCount = {}
                symbolList.forEach(item => {
                    symbolCount[item] = (symbolCount[item] || 0) + 1;
                })
                symbolCount.account_id= ({"account_id":data})
                res.status(200).json(symbolCount)
        //    res.status(200).json(resp)
        })

}

export { getCustomers, getOnePage, getMyTransaction }
