declare namespace App {
export type ProductStatus = 0 | 1 | 2 | 3;
export type UserRole = 1 | 2 | 3 | 4;
}
declare namespace App.Data {
export type SharedData = {
user: App.Data.UserData | null;
};
export type UserData = {
id: number | null;
name: string | null;
};
}
declare namespace App.Support.Data {
export type DataResourceContract = {
};
}
