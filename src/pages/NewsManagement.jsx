import { useState } from 'react';
import { news as initialNews, categories } from '../data/mockData';

function NewsManagement() {
    const [newsList, setNewsList] = useState(initialNews);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryId: categories[0]?.id || '',
        status: 1,
    });
    const [formError, setFormError] = useState('');

    const [mode, setMode] = useState('create');
    const [selectedNews, setSelectedNews] = useState(null);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [newsToDelete, setNewsToDelete] = useState(null);

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleOpenAddModal = () => {
        setMode('create');
        setSelectedNews(null);
        setFormData({
            title: '',
            content: '',
            categoryId: categories[0]?.id || '',
            status: 1,
        });
        setFormError('');
        setShowModal(true);
    };

    const handleOpenEditModal = (item) => {
        setMode('update');
        setSelectedNews(item);
        setFormData({
            title: item.title,
            content: item.content,
            categoryId: item.categoryId,
            status: item.status,
        });
        setFormError('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        if (!formData.title.trim()) {
            setFormError('Tiêu đề không được để trống');
            return;
        }

        if (mode === 'create') {
            const newId =
                newsList.length > 0
                    ? Math.max(...newsList.map((n) => n.id)) + 1
                    : 1;

            const newItem = {
                id: newId,
                title: formData.title,
                content: formData.content,
                categoryId: Number(formData.categoryId),
                createdBy: 'Admin',
                status: formData.status,
            };

            setNewsList([...newsList, newItem]);
        } else {
            setNewsList(
                newsList.map((item) =>
                    item.id === selectedNews.id
                        ? {
                            ...item,
                            title: formData.title,
                            content: formData.content,
                            categoryId: Number(formData.categoryId),
                            status: formData.status,
                        }
                        : item
                )
            );
        }

        setShowModal(false);
    };

    const handleOpenDeleteConfirm = (item) => {
        setNewsToDelete(item);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setNewsToDelete(null);
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        setNewsList(newsList.filter((item) => item.id !== newsToDelete.id));
        setNewsToDelete(null);
        setShowDeleteConfirm(false);
    };

    // Hàm phụ: tìm tên category theo categoryId (để hiển thị tên thay vì số)
    const getCategoryName = (categoryId) => {
        const found = categories.find((cat) => cat.id === categoryId);
        return found ? found.name : 'Không xác định';
    };

    const displayedNews = newsList.filter((item) =>
        item.title.toLowerCase().includes(searchKeyword.trim().toLowerCase())
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>News Management</h3>
                <button className="btn btn-primary" onClick={handleOpenAddModal}>
                    + Add News
                </button>
            </div>

            <div className="mb-3 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                    placeholder="Tìm theo tiêu đề..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                {searchKeyword && (
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setSearchKeyword('')}
                    >
                        Clear
                    </button>
                )}
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {displayedNews.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="text-center">
                            Không tìm thấy bài viết nào
                        </td>
                    </tr>
                ) : (
                    displayedNews.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{getCategoryName(item.categoryId)}</td>
                            <td>{item.createdBy}</td>
                            <td>{item.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleOpenEditModal(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleOpenDeleteConfirm(item)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {showModal && (
                <div
                    className="modal d-block"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>{mode === 'create' ? 'Add News' : 'Update News'}</h5>

                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Content</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    value={formData.categoryId}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            categoryId: e.target.value,
                                        })
                                    }
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: Number(e.target.value),
                                        })
                                    }
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div>

                            {formError && (
                                <div className="alert alert-danger py-1">{formError}</div>
                            )}

                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div
                    className="modal d-block"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Xác nhận xóa</h5>
                            <p>
                                Bạn có chắc muốn xóa bài viết{' '}
                                <strong>{newsToDelete?.title}</strong> không?
                            </p>
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleCancelDelete}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleConfirmDelete}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewsManagement;