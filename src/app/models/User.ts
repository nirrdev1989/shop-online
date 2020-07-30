export interface UserFirtFormStep {
    id: number
    email: string
    passwords: {
        password: string,
        confirmPassword: string
    },
    role: boolean
}

export interface UserSecondFormStep {
    city: string
    street: string
    name: string
    lastname: string
}

export interface UserLogInfo {
    name: string
    lastname: string
    isLog: boolean
    isAdmin: boolean
    city?: string
    strret?: string
}

export interface User {
    id: number
    email: string
    password: string
    street: string
    city: string
    name: string
    lastname: string
    role: boolean
}