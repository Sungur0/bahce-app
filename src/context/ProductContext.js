import React, { createContext, useContext, useState } from 'react';
const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, category: 'flowers', name: 'Zammia Bitkisi',models: [ require('../../assets/image1.jpg'),require('../../assets/image1.jpg')], description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '59.62₺', discount: '69.62₺', src: require('../../assets/image1.jpg') },
    { id: 2, category: 'pots', name: 'Pembe İkili Dekoratif Saksı',models: [ require('../../assets/image1.jpg'),require('../../assets/image1.jpg')], description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '39.35₺', discount: '42.35₺', src: require('../../assets/image2.jpg') },
    { id: 3, category: 'flowers', name: 'Ficus Benjamina Natasja ', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '72.69₺', discount: '90.10₺', src: require('../../assets/image3.jpg') },
    { id: 4, category: 'fertilizers', name: 'Ürün 4', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '89.10₺', discount: '', src: require('../../assets/image1.jpg') },
    { id: 5, category: 'soils', name: 'Ürün 5', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '46.30₺', discount: '', src: require('../../assets/image1.jpg') },
    { id: 6, category: 'flowers', name: 'Zammia1',models: [ require('../../assets/image1.jpg'),require('../../assets/image1.jpg')], description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '10.62₺', discount: '69.62₺', src: require('../../assets/image1.jpg') },
  
  ]);

  const [featuredProducts, setFeaturedProducts] = useState([
    { id: 1, category: 'flowers', name: 'Zammia Bitkisi',models: [ require('../../assets/image1.jpg'),require('../../assets/image1.jpg')], description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '59.62₺', discount: '69.62₺', src: require('../../assets/image1.jpg') },
    { id: 2, category: 'pots', name: 'Pembe İkili Dekoratif Saksı',models: [ require('../../assets/image1.jpg'),require('../../assets/image1.jpg')], description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '39.35₺', discount: '42.35₺', src: require('../../assets/image2.jpg') },
    { id: 3, category: 'flowers', name: 'Ficus Benjamina Natasja ', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '72.69₺', discount: '90.10₺', src: require('../../assets/image3.jpg') },
    { id: 4, category: 'fertilizers', name: 'Zammia Benjamina Pembe', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', price: '89.10₺', discount: '', src: require('../../assets/image1.jpg') },
   
  ]);

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      featuredProducts,
      setFeaturedProducts,
      getProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
};
