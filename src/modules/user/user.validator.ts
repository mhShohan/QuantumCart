import { z } from 'zod';

const fullNameValidator = z.object({
  firstName: z
    .string({
      required_error: 'firstName is required',
      invalid_type_error: 'firstName must be a string',
    })
    .trim(),
  lastName: z
    .string({
      required_error: 'lastName is required',
      invalid_type_error: 'lastName must be a string',
    })
    .trim(),
});

const addressValidator = z.object({
  street: z
    .string({
      required_error: 'street is required',
      invalid_type_error: 'street must be a string',
    })
    .trim(),
  city: z
    .string({
      required_error: 'city is required',
      invalid_type_error: 'city must be a string',
    })
    .trim(),
  country: z
    .string({
      required_error: 'country is required',
      invalid_type_error: 'country must be a string',
    })
    .trim(),
});

const userValidator = z.object({
  userId: z
    .number({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a number',
    })
    .min(0, { message: 'UserId cannot be negative!' }),
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .trim(),
  password: z
    .string()
    .min(5, { message: 'Password must have minimum 3 characters!' })
    .max(20, { message: 'Password cannot be greater then 20 characters!' }),
  fullName: fullNameValidator,
  age: z
    .number({
      required_error: 'age is required',
      invalid_type_error: 'age must be a number',
    })
    .min(0, { message: 'Age cannot be negative!' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .email()
    .toLowerCase(),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be true of false',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'hobby is required',
      invalid_type_error: 'hobby must be a string',
    }),
  ),
  address: addressValidator,
});

export default userValidator;
