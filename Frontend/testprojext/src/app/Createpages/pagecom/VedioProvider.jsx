'use client'
import  { createContext, useContext, useState,useEffect } from "react";

// 1. Create the context
const VedioContext = createContext();

// 2. Provider component
export default function VedioProvider({ children }) {
  const vediodetails = {
    title: "",
    url:null,
    page_id: "",
    channel_name: "",
    description: ""
  };
  const [vediodet, setVediodet] = useState(vediodetails);
   useEffect(() => {
    const saved = localStorage.getItem('vedioDetails');
    if (saved) {
      setVediodet(JSON.parse(saved));
    }
  }, []);

  // Save state to localStorage on every change
  useEffect(() => {
    localStorage.setItem('vedioDetails', JSON.stringify(vediodet));
  }, [vediodet]);
  const setdetails = (valu) => setVediodet(valu);

  return (
    <VedioContext.Provider value={{ vediodet, setdetails }}>
      {children}
    </VedioContext.Provider>
  );
}

// 3. Custom hook to use the context
export function useDetails() {
  return useContext(VedioContext);
}