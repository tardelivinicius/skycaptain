import { ReturnTypeWithoutPromise } from '@/types/return-type'
import { readUserData } from './actions'

export type User = ReturnTypeWithoutPromise<typeof readUserData>
