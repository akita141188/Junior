import { BASE_URL } from "../shared/constants/app";


export const getImagesProduct = (imageName)=>{
    return ` ${BASE_URL}/images/${imageName}`
}
