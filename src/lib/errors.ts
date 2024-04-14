import { AuthError } from 'next-auth';

export class CouldNotParseError extends AuthError {}

export class MemberNotFoundError extends AuthError {}

export class MemberNotActiveError extends AuthError {}

export class InvalidPasswordError extends AuthError {}
