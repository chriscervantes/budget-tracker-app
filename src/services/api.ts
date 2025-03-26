import axios from "axios";
import {
  MonthlyExpense,
  Expense,
  MonthlyExpenseWithCashOnHand,
} from "../types";

const API_URL = "http://localhost:3000/api"; // Replace with Render/Fly.io URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

console.log("api", axiosInstance);
export const getMonthlyExpenses = async (): Promise<MonthlyExpense[]> => {
  const response = await axiosInstance.get("/monthly-expenses");

  return response.data;
};

export const getMonthDetails = async (
  id: string
): Promise<MonthlyExpenseWithCashOnHand> => {
  const response = await axiosInstance.get(`/monthly-expenses/${id}`);
  return response.data;
};

export const createMonthlyExpense = async (
  data: MonthlyExpense
): Promise<MonthlyExpense | {}> => {
  console.log("calling create monthly expense api", data);
  console.log("api ->", JSON.stringify(axiosInstance));
  let responseData = {};
  await axiosInstance
    .post("/monthly-exp0enses", data)
    .then((res) => {
      responseData = res;
    })
    .catch((e) => {
      throw new Error(e);
    });
  console.log("response", responseData);
  return responseData;
};

export const createExpense = async (data: Expense): Promise<Expense> => {
  const response = await axiosInstance.post("/expenses", data);
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/expenses/${id}`);
};
