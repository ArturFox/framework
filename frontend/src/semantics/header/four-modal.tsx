import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LoginM } from "./five-login";
import { useAuthContext } from "./two-context";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const AuthModalM = () => {

  const flagDialog = useAuthStore((state) => state.flagDialog);
  const setFlagDialog = useAuthStore((state) => state.setFlagDialog);

  const currentForm = useAuthStore((state) => state.currentForm);
  const setCurrentForm = useAuthStore((state) => state.setCurrentForm);

  const navigate = useNavigate();

  return (

    <Dialog
      open={flagDialog}
      onOpenChange={(open) => {
        setFlagDialog(open);
      }}
    >

      <DialogContent>
        
        <DialogTitle>
          {
            {
              login: "Войти",
              register: "Создание аккаунта",
              forgotPassword: "Восстановление пароля",
            }[currentForm]
          }
        </DialogTitle>

        {
          {
            login: <LoginM/>,
            register: <div>нету</div>, 
            forgotPassword: <div>нету</div>,
          }[currentForm]
        }

        
      </DialogContent>
    </Dialog>
  );
};
