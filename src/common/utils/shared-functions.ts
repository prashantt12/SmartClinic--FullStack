import * as bcrypt from 'bcrypt';

export function hashPassword(password:string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
}