import { HttpHeaders } from "@angular/common/http";
import { JWT_HEADER_NAME } from "../_api/_data-types/vars";
import { JWTUtil } from "./jwt-util";

export class HeaderUtil 
{
    static jwtOnlyHeaders(): HttpHeaders
    {
        let obj: { [key: string]: string } = {};
        obj[JWT_HEADER_NAME] = JWTUtil.get();
        
        return new HttpHeaders(obj);
    }

    // static jwtOnlyHeaders(jwt: string): HttpHeaders
    // {
    //     let obj: { [key: string]: string } = {};
    //     obj[JWT_HEADER_NAME] = jwt;
        
    //     return new HttpHeaders(obj);
    // }
}

export class ParamUtil {
    static toString(params: any) {
        return params.join(',')
    }
}