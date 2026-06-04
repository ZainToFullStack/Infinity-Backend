// utils/tokenBlacklist.js - ADD THIS METHOD
class TokenBlacklist {
    constructor() {
        this.blacklist = new Map();
    }

    add(token, expiresAt) {
        this.blacklist.set(token, expiresAt);
        console.log(`🔒 Token blacklisted until: ${new Date(expiresAt).toLocaleString()}`);
    }

    isBlacklisted(token) {
        if (!this.blacklist.has(token)) return false;
        const expiresAt = this.blacklist.get(token);
        if (Date.now() > expiresAt) {
            this.blacklist.delete(token);
            return false;
        }
        return true;
    }

    cleanup() {
        const now = Date.now();
        for (const [token, expiresAt] of this.blacklist.entries()) {
            if (now > expiresAt) {
                this.blacklist.delete(token);
            }
        }
    }

    // ✅ ADD THIS - FIXES THE ERROR
    size() {
        return this.blacklist.size;
    }
}

const tokenBlacklist = new TokenBlacklist();
export default tokenBlacklist;