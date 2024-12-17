declare namespace App {
export type AttributeType = 1 | 2;
export type CartStatus = 0 | 1;
export type OrderStatus = 0 | 1 | 2 | 3 | 4 | 5;
export type PageStatus = 0 | 1 | 2 | 3;
export type PostStatus = 0 | 1 | 2 | 3;
export type ProductStatus = 0 | 1 | 2 | 3;
export type ProductStockStatus = 0 | 1;
export type UserRole = 1 | 2 | 3 | 4;
}
declare namespace App.Data {
export type AttributeData = {
id: number;
name: string;
slug: string;
description: string | null;
};
export type AttributeValueData = {
id: number;
attribute_id: number;
value: string;
attribute: App.Data.AttributeData;
};
export type CartData = {
total: number;
id: number;
session: string;
products: Array<App.Data.CartProductData> | null;
};
export type CartProductData = {
quantity: number;
realPrice: number;
id: number;
name: string;
slug: string;
sku: string;
price: number | null;
stock: number | null;
stock_status: App.ProductStockStatus;
description: string | null;
status: App.ProductStatus | null;
cover: any | null;
variations: Array<App.Data.ProductVariationData> | null;
pivot: any | null;
};
export type CategoryData = {
id: number;
name: string;
slug: string;
description: string | null;
cover: any | null;
};
export type GlobalData = {
action: any | string | null;
categories: Array<App.Data.CategoryData> | null;
};
export type PageData = {
};
export type PostCategoryData = {
id: number;
name: string;
slug: string;
description: string | null;
cover: any | null;
};
export type PostData = {
id: number;
name: string;
slug: string;
content: string | null;
status: App.PostStatus;
cover: any | null;
photos: any | null;
categories: Array<App.Data.PostCategoryData> | null;
};
export type ProductData = {
id: number;
name: string;
slug: string;
sku: string;
price: number | null;
stock: number | null;
stock_status: App.ProductStockStatus;
description: string | null;
status: App.ProductStatus | null;
data: Array<any> | null;
cover: any | null;
photos: any | null;
variations: Array<App.Data.ProductVariationData> | null;
attributes: Array<App.Data.AttributeValueData> | null;
categories: Array<App.Data.CategoryData> | null;
};
export type ProductVariationData = {
id: number;
product_id: number;
sku: string;
price: number | null;
stock: number | null;
stock_status: App.ProductStockStatus;
variation: App.Data.VariationValueData | null;
};
export type SharedData = {
user: App.Data.UserData | null;
};
export type UserData = {
id: number | null;
name: string | null;
email: string | null;
email_verified_at: string | null;
};
export type VariationData = {
id: number;
name: string;
description: string | null;
};
export type VariationValueData = {
id: number;
variation_id: number;
value: string;
variation: App.Data.VariationData;
};
}
declare namespace App.Support.Data {
export type DataResourceContract = {
};
}
