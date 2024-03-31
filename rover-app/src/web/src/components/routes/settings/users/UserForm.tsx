import { Button, PasswordInput, Space, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export function UserForm() {
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

    async function save(values: any) {
        console.log(values);
    }

    return (
        <form onSubmit={form.onSubmit(save)}>
            <Stack justify="space-between">
                <Stack>
                    <TextInput required
                               label="电子邮件"
                               placeholder="test@example.com"
                               {...form.getInputProps('email')} />
                    <PasswordInput required
                                   label="密码"
                                   placeholder="你的密码"
                                   mt="md"
                                   {...form.getInputProps('password')} />
                    <Switch defaultChecked label="是否激活" size="md" mt="md"/>
                    <Switch label="是否锁定" size="md" mt="md"/>
                </Stack>
                <Space/>
                <Stack>
                    <Button fullWidth type="submit">保存</Button>
                </Stack>
            </Stack>
        </form>
    );
}
