export const categories = [
    { id: 1, name: 'Công nghệ', status: 1 },
    { id: 2, name: 'Thể thao', status: 1 },
    { id: 3, name: 'Giải trí', status: 0 },
];

export const news = [
    {
        id: 1,
        title: 'React 19 ra mắt',
        content: 'Nội dung bài viết về React 19...',
        categoryId: 1,
        createdBy: 'Admin',
        status: 1,
    },
    {
        id: 2,
        title: 'World Cup 2026 sắp diễn ra',
        content: 'Nội dung bài viết về World Cup...',
        categoryId: 2,
        createdBy: 'Admin',
        status: 1,
    },
];

export const users = [
    { id: 1, username: 'admin01', password: '123456', role: 1, status: 1 },
    { id: 2, username: 'staff01', password: '123456', role: 2, status: 1 },
];