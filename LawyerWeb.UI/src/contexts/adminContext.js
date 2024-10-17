import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [sidebarShow, setSidebarShow] = useState(true);
    const [unfoldable, setUnfoldable] = useState(false);
    const [articles, setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [commentToEdit, setCommentToEdit] = useState(null)


    return (
        <AdminContext.Provider value={{
            sidebarShow, setSidebarShow, unfoldable, setUnfoldable,
            articles, setArticles, selectedCategory, setSelectedCategory,
            selectedArticle, setSelectedArticle,
            commentToEdit, setCommentToEdit
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
