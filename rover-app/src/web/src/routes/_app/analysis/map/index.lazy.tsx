import { createLazyFileRoute } from "@tanstack/react-router"
import { Container, Flex } from "@mantine/core";
import { Viewer } from "resium";
import { Ion } from "cesium";
import "@/styles/cesium.css"
import classes from "./index.lazy.module.css";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNTFlNTBjZS1lZWE4LTRkNzgtODU4OC04YzA0NDAzYjBhNTMiLCJpZCI6MjExNDIwLCJpYXQiOjE3MTQwOTY1MzR9.PsCe_5K4hXtw9n6Sar-93uVdlIE4B_8vrWY8tKPKbNs';

const Map = () => {
    return (
        <Container fluid p={0}>
            <Flex id="cesium-container" className={classes.map}>
                <Viewer animation={false}
                        baseLayerPicker={false}
                        fullscreenButton={false}
                        geocoder={false}
                        homeButton={false}
                        infoBox={true}
                        navigationHelpButton={false}
                        sceneModePicker={false}
                        timeline={true}/>
            </Flex>
        </Container>
    );
}

export const Route = createLazyFileRoute('/_app/analysis/map/')({
    component: Map,
})