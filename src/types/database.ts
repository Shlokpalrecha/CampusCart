export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'student' | 'admin'
export type ListingStatus = 'active' | 'sold' | 'expired'
export type ListingCategory = 'furniture' | 'books' | 'electronics' | 'misc'

export interface Database {
  public: {
    Tables: {
      campuses: {
        Row: {
          id: string
          name: string
          code: string
          email_domains: string[]
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          email_domains: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          email_domains?: string[]
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          campus_id: string | null
          role: UserRole
          created_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          campus_id?: string | null
          role?: UserRole
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          campus_id?: string | null
          role?: UserRole
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          category: ListingCategory
          campus_id: string
          residence: string | null
          created_by: string
          status: ListingStatus
          leaving_soon: boolean
          expires_at: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          category: ListingCategory
          campus_id: string
          residence?: string | null
          created_by: string
          status?: ListingStatus
          leaving_soon?: boolean
          expires_at?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          category?: ListingCategory
          campus_id?: string
          residence?: string | null
          created_by?: string
          status?: ListingStatus
          leaving_soon?: boolean
          expires_at?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          listing_id: string
          sender_id: string
          receiver_id: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          sender_id: string
          receiver_id: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          sender_id?: string
          receiver_id?: string
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type Campus = Database['public']['Tables']['campuses']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Listing = Database['public']['Tables']['listings']['Row']
export type Message = Database['public']['Tables']['messages']['Row']

export type ListingWithUser = Listing & {
  users: Pick<User, 'name' | 'email'>
}
