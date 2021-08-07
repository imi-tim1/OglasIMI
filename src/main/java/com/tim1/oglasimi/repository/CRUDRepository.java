package com.tim1.oglasimi.repository;

import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface CRUDRepository<T,ID>
{
    List<T> getAll();

    boolean create(T t);

    T get(ID id);

    boolean update(T t, ID id);

    boolean delete(ID id);
}
