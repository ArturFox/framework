import { FormProvider, useForm } from "react-hook-form"
import { FormInputM } from "./six-form-input"
import { confirmZod, type TconfirmZod } from "./seven-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

type OnSubmitType = {
    success: boolean; 
    message: string; 
    type: "registration" | "forgot_password";
};

export const ConfirmPasswordM = () => {

    const setFlagDialog = useAuthStore((state) => state.setFlagDialog);

    const navigate = useNavigate();

    const form = useForm<TconfirmZod>({
        resolver: zodResolver(confirmZod),
        defaultValues: {
            password: '',
        },
    });

    const onSubmit = async (data: TconfirmZod) => {

        const userId = localStorage.getItem('userId');
        const verifyType = localStorage.getItem("verifyType"); 

        if(!userId || !verifyType){
            return toast.error('Ошибка: отсутствует ID пользователя. Попробуйте снова восстановить пароль.', { icon: '❌' });
        };

        const dataTrim = {
            userId,
            code: data.password.trim(),
            type: verifyType,
        };

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/confirmPassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataTrim),
            });

            const result: OnSubmitType = await response.json();

            if(!response.ok || !result.success) {
                return toast.error(result.message || "Ошибка при отправки кода", { icon: "❌" });
            };

            toast.success('Аккаунт подтверждён', {icon: '✅'});

            setTimeout(() => {
                if(result.type === 'registration'){
                    localStorage.removeItem('userId');
                    localStorage.removeItem('verifyType');
                    navigate("/");
                    setFlagDialog(true);
                } else if(result.type === 'forgot_password'){
                    navigate("/newPassword");
                }
            }, 1000);
        } catch(error: unknown){
            
            const err = error instanceof Error 
                ? error.message
                    ? error.message
                    : "Что-то пошло не так"
                : "Что-то пошло не так";
            
            toast.error(err, { icon: '❌'});
        }
    }

    return(
        <main>
            <section>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInputM name="password" label="Введите пароль подтверждения" required/>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Отправить
                        </Button>
                    </form>
                </FormProvider>
            </section>
        </main>
    )
}