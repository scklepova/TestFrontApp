// @flow
import * as React from "react";
import cn from "./Button.less";

type ButtonProps = {
    onClick: () => void,
    disabled?: boolean,
    children: React.Node,
};

export function Button({ disabled, onClick, children }: ButtonProps): React.Node {
    return (
        <button className={cn("root", { disabled: disabled })} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}
