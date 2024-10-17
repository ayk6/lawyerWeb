import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/homePage/homePage'
import AboutPage from '../pages/aboutPage/aboutPage'
import BlogPage from '../pages/blogPage/blogPage'
import ContactPage from '../pages/contactPage'
import TeamPage from '../pages/teamPage/teamPage'
import CorporatePage from '../pages/corporatePage/corporatePage'
import ArticlePage from '../pages/articlePage/articlePage'
import NotFoundPage from '../pages/notFoundPage/notFoundPage'
import AdminLayout from '../layouts/admin/layout'
import CommonLayout from '../layouts/common/layout'
import LoginPage from '../pages/loginPage/loginPage'
import AdminDashboard from '../pages/admin/dashboardPage/dashboard'
import AdminCategories from '../pages/admin/categoriesPage/admin-categories'
import TryPage from '../pages/admin/tryPage/tryPage'
import AdminArticles from '../pages/admin/articlesPage/admin-articles'
import InsertArticle from '../pages/admin/insertArticlePage/insert-article'
import EditArticle from '../pages/admin/editArticlePage/edit-article'
import ArticleDetail from '../pages/admin/articleDetailPage/article-detail'
import AdminComments from '../pages/admin/commentsPage/admin-comments'
import EditCommentPage from '../pages/admin/editCommentPage/admin-editcomment'


const router = createBrowserRouter([
    {
        path: "/",
        element: <CommonLayout />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "team",
                element: <TeamPage />
            },
            {
                path: "blog",
                element: <BlogPage />
            },
            {
                path: "blog/:articleTitle",
                element: <ArticlePage />
            },
            /*{
                path: "career",
                element: <CareerPage />
            },*/
            {
                path: "contact",
                element: <ContactPage />
            },
            {
                path: "corporate",
                element: <CorporatePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <AdminDashboard />
            },
            {
                path: "categories",
                element: <AdminCategories />
            },
            {
                path: "articles",
                element: <AdminArticles />
            },
            {
                path: "insertarticle",
                element: <InsertArticle />
            },
            {
                path: "editarticle",
                element: <EditArticle />
            },
            {
                path: "articledetail",
                element: <ArticleDetail />
            },
            {
                path: "comments",
                element: <AdminComments />
            },
            {
                path: "editcomment",
                element: <EditCommentPage />
            },
            {
                path: "try",
                element: <TryPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    },
])

export default router