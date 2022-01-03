const Joi = require("joi").extend(require("@joi/date"));

export const monthlyRateCheck = {
    month: Joi.date().required().label("Month").format("YYYY-MM").min("1900-01").message({
        "date.min": `"Month" must be greater than or equal to 1900-01`,
    }),
    rate: Joi.number().required().label("Rate").min(0),
};

export const monthlyRateSchema = Joi.object({
    ...monthlyRateCheck,
});
