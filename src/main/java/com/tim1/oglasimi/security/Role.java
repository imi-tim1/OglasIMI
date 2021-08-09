package com.tim1.oglasimi.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

public enum Role {
    APPLICANT,
    EMPLOYER,
    ADMIN;

    private static final Logger LOGGER = LoggerFactory.getLogger(Role.class);

    /**
     * Proverava da li se dati tip korisnickog naloga nalazi u listi autorizovanih naloga za pristup odredjenom resursu
     * @param authorizedRoles lista autorizovanih naloga
     * @return vraca HTTP status kod 200 (OK) ukoliko jeste autorizovan, u suprotnom vraca 403 (Forbidden)
     * @see Role#equalsTo(Object)
     */
    public HttpStatus checkAuthorization( Role[] authorizedRoles ) {
        for (Role role : authorizedRoles) {
            if (this.equalsTo(role)) {
                LOGGER.info("checkAuthorization | user is authorized");
                return HttpStatus.OK;
            }
        }

        LOGGER.info("checkAuthorization | user is not authorized");
        return HttpStatus.FORBIDDEN;
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
            String thisRole = this.toString().toLowerCase();
            String roleParam = role.toString().toLowerCase();

            LOGGER.debug("equalsTo | (thisRole, roleParam) : ({},{})", thisRole, roleParam);
            LOGGER.debug("equalsTo | result: {}", 0 == thisRole.compareTo( roleParam ) );

            return 0 == thisRole.compareTo( roleParam );
        }

        return false;
    }
}
