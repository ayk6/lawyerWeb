//FUNCTIONS


// inital values
import {
    loginFormInitialValues, commentFormInitialValues, commentReplyFormInitialValues,
    editArticleFormInitialValues
} from "./initial-values/initial-values"

//VALIDATIONS
import {
    contactFormValidationSchema, loginFormValidationSchema, commentFormValidationSchema,
    commentReplyFormValidationSchema,
    editArticleFormValidationScema
} from "./validations/validation"


export const utils = {
    validations: {
        contactFormValidationSchema, loginFormValidationSchema, commentFormValidationSchema
        , commentReplyFormValidationSchema, editArticleFormValidationScema
    },
    initialValues: {
        loginFormInitialValues, commentFormInitialValues, commentReplyFormInitialValues,
        editArticleFormInitialValues
    },
}