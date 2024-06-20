import { BASE_URL } from "../constants/app";

export const getImageProduct = (imageName)=>{
    return `${BASE_URL}/assets/uploads/products/${imageName}`;
}
// Format price
export const formatPrice = (price)=>{
    const formatter = new Intl.NumberFormat("vi-VN",{
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0
    })
    return formatter.format(price)
}