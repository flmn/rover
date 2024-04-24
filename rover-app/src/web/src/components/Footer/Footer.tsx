import { ReactNode } from "react";
import { Flex } from "@mantine/core";
import classes from "./Footer.module.css";

interface FooterProps {
    children: ReactNode;
}

export function Footer(props: FooterProps) {
    return (
        <Flex align="center" gap="sm" className={classes.root}>
            {props.children}
        </Flex>
    );
}