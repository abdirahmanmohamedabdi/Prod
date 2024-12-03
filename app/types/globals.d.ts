export {}

// Create a type for the roles
export type Roles = 'SuperAdmin' | 'Finance' | 'Hr'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}