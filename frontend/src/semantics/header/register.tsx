import { FormProvider, useForm } from "react-hook-form"
import { FormInputM } from "./six-form-input"
import { Button } from "@/components/ui/button"
import { registerZod, type TregisterZod } from "./seven-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

type OnSubmitType = {
    success: boolean; 
    message: string; 
    userId: string;
};

export const RegisterM = () => {

    const navigate = useNavigate();

    const form = useForm<TregisterZod>({
        resolver: zodResolver(registerZod),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TregisterZod) => {
        const trimmedData = {
            email: data.email.trim(),
            name: data.name.trim(),
            password: data.password.trim(),
        };

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trimmedData),
            });

            const result: OnSubmitType = await response.json();

            if(!response.ok || !result.success) {
                return toast.error(result.message || "Ошибка при регистрации", { icon: "❌" });
            };

            localStorage.setItem('userId', result.userId);
            localStorage.setItem('verifyType', 'registration');

            toast.success("Отправили код на вашу почту", { icon: "✅" });

            navigate("/confirmPassword");
            
            
        } catch(error: unknown){
            const err = error instanceof Error 
                ? error.message
                    ? error.message
                    : "Что-то пошло не так"
                : 'Что-то пошло не так';
            toast.error(err, { icon: '❌'});
        }

    }

    return(
        <main>
            <section>
                <p>Создайте свою бесплатную учетную запись</p>
            </section>

            <section>
                <h3>Зарегистрируйтесь на Framework Team</h3>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInputM name="email" label="Электронная почта" required/>
                        <FormInputM name="name" label="Имя пользователя" required/>
                        <FormInputM name="password" label="Пароль" required/>
                        <FormInputM name="confirmPassword" label="Повторите пароль" required/>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {form.formState.isSubmitting ? 'Подождите...' : 'Создать аккаунт'}
                        </Button>
                    </form>
                </FormProvider>
            </section>
        </main>
    )
}