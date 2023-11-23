import { z } from 'zod';

const fullNameValidator = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const addressValidator = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const userValidator = z.object({
  userId: z.number().min(0, { message: 'UserId cannot be negative!' }),
  username: z.string().trim(),
  password: z
    .string()
    .min(5, { message: 'Password must have minimum 3 characters!' })
    .max(20, { message: 'Password cannot be greater then 20 characters!' }),
  fullName: fullNameValidator,
  age: z.number().min(0, { message: 'Age cannot be negative!' }),
  email: z.string().trim().email().toLowerCase(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidator,
});

export default userValidator;
