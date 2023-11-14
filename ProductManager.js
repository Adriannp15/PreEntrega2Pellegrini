class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      const id = this.generateUniqueId();
      const newProduct = { id, title, description, price, thumbnail, code, stock };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    }
  
    updateProduct(id, updatedFields) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        // No permitir la actualización del ID
        updatedFields.id = id;
        this.products[index] = { ...this.products[index], ...updatedFields };
        return this.products[index];
      } else {
        throw new Error('Producto no encontrado, no se puede actualizar.');
      }
    }
  
    deleteProduct(id) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
      } else {
        throw new Error('Producto no encontrado, no se puede eliminar.');
      }
    }
  
    generateUniqueId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  }
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Obtener productos (debe devolver [])
  console.log(productManager.getProducts());
  
  // Agregar un producto
  const addedProduct = productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  });
  
  // Obtener productos nuevamente (debe mostrar el producto recién agregado)
  console.log(productManager.getProducts());
  
  // Obtener un producto por ID
  const productId = addedProduct.id;
  console.log(productManager.getProductById(productId));
  
  // Actualizar un campo de un producto
  const updatedProduct = productManager.updateProduct(productId, {
    title: 'Nuevo nombre de producto',
  });
  console.log(updatedProduct);
  
  // Eliminar un producto
  productManager.deleteProduct(productId);
  console.log('Producto eliminado:', productId);
  
  // Intentar obtener el producto eliminado debería arrojar un error
  try {
    console.log(productManager.getProductById(productId));
  } catch (error) {
    console.error(error.message);
  }
  