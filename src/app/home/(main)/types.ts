import { ReturnTypeWithoutPromise } from '@/types/return-type'
import { getUserLastFlights } from './actions'

export type lastFlights = ReturnTypeWithoutPromise<typeof getUserLastFlights>[0]
