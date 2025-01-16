export interface Product {
  Id: number;
  Created_at: Date;
  Title: string;
  Description: string;
  Category: string;
  Price: number;
  Discount_Percentage: number;
  Rating: number;
  Stock: number;
  Tags: string[];
  Brand: string;
  Weight: number;
  Reviews: string[];
  Images: string[];
}
