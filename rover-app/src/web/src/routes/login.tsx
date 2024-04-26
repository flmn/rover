import { createFileRoute } from "@tanstack/react-router";
import { Alert, Anchor, Box, Button, Card, Group, PasswordInput, Space, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconInfoCircle, IconLogin2 } from "@tabler/icons-react";
import { z } from "zod";
import { useLoginMutation } from "@/hooks";
import { LoginRequestDTO } from "@/types";
import classes from "./login.module.css";

const schema = z.object({
    email: z.string().email({message: '非法电子邮件'}),
    password: z.string().min(6, {message: '非法密码'}),
});

const Login = () => {
    const form = useForm<LoginRequestDTO>({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(schema),
    });

    const {mutateAsync: login, isPending, isError} = useLoginMutation();

    return (
        <Box className={classes.wrapper}>
            <Title order={1} fw="bolder">登录</Title>
            <Box w={400}>
                <Card withBorder shadow="md" p={30} mt={20} radius="md">
                    <form onSubmit={form.onSubmit((loginRequest: LoginRequestDTO) => login(loginRequest))}>
                        <TextInput required
                                   label="电子邮件"
                                   placeholder="test@example.com"
                                   key={form.key('email')}
                                   {...form.getInputProps('email')} />
                        <PasswordInput required
                                       label="密码"
                                       placeholder="你的密码"
                                       mt="md"
                                       key={form.key('password')}
                                       {...form.getInputProps('password')} />
                        <Group mt="md" justify="end">
                            <Anchor size="sm" href="/">
                                忘记密码？
                            </Anchor>
                        </Group>
                        {isError &&
                            <Alert variant="light" color="pink" title="错误" icon={<IconInfoCircle/>} mt="xs" p="xs">
                                邮件或密码不匹配。
                            </Alert>}
                        <Button fullWidth mt="xl" type="submit"
                                leftSection={<IconLogin2 size="1.2rem"/>}
                                loading={isPending}>登录</Button>
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
