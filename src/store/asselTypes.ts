import { AsyncThunk } from "@reduxjs/toolkit";
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  discountPercentage: number;
  brand: string;
  size: number;
  link: string;
  quantity: number;
  reviews: [
    {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    },
  ];
}

export type CategoryKey =
  | "men"
  | "jewelry"
  | "women"
  | "watches"
  | "sneakers"
  | "heels"
  | "womenwatches";
export type categoryThunkType = AsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>;
