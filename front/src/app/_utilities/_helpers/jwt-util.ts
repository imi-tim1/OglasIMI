import { UserRole } from "../_api/_data-types/enums";

export class JWTUtil
{
    static localStorageKey: string = 'Json-Web-Token';

    static get(): string {
        const jwt = window.localStorage.getItem(this.localStorageKey)
        if (jwt == null)
            return '';
        
        return jwt;
    }

    static store(jwt: string | null) {
        window.localStorage.setItem(this.localStorageKey, (jwt == null)? '' : jwt);
    }

    static delete() {
        this.store('');
    }

    static decodePayload(jwt: string | null): JWT | null {
        if (jwt == null || jwt == '')
            return null;
            
        const payload = jwt.split('.')[1];    
        return JSON.parse(atob(payload));
    }

    static getPayload(): JWT | null {
        return this.decodePayload(this.get());
    }

    static getRole(): string {
        let g = this.getPayload();
        return (g == null)? '' : g.rol;
    }

    static getUserRole(): UserRole {
        return this.getRole() as UserRole;
    }

    static getID(): number {
        let g = this.getPayload();
        return (g == null)? 0 : g.uid;
    }

    static exists() {
        return this.get() !== '';
    }
}

interface JWT {
    exp: number;
    iss: string;
    rol: string;
    uid: number;
}
