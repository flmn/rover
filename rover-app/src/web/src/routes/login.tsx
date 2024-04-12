import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Anchor, Box, Button, Card, Group, PasswordInput, Space, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconLogin2 } from "@tabler/icons-react";
import { login } from "@/auth";
import classes from './login.module.css';

const Login = () => {
    const navigate = useNavigate()
    const [failed, setFailed] = useState(false);
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : '非法电子邮件'),
            password: (value) => (value.length < 6 ? '非法密码' : null),
        },
    });

    async function doLogin(values: any) {
        setFailed(false);

        let ok = await login(values)

        if (ok) {
            await navigate({to: '/'})
        } else {
            setFailed(true);
        }
    }

    return (
        <Box className={classes.wrapper}>
            <Title order={1} fw="bolder">登录</Title>
            <Box w={400}>
                <Card withBorder shadow="md" p={30} mt={20} radius="md">
                    <form onSubmit={form.onSubmit(doLogin)}>
                        <TextInput required
                                   label="电子邮件"
                                   placeholder="test@example.com"
                                   {...form.getInputProps('email')} />
                        <PasswordInput required
                                       label="密码"
                                       placeholder="你的密码"
                                       mt="md"
                                       {...form.getInputProps('password')} />
                        <Group mt="md" justify="end">
                            <Anchor size="sm" href="/">
                                忘记密码？
                            </Anchor>
                        </Group>
                        {failed &&
                            <Alert variant="light" color="pink" title="错误" icon={<IconInfoCircle/>} mt="xs" p="xs">
                                邮件或密码不匹配。
                            </Alert>}
                        <Button fullWidth mt="xl" type="submit"
                                leftSection={<IconLogin2 size="1.2rem"/>}>登录</Button>
                    </form>
                </Card>
                <Space h="xl"/>
                <Space h="xl"/>
            </Box>
        </Box>
    );
}

export const Route = createFileRoute('/login')({
    component: Login,
})
