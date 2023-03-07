import db from "../config/database.js"
import { ObjectId } from "mongodb"

const getProduct = async(req, res) => {
  try {
    const products = await  db.collection("Products").find().toArray()
    return res.status(200).send({products})    
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getProductById = async(req, res) => {
  try {
    const {product} = res.locals
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(error)
  }
}

const productRegistration = async(req, res) => {
  try {
    const {name, description, price} = res.locals
    await db.collection("Products").insertOne({name, description, price})
    return res.sendStatus(201)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updateProduct = async(req, res) => {
  try {
    const { name, description, price} = res.locals
    const { id } = req.params
    const product = await db.collection("Products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description, price } },
    )
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error)
  }
}

const deleteProduct = async(req, res) => {
  try {
    const {id} = req.params
    await db.collection("Products").deleteOne({_id: new ObjectId(id)})
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export {
  getProduct,
  getProductById,
  productRegistration,
  updateProduct,
  deleteProduct
}