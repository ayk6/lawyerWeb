import * as Yup from 'yup';

// contact form
export const contactFormValidationSchema = Yup.object({
    name: Yup.string()
        .required("Lütfen adınızı girin"),
    email: Yup.string()
        .email("Geçersiz e-posta adresi")
        .required("Lütfen e-posta adresinizi girin"),
    phone: Yup.string()
        .required("Lütfen telefon numaranızı girin"),
    message: Yup.string()
        .required("Lütfen mesajınızı girin"),
});

// LOGIN FORM
export const loginFormValidationSchema = Yup.object({
    username: Yup.string()
        .required("Kullanıcı adı girin"),
    password: Yup.string()
        .required("Şifre girin")
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .max(50, "Şifre en fazla 50 karakter olmalıdır")
});

// COMMENT 
export const commentFormValidationSchema = Yup.object({
    commentText: Yup.string().required('Yorum gereklidir'),
    userName: Yup.string().required('Adınız gereklidir'),
    userMobileNo: Yup.string().required('Telefon numaranız gereklidir'),
});

export const commentReplyFormValidationSchema = Yup.object({
    commentText: Yup.string().required('Yorum gereklidir')
});

//ADMİN ARTİCLE
export const editArticleFormValidationScema = Yup.object({
    title: Yup.string()
        .trim()
        .required('Başlık zorunludur.'),
    content: Yup.string()
        .trim()
        .required('İçerik zorunludur.'),
    writer: Yup.string()
        .trim()
        .required('İçerik zorunludur.'),
    categoryGuid: Yup.number()
        .required('Kategori seçilmelidir.')
});