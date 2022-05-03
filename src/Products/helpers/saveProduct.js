import axios from "axios" 


const baseUrl = process.env.REACT_APP_BASE_URL;

const saveProduct = async(producData) =>{

    try {
       // console.log(producData);
        // crear formdata para poder pasar la imagen
        const formData = new FormData();

        formData.append("name",producData.name);
        formData.append("unitaryPrice",producData.priceUnitary);
        formData.append("size",producData.size);
        formData.append("description",producData.description);
        formData.append("image",producData.image);


        const response = await axios({
            url:`${baseUrl}/products`,
            method:"POST",
            data:formData,
        })

        return response;

    } catch (error) {
        console.log(error);
    }

}

export default saveProduct;

