export default {
  authors: [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Smith',
    },
  ],
  folders: [
    {
      id: 1,
      name: 'Home',
      createdAt: '2023-01-01T00:00:00Z',
      authorId: 1,
    },
    {
      id: 2,
      name: 'Work',
      createdAt: '2023-01-02T00:00:00Z',
      authorId: 1,
    },
    {
      id: 3,
      name: 'Personal',
      createdAt: '2023-01-03T00:00:00Z',
      authorId: 2,
    },
  ],
}