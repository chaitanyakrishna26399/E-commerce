
const joi = require('joi')

class Validations {

static async Addproduct(req, res, next) {
    // validate the input body value. 
    const validation = joi.object({
        name: joi.string().required().label('Name'),
        description: joi.string().label('description'),
        price: joi.number().required().label("price"),
        variants: joi.array().items(
            Joi.object({
                name: joi.string().required(),
                sku: joi.string().required(),
                additionalCost:joi.number().required(),
                stockCount:joi.number().required()
    }))
        .required().label('vari')
    })
    //  below options are used to remove the qoutes in the validation response.
    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };
    const err = validation.validate(req.body, options);
    if (err.error) {
        //return error message.
        res.status(200).json(response.error(err.error.details[0].message));
    } else {
        //moves to next method.
        next();
    }
}
}
module.exports=Validations