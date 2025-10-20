import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';

import { loginZod, type TloginZod } from "./seven-schemas";
import { FormInputM } from "./six-form-input";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const LoginM = () => {

    const navigate = useNavigate();

    const flagDialog = useAuthStore((state) => state.flagDialog);
    const setFlagDialog = useAuthStore((state) => state.setFlagDialog);

    const form = useForm<TloginZod>({
        resolver: zodResolver(loginZod),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TloginZod) => {

        const trimmedData = {
            email: data.email.trim(),
            password: data.password.trim(),
        };

        try{
            const reso = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trimmedData),
            });

            const data = await reso.json();

            if (!reso.ok || !data.success) {
                return toast.error(data.message || 'Неверный E-Mail или пароль', { icon: '❌' });
            }

            
            toast.success('Вы успешно вошли', {icon: '✅'});
            setFlagDialog(!flagDialog);
            

        } catch(error: unknown){
            const err = error instanceof Error 
                ? error.message
                    ? error.message
                    : "Что-то пошло не так"
                : "Что-то пошло не так";
            toast.error(err, { icon: '❌',});
        }
    };

    return(
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormInputM name="email" label="E-Mail" required />

                <div>

                    <div className="flex justify-between items-center">

                        <label className="text-sm font-medium">Password</label>

                        <button
                            type="button"
                            onClick={() => {
                                navigate("/forgotPassword");
                                setFlagDialog(false);
                            }}
                            className="text-sm text-blue-600 hover:underline"
                            >
                            Забыли пароль?
                        </button>

                    </div>

                    <FormInputM name="password" required />

                </div>


                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {form.formState.isSubmitting ? "Вход..." : "Войти"}
                </Button>

                <div className="flex items-center justify-center w-full my-4">
                    <div className="flex-grow border-t border-blue-500" />
                    <span className="mx-2 text-black text-sm">or</span>
                    <div className="flex-grow border-t border-blue-500" />
                </div>

                <div className="flex gap-1 justify-center">
                    <p>Впервые на сайте?</p>
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/register");
                            setFlagDialog(false);
                        }}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Создать учетную запись
                    </button>
                </div>

            </form>

        </FormProvider>
    )
}