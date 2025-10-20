import { FormProvider, useForm } from "react-hook-form"
import { FormInputM } from "./six-form-input"
import { Button } from "@/components/ui/button"
import { newPassword, type TnewPassword } from "./seven-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

type OnSubmitType = {
    success: boolean; 
    message: string; 
    userId: string;
};

export const NewPasswordM = () => {

    const setFlagDialog = useAuthStore((state) => state.setFlagDialog);

    const navigate = useNavigate();

    const form = useForm<TnewPassword>({
        resolver: zodResolver(newPassword),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TnewPassword) => {

        const userId = localStorage.getItem('userId');

        if(!userId){
            return toast.error('Ошибка: отсутствует ID пользователя. Попробуйте снова восстановить пароль.', { icon: '❌' });
        };

        const dataTrim = {
            password: data.password.trim(),
            userId: userId,
        };

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/newPassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataTrim),
            });

            const result: OnSubmitType = await response.json();

            if(!response.ok){
                return toast.error( result.message, {icon: '❌'});
            };

            localStorage.removeItem('userId');
            localStorage.removeItem('verifyType');

            toast.success('Пароль успешно обновлен', {icon: '✅'});

            
            navigate("/");
            

            setFlagDialog(true);


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
                <article>
                    <p>Смените пароль</p>
                    <p>Убедитесь, что это не менее 15 символов ИЛИ</p>
                    <p>не менее 8 символов включая цифру и строчную</p>
                    <p>букву.</p>
                </article>
            </section>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInputM name="password" label="Пароль" required/>
                    <FormInputM name="confirmPassword" label="Подтвердите пароль" required/>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Сменить пароль
                    </Button>
                </form>
            </FormProvider>
        </main>
    )
}