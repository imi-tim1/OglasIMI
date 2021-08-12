import { HttpHeaders } from "@angular/common/http";

export interface StandardHeaders
{
    'Json-Web-Token': string;
}


class C extends HttpHeaders {
    
}