import joi from 'joi'

export const rentalsSchema = joi.object ({
    customerId: joi.number().required().positive(),
    gameId: joi.number().required().positive(),
    daysRented: joi.number().required().positive(),
})