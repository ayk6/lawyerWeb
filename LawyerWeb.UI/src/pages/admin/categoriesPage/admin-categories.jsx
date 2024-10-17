import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../../services/services';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner';
import { Button, Container, Row, Col, Alert, FormControl, Form, Modal } from 'react-bootstrap';
import { CTable, CTableBody, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTableHead } from '@coreui/react';
import './admin-categories.scss';
import { FiPlusCircle } from 'react-icons/fi';
import { useAdminContext } from '../../../contexts/adminContext';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState({ guid: null, name: '' });
    const [newCategoryName, setNewCategoryName] = useState({ name: '' });
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const inputRef = useRef(null);
    const { setSelectedCategory, setSelectedArticle } = useAdminContext();

    const getCategories = async () => {
        try {
            setLoadingCategories(true);
            const data = await services.category.getCategories();
            setCategories(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        getCategories();
        setSelectedArticle(null);
        setSelectedCategory(null);
    }, []);

    useEffect(() => {
        if (editingCategoryId !== null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingCategoryId]);

    const handleDelete = async () => {
        try {
            setLoadingCategories(true);
            await services.category.deleteCategory(categoryToDelete);
            getCategories();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCategories(false);
            setCategoryToDelete(null)
            setShowDeleteModal(false);
        }
    };

    const startEditing = (category) => {
        setEditingCategoryId(category.guid);
        setEditCategoryName(category);
    };

    const handleSaveEdit = async () => {
        if (!editCategoryName.name) {
            alert("Kategori ismi boş olamaz!");
            cancelEditing();
            return;
        }
        if (!editCategoryName.name.trim()) {
            alert("Kategori ismi boş olamaz!");
            cancelEditing();
            return;
        }
        console.log(editCategoryName);
        try {
            setLoadingCategories(true);
            editCategoryName.name = editCategoryName.name.trim();
            await services.category.updateCategory(editCategoryName);
            getCategories();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCategories(false);
            cancelEditing();
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.name) {
            alert("Kategori ismi boş olamaz!");
            setShowAddModal(false);
            setNewCategoryName('');
            return;
        } else if (!newCategoryName.name.trim()) {
            alert("Kategori ismi boş olamaz!");
            setShowAddModal(false);
            setNewCategoryName('');
            return;
        }
        try {
            setLoadingCategories(true);
            newCategoryName.name = newCategoryName.name.trim();
            await services.category.insertCategory(newCategoryName);
            getCategories();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCategories(false);
            setShowAddModal(false);
            setNewCategoryName('');
        }
    };

    const cancelEditing = () => {
        setEditingCategoryId(null);
        setEditCategoryName({ guid: null, name: '' });
    };

    return (
        <Container className='admin-categories-container'>
            <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <CModalHeader>
                    <CModalTitle>Kategoriyi Sil</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </CModalBody>
                <CModalFooter>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Vazgeç</Button>
                    <Button variant="danger" onClick={handleDelete}>Sil</Button>
                </CModalFooter>
            </CModal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Kategori Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormControl
                            type="text"
                            placeholder="Kategori ismi"
                            value={newCategoryName.name}
                            onChange={(e) => setNewCategoryName({ ...newCategoryName, name: e.target.value })}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Vazgeç</Button>
                    <Button variant="primary" onClick={handleAddCategory}>Ekle</Button>
                </Modal.Footer>
            </Modal>

            <Row className="my-4">
                <Col>
                    <h1 className="text-center">Kategoriler</h1>
                </Col>
            </Row>
            {loadingCategories ? (
                <LoadingSpinner />
            ) : categories.length > 0 ? (
                <CTable className="table table-light table-hover table-striped table-bordered">
                    <CTableHead>
                        <tr>
                            <th style={{ width: '3%' }}>#</th>
                            <th style={{ width: '42%' }}>Kategori ismi</th>
                            <th style={{ width: '55%' }}>Seçenekler</th>
                        </tr>
                    </CTableHead>
                    <CTableBody>
                        {categories.sort((a, b) => a.name.localeCompare(b.name))
                            .map((category, index) => (
                                <tr key={category.guid}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {editingCategoryId === category.guid ? (
                                            <FormControl
                                                ref={inputRef}
                                                type="text"
                                                value={editCategoryName.name}
                                                onChange={(e) => setEditCategoryName({ guid: editingCategoryId, name: e.target.value })}
                                            />
                                        ) : (
                                            category.name
                                        )}
                                    </td>
                                    <td>
                                        {editingCategoryId === category.guid ? (
                                            <>
                                                <Button
                                                    variant="success"
                                                    onClick={handleSaveEdit}
                                                    className="me-2">
                                                    Kaydet
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={cancelEditing}>
                                                    Vazgeç
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => startEditing(category)}
                                                    className="me-2">
                                                    Düzenle
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => {
                                                        setCategoryToDelete(category.guid);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="me-2">
                                                    Sil
                                                </Button>
                                                <Link
                                                    to={`/admin/articles`}
                                                    key={category.guid}
                                                    onClick={() => setSelectedCategory(category.guid)}
                                                >
                                                    <Button variant="info">Makaleler</Button>
                                                </Link>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </CTableBody>
                </CTable>
            ) : (
                <Alert variant="info">Kategori bulunamadı.</Alert>
            )}
            <div className='insert-category'>
                <Button className="mt-4" onClick={() => setShowAddModal(true)}><FiPlusCircle /> Yeni Kategori Ekle</Button>
            </div>
        </Container>
    );
};

export default AdminCategories;
