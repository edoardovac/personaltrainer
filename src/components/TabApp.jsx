import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Home from "./Home";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";

function TabApp() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <>
        <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="HOME" />
                <Tab value="two" label="CUSTOMERS" />
                <Tab value="three" label="TRAININGS" />
            </Tabs>
            {value === 'one' && <Home />}
            {value === 'two' && <Customerlist />}
            {value === 'three' && <Traininglist />}
        </>
    )
}

export default TabApp;