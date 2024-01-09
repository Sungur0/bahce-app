import React, { createContext, useContext, useState ,useCallback } from 'react';

// createContext ile bir sepet bağlamı oluşturun
const SepetContext = createContext();

// SepetProvider'ı oluşturun
export const SepetProvider = ({ children }) => {
  const [sepet, setSepet] = useState([]);

  // urunuSepeteEkle fonksiyonunu useCallback ile sarmala
  const urunuSepeteEkle = useCallback((urun) => {
    setSepet((prevSepet) => [...prevSepet, urun]);
  }, [setSepet]);
  

  // Sepet bilgisine erişim sağlamak için bir değer sağlayın
  const contextValue = {
    sepet,
    urunuSepeteEkle,
  };

  
  // SepetContext.Provider ile children'a erişim sağlayın
  return <SepetContext.Provider value={contextValue}>{children}</SepetContext.Provider>;
};

// Sepet bilgisine erişim sağlamak için bir özel hook oluşturun
export const useSepet = () => {
  const context = useContext(SepetContext);
  if (!context) {
    throw new Error('useSepet hook must be used within a SepetProvider');
  }
  return context;
};
