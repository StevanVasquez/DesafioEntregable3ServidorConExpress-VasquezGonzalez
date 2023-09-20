// const fs = require('fs');
import {promises as fs} from "fs"

export default class ProductManager {
    constructor() {
        this.path = "./src/Productos.json"
        this.products = [];
    }

    static id = 0

    addProducts = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++
        const productoNuevo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(productoNuevo);

        await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
    };

    readProducts = async () => {
        let LeerProductos = await fs.readFile(this.path, "utf-8")
        return JSON.parse(LeerProductos)
    }

    getProducts = async () => {
        let ObtenerProductos = await this.readProducts()
        return console.log(ObtenerProductos);
    }

    getProductsByid = async (id) => {
        const ObtenerProductoId = await this.readProducts()
        if (!ObtenerProductoId.find(product => product.id === id)) {
            console.log("El producto no se encuentra")
        } else {
            console.log(ObtenerProductoId.find((product) => product.id === id));
        }

    };

    deleteProduct = async (id) => {
        const eliminarProductoPorid = await this.readProducts();
        const productoEliminar = eliminarProductoPorid.filter((products) => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productoEliminar, null, '\t'));
        console.log('Producto Eliminado');

    };
    
    updateProduct = async ({id, ...productos}) => {
        await this.deleteProduct(id);
        const productoAntiguo = await this.readProducts()
        const modificarProducto = [{...productos, id}, ...productoAntiguo];
        await fs.writeFile(this.path, JSON.stringify(modificarProducto, null, '\t'));
    };
        
}

// const productos = new ProductManager();

// productos.addProducts('Audifonos Apple', 'AirPods Inalambricos Blanco', 749000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.apple.com%2Fla%2Fnewsroom%2F2021%2F10%2Fintroducing-the-next-generation-of-airpods%2F&psig=AOvVaw0xyVtIWhF3b3ZN7gevFYxT&ust=1693854135152000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPiOssKQj4EDFQAAAAAdAAAAABAG', 'APP-2111', 24);
// productos.addProducts('Parlante JBL PARTY BOX 310', 'Inalambrico 240watts', 3100000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jbl.com.co%2Fparlantes%2FPARTYBOX-110-.html&psig=AOvVaw1wKrSHWq6yUWs0AdiXg2nQ&ust=1693763672043000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLC8osK_jIEDFQAAAAAdAAAAABAx','JBLS-3456', 12);
// productos.addProducts('Lavadora Samsung WA19T6260BY Gris', 'Carga Superior Motor Digital Inverter', 2300000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.samsung.com%2Fco%2Fwashers-and-dryers%2Fwashing-machines%2Ftop-load-17kg-black-caviar-wa17t6260bv-co%2F&psig=AOvVaw0kTiCX3byE32CgTRrj6f5O&ust=1693763322677000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIiM3aG-jIEDFQAAAAAdAAAAABAE','SAM-2345', 20);
// productos.addProducts('Televisor LG 55Pulgadas UR8750PSA', 'LED 4K-UHD 2023 Smart Tv', 2200000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.exito.com%2Ftelevisor-lg-55-pulgadas-led-uhd-4k-smart-tv-55ur8750psaawc-3122473%2Fp&psig=AOvVaw2YQIU89tqVmlXvEC0iqiap&ust=1693855148827000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPjw7qWUj4EDFQAAAAAdAAAAABAJ', 'LGS-7799', 10);
// productos.addProducts('Computador portatil HP 15 Pulgadas Ef2524la', 'Procesador AMD R5 Ram 8GB DiscoSSD 512 GB', 5000000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ktronix.com%2Fcomputador-portatil-hp-156-pulgadas-ef2505la-amd-ryzen-7-ram-8gb-disco-ssd-512-gb-dorado%2Fp%2F196337771505&psig=AOvVaw0xxg-EuAd3IE2n6NabtP6b&ust=1693882009978000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNCR7634j4EDFQAAAAAdAAAAABAG','LGS-7799', 25);
// productos.addProducts('Celular Samsung S23+', '5G 8Gb 512Gb Negro', 5600000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.samsung.com%2Fco%2Fsmartphones%2Fgalaxy-s23%2Fbuy%2F&psig=AOvVaw3TBB5rPeN15z6_HaQdl80D&ust=1695326492601000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIj377z9uYEDFQAAAAAdAAAAABAS','GALAX-7788', 40);
// productos.addProducts('Nevecon LG LS66SXSC', 'InstaView Craft Ice 637 Litros Gris', 8583000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hogarymoda.com.co%2Fproduct%2Fnevecon-lg-side-by-side-instaview-637lts-ls66sxsc-silver%2F&psig=AOvVaw194G3xwf_PeO_vOmABtikK&ust=1695326829960000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMi-_t3-uYEDFQAAAAAdAAAAABAM','NEV-7122', 35);

// productos.getProducts();