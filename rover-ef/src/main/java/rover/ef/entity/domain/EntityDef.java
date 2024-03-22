package rover.ef.entity.domain;

import java.util.LinkedHashMap;

public record EntityDef(String name,
                        String table,
                        String idField,
                        String nameField,
                        LinkedHashMap<String, FieldDef> fieldDefs) {

    public FieldDef getFieldDef(String fieldName) {
        return fieldDefs.get(fieldName);
    }

    @Override
    public String toString() {
        return String.format("%s[%d]", name, fieldDefs.size());
    }
}
