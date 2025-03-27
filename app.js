import epress from 'express'
import { PORT } from './config.js'
import {getCustomers, getOnePage, getMyTransaction} from './customers.js'

const app=epress()
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})
app.get("/", (req, res) => {
    res.send("Please check doc for usage.")
})
app.get("/customers", (req,res)=>{
    getCustomers(res)
})
app.get("/customers/:num", (req,res)=>{
    //console.log( Number(req.params.num))
    getOnePage(res,Number( req.params.num))
})
app.get("/transactions/:id", (req,res)=>{
    getMyTransaction(res,Number(req.params.id))
})