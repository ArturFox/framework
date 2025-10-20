import { createContext, useContext, useState } from "react";

type AuthContextType = {
  flagDialog: boolean;
  setflagDialog: (value: boolean) => void;

  newflagDialog: boolean;
  setnewflagDialog: (value: boolean) => void;
  
  newPasswordProps: boolean;
  setnewPasswordProps: (value: boolean) => void;

  currentForm: 'login' | 'register' | 'forgotPassword';
  setCurrentForm: (value: 'login' | 'register' | 'forgotPassword') => void;

  flow: 'register' | 'forgotPassword';
  setFlow: (flow: 'register' | 'forgotPassword') => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [flagDialog, setflagDialog] = useState(false);
  const [newflagDialog, setnewflagDialog] = useState(false);
  const [newPasswordProps, setnewPasswordProps] = useState(false);
  const [currentForm, setCurrentForm] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const [flow, setFlow] = useState<'register' | 'forgotPassword'>('register');

  return (
    <AuthContext.Provider
      value={{
        flagDialog,
        setflagDialog,
        newflagDialog,
        setnewflagDialog,
        newPasswordProps,
        setnewPasswordProps,
        currentForm,
        setCurrentForm,
        flow,
        setFlow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
