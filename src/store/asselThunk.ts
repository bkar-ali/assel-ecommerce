import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./asselTypes";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   images: string[];
//   discountPercentage: number;
//   brand: string;
// }

export const fetchMen = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("men/fetchMen", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/mens-shirts",
    );
    return res.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue("Message From Men Thunk");
  }
});

export const fetchJewelry = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("jewelry/fetchJewelry", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/womens-jewellery",
    );
    return res.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue("Message From Jewelry Thunk");
  }
});

// https://dummyjson.com/products/category/womens-shoes
// https://dummyjson.com/products/category/womens-dresses
// https://dummyjson.com/products/category/womens-watches
export const fetchWomen = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("women/fetchWomen", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/womens-dresses",
    );
    return res.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue("Message From Women Thunk");
  }
});

export const fetchWatches = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("watches/fetchWatches", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/mens-watches",
    );
    return res.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue("Message From Watches Thunk");
  }
});

export const fetchSneakers = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("Sneakers/fetchSneakers", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/mens-shoes",
    );
    return res.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue("Message From sneakers Thunk");
  }
});

export const fetchWomenWatches = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("womenWatch/fetchWomenWatch", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/womens-watches",
    );
    return res.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue("Message From Women Watches Thunk");
  }
});

export const fetchHeels = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("heels/fetchHeels", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/womens-shoes",
    );
    return res.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue("Message From Women Shoes Thunk");
  }
});
