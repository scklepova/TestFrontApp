import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Button } from "../src/Button/Button";

storiesOf("Button", module)
    .add("Default", () => <Button onClick={action("onClick")}>Click me!</Button>)
    .add("Disabled", () => (
        <Button disabled={true} onClick={action("onClick")}>
            Click me!
        </Button>
    ));
