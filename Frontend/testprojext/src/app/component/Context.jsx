'use client';
import React, { useState, useContext } from "react";
import CustomLayout from "./CustomLayout";

const AuthContext = React.createContext();

export default function Heddder({children}) {
  const [user, setUser] = useState(null);

  const login = (data) => setUser(data);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ login, logout }}>
        <div className="flex flex-col gap-1">
          <div><CustomLayout user={user}  /></div>
       <div>
         <main > {children}</main>
       </div>
      </div>
    </AuthContext.Provider>
  );
}

export const useAuth = ()=>useContext(AuthContext);
