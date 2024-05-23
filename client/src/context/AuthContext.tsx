import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { UserCredential } from "firebase/auth";
import { User } from "firebase/auth";


export const AuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  user: {} as User | null,
  createUser: (email: any, password: any) => {},
  signIn: (email: any, password: any) => {},
  logout: () => {}
});

// const UserContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const createUser = (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: any, password: any) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser!);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  
  return (
    // these are some of the values we can access with the UserAuth function
    <AuthContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
