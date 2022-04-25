const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/terms', (request: any, response: any) => {
    return response.json({message: 'Termos de Serviço'});
});

app.use('/v1', routes);

app.listen(3000, () => console.log('Server is running on port 3000'));