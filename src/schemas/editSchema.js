import joi from "joi";

export const editSchema = joi.object({
    value: joi.number().positive().required(),
    description: joi.string().required()
});