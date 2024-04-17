import { ReturnTypeWithoutPromise } from '@/types/return-type'
import { getUserPreferences } from './actions'

export type UserPreference = ReturnTypeWithoutPromise<typeof getUserPreferences>
