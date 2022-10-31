class UsersRepository {
    constructor() {
        this.dbUsers = new Map();
    }

    async auth(user, password) {
        const users = [...this.dbUsers.values()].filter(u => u.user === user);
        if (users.length > 0) {
            throw new String(`${user} already registered`);
        }
    
        const token = `t0-${password}-k&n`;
        this.dbUsers.set(token, {user, password});
    
        return token;
    }

    async get(token) {
        try {
            const { user } = this.dbUsers.get(token);
            return user;
        } catch {
            return null;
        }
    }
}

const usersRepository = new UsersRepository();
module.exports = usersRepository;