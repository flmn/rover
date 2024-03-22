package rover.ef.domain;

import java.util.LinkedHashMap;

public record EntityDef(String name,
                        String table,
                        String idField,
                        String nameField,
                        LinkedHashMap<String, FieldDef> fieldDefs) {

    @Override
    public String toString() {
        return String.format("%s[%d]", name, fieldDefs.size());
    }
}
