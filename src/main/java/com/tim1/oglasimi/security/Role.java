package com.tim1.oglasimi.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import java.util.List;

public enum Role {
    VISITOR,
    APPLICANT,
    EMPLOYER,
    ADMIN;

    private static final Logger LOGGER = LoggerFactory.getLogger(Role.class);

    /**
     * Proverava da li se dati tip korisnickog naloga nalazi u listi autorizovanih naloga za pristup odredjenom resursu
     * @param authorizedRoles lista autorizovanih naloga
     * @return vraca HTTP status kod 200 (OK) ukoliko jeste autorizovan, u suprotnom vraca 401 (Unauthorized)
     * @see Role#equalsTo(Object)
     */
    public HttpStatus checkAuthorization(List<Role> authorizedRoles ) {
        for (Role role : authorizedRoles) {
            if (this.equalsTo(role)) {
                LOGGER.info("checkAuthorization | user is authorized");
                return HttpStatus.OK;
            }
        }

        LOGGER.info("checkAuthorization | user is not authorized");
        return HttpStatus.UNAUTHORIZED;
    }

    /**
     * Proverava da li je objekat instanca tipa {@link Role} ili tipa {@link String} i ukolik jeste proverava
     * da li je njegova String reprezentacija jednaka String reprezentaciji objektu tipa Role ciji je metod pozvan
     *
     * @param role objekat za koji se proverava da li je jednak objektu ciji je metod pozvan
     * @return vraca true ukoliko su njihove String reprezentacije jednake, u suprotnom vraca false
     * @see Role
     * @see String
     */
    public boolean equalsTo( Object role ) {

        if( role instanceof Role || role instanceof String ) {
            LOGGER.debug("equalsTo | (roleParam, thisRole) : ({},{})", role,this);
            LOGGER.debug("equalsTo | result: {}",
                    0 == this.toString().compareTo(role.toString() ) );

            return 0 == this.toString().compareTo(role.toString() ) ;
        }

        return false;
    }
}
