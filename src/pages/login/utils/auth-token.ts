
interface AuthToken {
    id: string;
    sub: string;
    userId: string;
    exp: number;
}

export default AuthToken;
