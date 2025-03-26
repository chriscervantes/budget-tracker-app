import { z } from "zod";

export const expenseCategoryEnum = z.enum([
  "TRANSPORTATION",
  "GROCERY",
  "SCHOOL",
  "CAR",
  "HOUSE",
  "TRAVEL",
  "PERSONAL",
  "KIDS",
  "MISCELLANEOUS",
]);

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  auth0Id: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime().optional(),
});

export const monthlyExpenseSchema = z.object({
  id: z.string().uuid().optional(),
  month: z.string(),
  budgetGoal: z.number().positive(),
  userId: z.string().uuid(),
});

export const expenseSchema = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  amount: z.number().positive(),
  date: z.string().datetime(),
  category: expenseCategoryEnum,
  monthlyExpenseId: z.string().uuid(),
});

export const monthlyExpenseWithCashOnHandSchema = monthlyExpenseSchema.extend({
  expenses: z.array(expenseSchema).optional(),
  cashOnHand: z.number(),
});

export type User = z.infer<typeof userSchema>;
export type MonthlyExpense = z.infer<typeof monthlyExpenseSchema>;
export type Expense = z.infer<typeof expenseSchema>;
export type MonthlyExpenseWithCashOnHand = z.infer<
  typeof monthlyExpenseWithCashOnHandSchema
>;
