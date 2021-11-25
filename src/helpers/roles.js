const roles = {
    admin: {
        levelAccess: 2
    },
    superAdmin: {
        levelAccess: 3
    },
    regular: {
        levelAccess: {
            levelAccess: 4
        }
    }
}

module.exports = roles