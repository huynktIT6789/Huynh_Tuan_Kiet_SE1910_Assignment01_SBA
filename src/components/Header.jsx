function Header({ onLogout }) {
    return (
        <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
            <span className="navbar-brand mb-0 h1">FUNews Management System</span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                Đăng xuất
            </button>
        </nav>
    );
}

export default Header;