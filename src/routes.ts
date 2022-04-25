const router = require('express').Router();
const {v4} = require('uuid');
const ensureAuthenticated = require('./middleware');

interface ProductsDTO {
    id: string,
    name: string,
    description: string,
    price: number
}

const products: ProductsDTO[] = [];

router.get('/products/findByName', (request: any, response: any) => {
    const {name} = request.query;
    const product = products.filter((product) => product.name.includes(name));

    return response.json(product);
});

router.get('/products/:id', (request: any, response: any) => {
    const {id} = request.params;
    const product = products.find((product) => product.id === id);

    return response.json(product);
});

router.post('/products', ensureAuthenticated, (request: any, response: any) => {
    const {name, description, price} = request.body;
    const productAlreadyExists = products.find((product) => product.name === name);

    if (productAlreadyExists) {
        return response.status(400).json({message: 'Product already exists!'});
    }

    const product: ProductsDTO = {
        id: v4(),
        description,
        name,
        price
    };

    products.push(product);

    return response.json(product);
});

router.put('/products/:id', ensureAuthenticated, (request: any, response: any) => {
    const {id} = request.params;
    const {name, description, price} = request.body;

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return response.status(400).json({message: 'Product doesnt exists!'});
    }

    const product: ProductsDTO = Object.assign({
        id,
        name,
        description,
        price
    });

    products[productIndex] = product;

    return response.json(product);
});

module.exports = router;