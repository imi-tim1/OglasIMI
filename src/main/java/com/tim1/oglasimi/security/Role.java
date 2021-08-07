package com.tim1.oglasimi.security;

import org.springframework.http.HttpStatus;

import java.util.List;

import static com.tim1.oglasimi.OglasimiApplication.LOGGER;

public enum Role {
    VISITOR,
    APPLICANT,
    EMPLOYER,
    ADMIN;

    public HttpStatus checkAuthorization(List<Role> authorizedRoles ) {
        for (Role role : authorizedRoles) {
            if (this.equalsTo(role)) {
                LOGGER.debug("Role.checkAuthorization | user is authorized");
                return HttpStatus.OK;
            }
        }

        LOGGER.debug("Role.checkAuthorization | user is not authorized");
        return HttpStatus.UNAUTHORIZED;
    }

    public boolean equalsTo( Object role ) {

        if( role instanceof Role || role instanceof String ) {
            LOGGER.debug("Role.equalsTo | (roleParam, thisRole) : ({},{})", role,this);
            LOGGER.debug("Role.equalsTo | result: {}",
                    0 == this.toString().compareTo(role.toString() ) );

            return 0 == this.toString().compareTo(role.toString() ) ;
        }

        return false;
    }
}
