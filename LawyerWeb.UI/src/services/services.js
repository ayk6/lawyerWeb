import { login, getUser } from "./user/userService";
import { encryptedLocalStorage } from "./encrypt-storage/encrypt-storage";
import { authHeader } from "./auth-header/auth-header";
import { deleteArticle, getArticleById, getArticles, getArticlesByCategoryId, insertArticle, updateArticle } from "./article/article-service";
import { deleteCommentById, getCommentByArticleId, getCommentById, getComments, postComment, updateComment } from "./comment/comment-service";
import { deleteCategory, getCategories, insertCategory, updateCategory } from "./category/category-service";


export const services = {
    user: {
        login,
        getUser,
    },
    category: {
        getCategories,
        deleteCategory,
        insertCategory,
        updateCategory
    },
    article: {
        getArticles,
        getArticleById,
        getArticlesByCategoryId,
        deleteArticle,
        insertArticle,
        updateArticle
    },
    comment: {
        getComments,
        getCommentByArticleId,
        postComment,
        deleteCommentById,
        getCommentById,
        updateComment
    },
    encryptedLocalStorage,
    authHeader
}