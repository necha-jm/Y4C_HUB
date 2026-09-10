export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (user && user.password === password) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    async register(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role || 'member'
        };

        const createdUser = await this.userRepository.create(newUser);
        const { password, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;
    }

    async logout() {
        return true;
    }
}
