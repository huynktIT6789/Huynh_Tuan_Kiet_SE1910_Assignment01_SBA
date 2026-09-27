function Sidebar({ activePage, onSelectPage }) {
    const menuItems = [
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'category', label: 'Category' },
        { key: 'news', label: 'News' },
        { key: 'users', label: 'Users' },
        { key: 'settings', label: 'Settings' },
    ];

    return (
        <div className="bg-light border-end vh-100" style={{ width: '220px' }}>
            <ul className="nav flex-column p-2">
                {menuItems.map((item) => (
                    <li className="nav-item" key={item.key}>
                        <button
                            className={`btn w-100 text-start mb-1 ${
                                activePage === item.key ? 'btn-primary' : 'btn-light'
                            }`}
                            onClick={() => onSelectPage(item.key)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;