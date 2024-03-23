import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
    Alert,
    Anchor,
    Box,
    Button,
    Card,
    Checkbox,
    Group,
    PasswordInput,
    Space,
    TextInput,
    Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from './login.module.css';

const Page = () => {
    const [failed, setFailed] = useState(false);
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : '非法电子邮件'),
            password: (value) => (value.length < 6 ? '非法密码' : null),
        },
    });

    async function login(values: any) {
        setFailed(false);

        console.log(values)
    }

    return (
        <Box className={classes.wrapper}>
            <Title order={1} fw="bolder">登录</Title>
            <Box w={400}>
                <Card withBorder shadow="md" p={30} mt={20} radius="md">
                    {failed && <Alert variant="light" color="pink" title="错误" icon={<IconInfoCircle/>} mb="sm">
                        邮件或密码不匹配。
                    </Alert>}
                    <form onSubmit={form.onSubmit(login)}>
                        <TextInput required
                                   label="电子邮件"
                                   placeholder="test@example.com"
                                   {...form.getInputProps('email')} />
                        <PasswordInput required
                                       label="密码"
                                       placeholder="Your password"
                                       mt="md"
                                       {...form.getInputProps('password')} />
                        <Group mt="md" justify="space-between">
                            <Checkbox label="自动登录"
                                      {...form.getInputProps('rememberMe', {type: 'checkbox'})} />
                            <Anchor size="sm" href="/">
                                忘记密码？
                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl" type="submit">登录</Button>
                    </form>
                </Card>
                <Space h="xl"/>
                <Space h="xl"/>
            </Box>
        </Box>
    );
}

export const Route = createFileRoute('/login')({
    component: Page,
})
