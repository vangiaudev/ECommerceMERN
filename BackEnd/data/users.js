import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
      },
      {
        name: 'Nguyen Van Giau',
        email: 'vangiau.dev@gmail.com',
        password: bcrypt.hashSync('Gi@u06042001', 10),
        isAdmin: true,
      },
]

export default users