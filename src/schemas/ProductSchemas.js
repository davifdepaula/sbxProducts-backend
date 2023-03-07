import joi from 'joi'

const productSchemas = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required()
})

export {
  productSchemas
}