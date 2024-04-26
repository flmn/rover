import { Box, Button, Center, Checkbox, Flex, Group, Loader, Stack } from "@mantine/core";
import { usePrivilegesQuery } from "@/hooks";
import classes from "./PrivilegeSelect.module.css";

export function PrivilegeSelect() {
    const {data, isLoading} = usePrivilegesQuery();

    if (isLoading) {
        return (
            <Center w="100%">
                <Loader/>
            </Center>
        );
    }

    const privileges = data ?? [];

    const items = privileges.map((l1, i1) => {
        return (
            <Group key={i1} align="stretch" gap={0} pl="sm" className={classes.privileges}>
                <Stack p={0} py="xs" w="9rem" justify="center" className={classes.l1}>
                    <Checkbox label={l1.name}/>
                </Stack>
                <Stack flex={1} gap="sm" pb="sm">
                    {l1.children && l1.children.map((l2, i2) => {
                        return (
                            <Group pl="sm" pt="sm" key={i2} className={classes.l2}>
                                <Box w="9rem">
                                    <Checkbox label={l2.name}/>
                                </Box>
                                <Group flex={1}>
                                    {l2.children && l2.children.map((l3, i3) => {
                                        return (
                                            <Checkbox label={l3.name} value={l3.id} key={i3}/>
                                        );
                                    })}
                                </Group>
                            </Group>
                        );
                    })}
                </Stack>
            </Group>
        );
    });

    return (
        <Stack gap={0} my="xs">
            <Flex justify="end" align="center" gap="sm" mb="xs">
                <Button variant="default">重置</Button>
                <Button>保存权限设置</Button>
            </Flex>
            {items}
        </Stack>
    );
}
