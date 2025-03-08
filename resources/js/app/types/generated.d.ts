declare namespace App {
export type AttributeSearchable = 0 | 1;
export type AttributeType = 1 | 2 | 3;
export type CartStatus = 0 | 1 | 2;
export type OrderPaymentMethod = 1 | 2;
export type OrderStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type PageStatus = 0 | 1 | 2 | 3;
export type PostStatus = 0 | 1 | 2 | 3;
export type ProductStatus = 0 | 1 | 2 | 3;
export type ProductStockStatus = 0 | 1;
export type SubscriberStatus = 0 | 1;
export type UserRole = 1 | 2 | 3 | 4;
export type VariationSearchable = 0 | 1;
}
declare namespace App.Data {
export type AddressData = {
id: number;
user_id: number;
phone: string;
address_line_1: string;
address_line_2: string | null;
city: string;
postal_code: string;
};
export type AttributeData = {
icon: string | null;
searchType: string | null;
searchLabel: string | null;
id: number;
name: string;
slug: string;
description: string | null;
values: Array<App.Data.AttributeValueData> | null;
data: Array<any> | null;
};
export type AttributeValueData = {
id: number;
attribute_id: number;
value: string;
attribute: App.Data.AttributeData | null;
};
export type CartData = {
subtotal: number;
total: number;
discount: number;
shipping: number;
id: number;
session: string;
products: Array<App.Data.CartProductData> | null;
};
export type CartOrderData = {
subtotal: number;
total: number;
discount: number;
shipping: number;
id: number;
session: string;
products: Array<App.Data.CartOrderProductData> | null;
};
export type CartOrderProductData = {
quantity: number;
total: number;
chosenId: number;
variation: App.Data.VariationValueData | null;
id: number;
name: string;
sku: string;
variations: Array<App.Data.ProductVariationData> | null;
pivot: any | null;
};
export type CartProductData = {
quantity: number;
total: number;
chosenId: number;
variation: App.Data.VariationValueData | null;
id: number;
name: string;
slug: string;
sku: string;
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
descendants: Array<App.Data.CategoryData> | null;
};
export type DiscountData = {
id: number;
product_id: number | null;
product_variation_id: number | null;
price: number | null;
percentage: number | null;
starts_at: string | null;
ends_at: string | null;
};
export type GlobalData = {
env: string;
action: any | string | null;
categories: Array<App.Data.CategoryData> | null;
promoPackages: Array<any> | null;
posts: Array<App.Data.PostData> | null;
additional: Array<any> | null;
};
export type OrderData = {
payment_method_label: string;
date_created: string;
id: number;
user_id: number;
shipping_address_id: number;
cart_id: number;
user_ip: string;
amount: number;
shipping: number;
discount: number;
total: number;
created_at: string | null;
payment_method: App.OrderPaymentMethod;
status: App.OrderStatus | null;
shipping_address: App.Data.AddressData | null;
user: App.Data.UserData | null;
items: Array<App.Data.OrderItemData> | null;
payment: App.Data.PaymentData | null;
cart: Array<any> | null;
data: Array<any> | null;
};
export type OrderItemData = {
id: number;
order_id: number;
product_id: number;
product_variation_id: number | null;
quantity: number;
price: number;
real_price: number;
discount: number;
product: App.Data.ProductData | null;
};
export type PageData = {
id: number;
name: string;
slug: string;
content: string | null;
status: App.PageStatus | null;
};
export type PaymentData = {
id: number;
processed: number;
invoice: string;
card: string | null;
oid: string;
authAttrCode: string | null;
procCode: string | null;
responseCode: string | null;
md: string | null;
masked: string;
};
export type PostCategoryData = {
id: number;
name: string;
slug: string;
description: string | null;
cover: any | null;
};
export type PostData = {
excerpt: string;
category: App.Data.PostCategoryData | null;
id: number;
name: string;
slug: string;
content: string;
status: App.PostStatus;
cover: any | null;
photos: any | null;
date_created: string;
categories: Array<App.Data.PostCategoryData> | null;
};
export type ProductData = {
grouped_variations: any | Array<any> | null;
grouped_attributes: any | Array<any> | null;
additional: Array<any> | null;
category: App.Data.CategoryData | null;
tag: App.Data.TagData | null;
id: number;
name: string;
slug: string;
sku: string;
price: number | null;
base_price: number | null;
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
discount: App.Data.DiscountData | null;
discounts: Array<App.Data.DiscountData> | null;
productTags: Array<App.Data.TagData> | null;
};
export type ProductTypeData = {
id: number;
name: string;
slug: string;
};
export type ProductVariationData = {
id: number;
product_id: number;
sku: string;
price: number | null;
stock: number | null;
stock_status: App.ProductStockStatus;
discount: App.Data.DiscountData | null;
variation: App.Data.VariationValueData | null;
variations: Array<App.Data.VariationValueData> | null;
};
export type SharedData = {
user: App.Data.UserData | null;
};
export type SubscriberData = {
id: number;
email: string;
status: App.SubscriberStatus | null;
};
export type TagData = {
id: number;
name: string;
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
values: Array<App.Data.VariationValueData> | null;
};
export type VariationValueData = {
id: number;
variation_id: number;
value: string;
variation: App.Data.VariationData | null;
pivot: any | null;
};
}
declare namespace App.Support.Data {
export type DataResourceContract = {
};
}
