import { useState } from 'react';
import { categories as initialCategories } from '../data/mockData';

function CategoryManagement() {
    const [categories, setCategories] = useState(initialCategories);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', status: 1 });
    const [formError, setFormError] = useState('');

    const [mode, setMode] = useState('create');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // MỚI: state riêng cho ô tìm kiếm
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleOpenAddModal = () => {
        setMode('create');
        setSelectedCategory(null);
        setFormData({ name: '', status: 1 });
        setFormError('');
        setShowModal(true);
    };

    const handleOpenEditModal = (category) => {
        setMode('update');
        setSelectedCategory(category);
        setFormData({ name: category.name, status: category.status });
        setFormError('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        if (!formData.name.trim()) {
            setFormError('Tên category không được để trống');
            return;
        }

        if (mode === 'create') {
            const newId =
                categories.length > 0
                    ? Math.max(...categories.map((c) => c.id)) + 1
                    : 1;

            const newCategory = {
                id: newId,
                name: formData.name,
                status: formData.status,
            };

            setCategories([...categories, newCategory]);
        } else {
            setCategories(
                categories.map((cat) =>
                    cat.id === selectedCategory.id
                        ? { ...cat, name: formData.name, status: formData.status }
                        : cat
                )
            );
        }

        setShowModal(false);
    };

    const handleOpenDeleteConfirm = (category) => {
        setCategoryToDelete(category);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setCategoryToDelete(null);
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        setCategories(
            categories.filter((cat) => cat.id !== categoryToDelete.id)
        );
        setCategoryToDelete(null);
        setShowDeleteConfirm(false);
    };

    // MỚI: tạo ra danh sách ĐÃ LỌC để hiển thị, KHÔNG đụng vào "categories" gốc
    const displayedCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchKeyword.trim().toLowerCase())
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Category Management</h3>
                <button className="btn btn-primary" onClick={handleOpenAddModal}>
                    + Add Category
                </button>
            </div>

            {/* MỚI: ô tìm kiếm */}
            <div className="mb-3 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: '300px' }}
                    placeholder="Tìm theo tên category..."
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
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* MỚI: dùng displayedCategories thay vì categories */}
                {displayedCategories.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="text-center">
                            Không tìm thấy category nào
                        </td>
                    </tr>
                ) : (
                    displayedCategories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>{cat.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleOpenEditModal(cat)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleOpenDeleteConfirm(cat)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {/* POPUP ADD/EDIT */}
            {showModal && (
                <div
                    className="modal d-block"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>{mode === 'create' ? 'Add Category' : 'Update Category'}</h5>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
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

            {/* POPUP CONFIRM DELETE */}
            {showDeleteConfirm && (
                <div
                    className="modal d-block"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Xác nhận xóa</h5>
                            <p>
                                Bạn có chắc muốn xóa category{' '}
                                <strong>{categoryToDelete?.name}</strong> không?
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

export default CategoryManagement;