import React,{useState,useRef,useEffect} from 'react'
import { Form, Modal,Button,Container } from 'react-bulma-components'
import getProducts from '../helpers/getProducts'
import saveProduct from '../helpers/saveProduct'

import AddButton from './AddButton'
import Header from './Header'
import ListProducts from './ListProducts'
import Loading from './Loading'


const ProductLayout = () => {

    const[isModalOpen,setIsModalOpen] = useState(false);
    const {Field,Control,Label,Input} = Form;
    const [formValues,setFormValues] = useState({
        name:"",
        priceUnitary:"",
        size:"",
        description:""
    })

    const {name,priceUnitary,size,description} = formValues;
    const inputFileRef = useRef()

    const [isLoading,setIsLoading] = useState(true);
    const [products,setProducts] = useState([]);

    const loadProducts = async()=>{
            
        const response = await getProducts();
        console.log(response);
        if(response.status === 200){
            setProducts(response.data)
        }
        setIsLoading(false)

    }


    useEffect(() => {
    
        loadProducts();

    }, []);





    const handleOnchange = (e)=>{
        setFormValues({
            ...formValues,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit =  async(e)=>{
        e.preventDefault();
        const data = {...formValues,image:inputFileRef.current.files[0]}
        await saveProduct(data);
        loadProducts();
        setIsModalOpen(false);

    }

    return (
        <Container>
        <Header
            title={"Productos App"}
        />
        <AddButton onClick={()=>setIsModalOpen(true)}/>

        {
            (isLoading && !products.length) && <h1 className='title has-text-centered'>No tienes productos</h1>
        }
        {
            (!isLoading && products.length) &&
            <ListProducts products={products}/>
        }


        {/* ventana modal traida de la librería Bulma */}
        <Modal show={isModalOpen} onClose={()=>setIsModalOpen(false)}>
            <form onSubmit={handleSubmit} className={"modal-background modal-card"}>
                <Field>
                    <Label>Name</Label>
                    <Control>
                        <Input 
                            placeholder='text input'
                            name='name'
                            value={name}
                            onChange={handleOnchange}
                            />
                    </Control>
                </Field>
                <Field>
                    <Label>Size</Label>
                    <Control>
                        <Input 
                            placeholder='text input'
                            name='size'
                            value={size}
                            onChange={handleOnchange}
                            />
                    </Control>
                </Field>
                <Field>
                    <Label>Price Unitary</Label>
                    <Control>
                        <Input 
                            placeholder='text input'
                            name='priceUnitary'
                            value={priceUnitary}
                            onChange={handleOnchange}
                            />
                    </Control>
                </Field>
                <Field>
                    <Label>description</Label>
                    <Control>
                        <Input 
                            placeholder='description'
                            name='description'
                            value={description}
                            onChange={handleOnchange}
                            />
                    </Control>
                </Field>

                <Field>
                    <Label>Image</Label>
                    <Control>
                        <input type="file" ref={inputFileRef} />
                    </Control>
                </Field>
                <Button
                    type='submit'
                    color={"primary"} 
                    >Save
                </Button>
            </form>
        </Modal>
        </Container>
        
    )
}

export default ProductLayout