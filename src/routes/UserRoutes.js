import express from 'express'
import { deleteProduct, getProduct, getProductById, productRegistration, updateProduct } from '../controllers/UserControllers.js'
import { checkProduct, productValidation } from '../midlleware/ProductsValidation.js'

const userRoutes = express.Router()

userRoutes.get('/produtos', getProduct)
userRoutes.get('/produtos/:id', checkProduct,  getProductById)
userRoutes.post('/produtos', productValidation, productRegistration)
userRoutes.put('/produtos/:id', checkProduct, productValidation, updateProduct)
userRoutes.delete('/produtos/:id', checkProduct, deleteProduct)

export default userRoutes