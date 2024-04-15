import { ReturnTypeWithoutPromise } from '@/types/return-type'
import { checkUserPreferences } from './actions'

export type UserPreferences = ReturnTypeWithoutPromise<typeof checkUserPreferences>[0]
