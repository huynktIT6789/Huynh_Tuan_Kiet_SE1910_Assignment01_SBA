import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CategoryManagement from '../pages/CategoryManagement'; // ← dòng này có chưa?
import NewsManagement from '../pages/NewsManagement';

function AdminLayout({ onLogout }) {
    const [activePage, setActivePage] = useState('dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <h3>Đây là Dashboard</h3>;
            case 'category':
                return <CategoryManagement />; // ← dòng này đã đổi chưa, hay vẫn còn <h3>Đây là Category Management</h3> ?
            case 'news':
                return <NewsManagement />;
            case 'users':
                return <h3>Đây là Users Management</h3>;
            case 'settings':
                return <h3>Đây là Settings</h3>;
            default:
                return null;
        }
    };

    return (
        <div>
            <Header onLogout={onLogout} />
            <div className="d-flex">
                <Sidebar activePage={activePage} onSelectPage={setActivePage} />
                <div className="flex-grow-1 p-4">{renderContent()}</div>
            </div>
        </div>
    );
}

export default AdminLayout;