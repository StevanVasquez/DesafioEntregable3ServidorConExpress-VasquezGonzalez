import express from "express";
import ProductManager from "./ProductManager.js"

const app = express();
app.use(express.urlencoded({extended : true}))

const productos = new ProductManager();
const readProducts = productos.readProducts()

app.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let todosLosProductos = await readProducts
    let limiteProducts = todosLosProductos.slice(0, limit);
    res.send(limiteProducts);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let todosLosProductos = await readProducts;
    let productById = todosLosProductos.find(product => product.id === id)
    if(!productById) return res.send({error: 'Producto no encontrado'});
    res.send(productById)
})

app.listen(8080, () => console.log('Listening on port 8080'));