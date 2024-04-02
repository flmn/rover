package rover.ef.util;

import rover.ef.entity.domain.DataType;
import rover.ef.entity.domain.FieldDef;

import java.util.LinkedHashMap;

public final class FieldHelper {

    private FieldHelper() {
    }

    public static void addId(LinkedHashMap<String, FieldDef> defs, int naturalOrder) {
        var def = new FieldDef("ID",
                "id",
                DataType.STRING_SHORT,
                36,
                0,
                "",
                true,
                true,
                naturalOrder);

        defs.put(def.name(), def);
    }

    public static void addCreatedAt(LinkedHashMap<String, FieldDef> defs, int naturalOrder) {
        var def = new FieldDef("CreatedAt",
                "created_at",
                DataType.TIMESTAMP,
                0,
                0,
                "",
                false,
                false,
                naturalOrder);

        defs.put(def.name(), def);
    }

    public static void addUpdatedAt(LinkedHashMap<String, FieldDef> defs, int naturalOrder) {
        var def = new FieldDef("UpdatedAt",
                "updated_at",
                DataType.TIMESTAMP,
                0,
                0,
                "null",
                false,
                false,
                naturalOrder);

        defs.put(def.name(), def);
    }

    public static void addIsDeleted(LinkedHashMap<String, FieldDef> defs, int naturalOrder) {
        var def = new FieldDef("IsDeleted",
                "is_deleted",
                DataType.BOOLEAN,
                0,
                0,
                "false",
                false,
                false,
                naturalOrder);

        defs.put(def.name(), def);
    }

    public static void addDeletedAt(LinkedHashMap<String, FieldDef> defs, int naturalOrder) {
        var def = new FieldDef("DeletedAt",
                "deleted_at",
                DataType.TIMESTAMP,
                0,
                0,
                "null",
                false,
                false,
                naturalOrder);

        defs.put(def.name(), def);
    }
}
