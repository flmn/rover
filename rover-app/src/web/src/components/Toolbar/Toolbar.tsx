import { ReactNode } from "react";
import { Flex } from "@mantine/core";
import classes from "./Toolbar.module.css";


interface ToolbarProps {
    children: ReactNode;
}

export function Toolbar(props: ToolbarProps) {
    return (
        <Flex align="center" gap="sm" mb="sm" className={classes.root}>
            {props.children}
        </Flex>
    );
}