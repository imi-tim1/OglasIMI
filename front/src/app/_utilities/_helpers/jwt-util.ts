class JWTUtil
{
    decodeJWT(jwt: string): string[] {
        let decoded: string[] = jwt.split('.');
        return [decoded[0], decoded[1]];
    }
}
