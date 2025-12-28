import { User } from '@/types/database'

// Mock user for development - bypasses auth
export const mockUser: User = {
  id: 'mock-user-123',
  name: 'Test Student',
  email: 'test@spit.ac.in',
  campus_id: 'mock-campus-spit',
  role: 'student',
  created_at: new Date().toISOString(),
}

export const mockCampus = {
  id: 'mock-campus-spit',
  name: 'SPIT Mumbai',
  code: 'spit',
  email_domains: ['spit.ac.in'],
  created_at: new Date().toISOString(),
}
