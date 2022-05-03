import React from 'react'
import {Card,Columns,Content,Heading} from "react-bulma-components";


const ListProducts = ({products}) => {

    return (
        <Columns>
        {
            products.map((product)=>{
                return(
                    <Columns.Column key={product._id} size={4} >
                        <Card>
                            <Card.Image size="4by3" src={product.imgUrl}/>
                            <Card.Content>
                                <Content>
                                    <Heading>
                                        {product.name}
                                    </Heading>
                                    <Heading>
                                        Price : {product.unitaryPrice}
                                    </Heading>
                                    <p>
                                        {product.description}
                                    </p>
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                )
            })
        }
        </Columns>
    )
}

export default ListProducts