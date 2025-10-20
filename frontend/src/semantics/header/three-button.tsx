import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export const ProfileButtonM = () => {

    const setFlagDialog = useAuthStore((state) => state.setFlagDialog)

    return(
        <div>          
                
            <Button onClick={() => setFlagDialog(true)}>
                Войти
            </Button>
                
        </div>
    );
};