import joi from 'joi'

export const rentalsSchema = joi.object ({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().required().positive(),
})