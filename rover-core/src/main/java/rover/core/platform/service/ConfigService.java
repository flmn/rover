package rover.core.platform.service;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.NumberUtils;
import org.springframework.util.StringUtils;
import rover.core.platform.entity.ConfigEntity;
import rover.core.platform.repository.ConfigRepository;

import java.util.List;

@Service
@CacheConfig(cacheNames = "configs")
public class ConfigService {
    private final ConfigRepository configRepository;

    public ConfigService(ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public List<ConfigEntity> list() {
        return configRepository.findAll(Sort.by("id"));
    }

    public String getString(String id) {
        var opt = configRepository.findById(id);

        return opt.map(ConfigEntity::getValue).orElse(null);
    }

    public String getString(String id, String defaultValue) {
        var value = getString(id);

        return value == null ? defaultValue : value;
    }

    public Integer getInteger(String id) {
        var value = getString(id);

        if (!StringUtils.hasText(value)) {
            return null;
        }

        try {
            return NumberUtils.parseNumber(value, Integer.class);
        } catch (Exception ignored) {
            return null;
        }
    }

    public int getInteger(String id, int defaultValue) {
        var value = getInteger(id);

        return value == null ? defaultValue : value;
    }

    public ConfigEntity update(String id, Object value) {
        var opt = configRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        ConfigEntity entity = opt.get();
        entity.setValue(convertToString(value));

        return configRepository.save(entity);
    }

    private String convertToString(Object value) {
        if (value == null) {
            return "";
        }

        if (value instanceof String string) {
            return string;
        } else if (value instanceof Integer integer) {
            return integer.toString();
        } else {
            return "";
        }
    }
}
