import z from "zod";

const emailZod = z.string()
.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Введите корректную почту' });

const passwordZod = z.string()
.min(8, { message: "Пароль должен содержать минимум 8 символов" })
.regex(/[A-Z]/, { message: "Пароль должен содержать хотя бы одну заглавную букву" })
.regex(/[0-9]/, { message: "Пароль должен содержать хотя бы одну цифру" })
.regex(/[a-z]/, { message: "Пароль должен содержать хотя бы одну строчную букву" })
.regex(/[!@#$%^&*()]/, { message: "Пароль должен содержать хотя бы один спецсимвол (!@#$%^&*())" })
.regex(/^[A-Za-z0-9!@#$%^&*()]+$/, { message: "Пароль может содержать только английские буквы, цифры и спецсимволы (!@#$%^&*())", });

const nameZod = z.string()
.min(2, { message: 'Имя должно содержать минимум 2 буквы' })
.regex(/^[А-ЯЁ][а-яё]+$/, { message: 'Имя должно начинаться с заглавной буквы и содержать только русские буквы' });

const passwordConfirmZod = z.string()
.min(6, { message: 'Пароль содержит 6 цифр'})
.max(6, { message: 'Пароль максииуи содержит 6 цифр'})
.regex(/^[0-9]+$/, { message: 'Пароль содержит только цифры'});






export const loginZod = z.object({
    email: emailZod,
    password: passwordZod,
})
.refine((data) => data.email.trim() !== '', {
    message: 'E-mail не может быть пустым',
    path: ['email'],
});







export const registerZod = z.object({
    email: emailZod,
    name: nameZod,
    password: passwordZod,
    confirmPassword: passwordZod,
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совподают',
    path: ['confirmPassword'],
})
.refine((data) => data.name.trim() !== '',{
    message: 'Имя не может быть пустым',
    path: ['name'],
})
.refine((data) => data.email.trim() !== '', {
    message: 'E-mail не может быть пустым',
    path: ['email'],
});







export const confirmZod = z.object({
    password: passwordConfirmZod,
});

export const fogotZod = z.object({
    email: emailZod,
});

export const newPassword = z.object({
    password: passwordZod,
    confirmPassword: passwordZod,
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совподают',
    path: ['confirmPassword'],
});


export const commentSchema = z.object({
  content: z.string().min(1, "Комментарий не может быть пустым"),
});


export type TloginZod = z.infer<typeof loginZod>;
export type TregisterZod = z.infer<typeof registerZod>;
export type TconfirmZod = z.infer<typeof confirmZod>;
export type TfogotZod = z.infer<typeof fogotZod>;
export type TnewPassword = z.infer<typeof newPassword>;
export type TcommentSchema = z.infer<typeof commentSchema>;