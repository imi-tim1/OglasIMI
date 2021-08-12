export class JWTUtil
{
    static localStorageKey: string = 'Json-Web-Token';

    static get(): string {
        const jwt = window.localStorage.getItem(this.localStorageKey)
        if (jwt == null)
            return '';
        
        return jwt;
    }

    static store(jwt: string) {
        window.localStorage.setItem(this.localStorageKey, jwt);
    }

    static delete() {
        this.store('');
    }

    static decodePayload(jwt: string | null) {
        if (jwt == null || jwt == '')
            return {};
            
        const payload = jwt.split('.')[1];    
        return JSON.parse(btoa(payload));
    }

    static getPayload() {
        return this.decodePayload(this.get());
    }
}
