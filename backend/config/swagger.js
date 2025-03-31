const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express CRUD API",
            version: "1.0.0",
            description: "API CRUD với Express.js, MySQL và Sequelize",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./routes/*.js"], // Quét các file trong thư mục routes
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger docs available at http://localhost:5000/api-docs");
};

module.exports = swaggerDocs;
