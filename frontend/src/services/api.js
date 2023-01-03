import { Directus } from "@directus/sdk"

// Create a new Directus instance
export const directus = new Directus('https://t33jmpij.directus.app')

// Login to Directus
export const login = async () => {
    return await directus.auth.login({
        email: 'adminuser@admin.com',
        password: 'admin'
    })
}

// Logout of Directus
export const logout = async () => {
    return await directus.auth.logout()
}