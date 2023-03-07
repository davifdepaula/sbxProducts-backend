
import { ObjectId } from "mongodb";
import db from "../config/database.js";
import { productSchemas } from "../schemas/ProductSchemas.js";

const productValidation = (req, res, next) => {
  const productValidate = productSchemas.validate(req.body)
  if(productValidate.error) return res.status(422).send(`${productValidate.error.message}`)
  res.locals.name = req.body.name
  res.locals.description = req.body.description
  res.locals.price = req.body.price
  next() 
}

const checkProduct = async(req, res, next) => {
  try {
    const {id} = req.params
    const checkIfExist = await db.collection("Products").findOne({_id: new ObjectId(id)})
    if(!checkIfExist) return res.sendStatus(404)
    res.locals.product = checkIfExist
    console.log('oi')
    next()    
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export {
  productValidation,
  checkProduct
}