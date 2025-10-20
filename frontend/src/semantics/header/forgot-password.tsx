import { FormProvider, useForm } from "react-hook-form"
import { FormInputM } from "./six-form-input"
import { fogotZod, type TfogotZod } from "./seven-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

type OnSubmitType = {
    success: boolean; 
    message: string; 
    userId: string;
};

export const ForgotPasswordM = () => {

    const navigate = useNavigate();

    const form = useForm<TfogotZod>({

        resolver: zodResolver(fogotZod),
        
        defaultValues: {
            email: '',
        },

    });

    const onSubmit = async (data: TfogotZod) => {
        const trimData = {
            email: data.email.trim(),
        };

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/forgotPassword`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trimData),
            });

            const result: OnSubmitType = await response.json();

            if(!response.ok){
                return toast.error('Неверный E-Mail', {icon: '❌'});
            };

            localStorage.setItem('userId', result.userId);
            localStorage.setItem('verifyType', 'forgot_password');

            toast.success('Отправили код вам на почту', {icon: '✅'});

            setTimeout(() => {
                navigate("/confirmPassword");
            }, 1000);
            
        } catch(error: unknown){
            const err = error instanceof Error 
                ? error.message
                    ? error.message
                    : "Что-то пошло не так"
                : 'Что-то пошло не так';
            toast.error(err, { icon: '❌'});
        }
    };



    return(
        <main>

            <section>
                <article>
                    <h3>Сбросьте свой пароль</h3>
                    <p>Введите подтверждённый адрес электронной почты</p>
                    <p>вашей учётной записи, и мы отправим вам пароль</p>
                    <p>для востоновления пароля.</p>
                </article>

                <FormProvider {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="flex flex-col gap-4"
                    >

                        <FormInputM name="email" label="E-Mail" required/>

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