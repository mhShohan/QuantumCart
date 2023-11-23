import { z } from 'zod';

const orderValidator = z.object({
  productName: z
    .string({
      required_error: 'productName is required',
      invalid_type_error: 'productName must be a string',
    })
    .trim(),
  price: z.number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  }),
  quantity: z
    .number({
      required_error: 'quantity is required',
      invalid_type_error: 'quantity must be a number',
    })
    .min(1, { message: 'quantity must be greater then zero' }),
});

export default orderValidator;
