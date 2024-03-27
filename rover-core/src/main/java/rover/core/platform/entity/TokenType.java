package rover.core.platform.entity;

public enum TokenType {
    ACCESS_TOKEN(1, "ACCESS_TOKEN");

    public final int value;
    public final String text;

    TokenType(int value, String text) {
        this.value = value;
        this.text = text;
    }
}
