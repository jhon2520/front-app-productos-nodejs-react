import axios from "axios" 


const baseUrl = process.env.REACT_APP_BASE_URL;

const getProducts = async() =>{

    try {
        const response = await axios({
            url:`${baseUrl}/products`,
            method:"GET"
        })

        return response;

    } catch (error) {
        console.log(error);
    }

}

export default getProducts;

