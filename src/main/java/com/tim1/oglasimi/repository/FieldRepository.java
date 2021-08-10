package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.model.Tag;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldRepository extends CRUDRepository<Field, Integer>
{
    List<Tag> getTagList(int id);
}
