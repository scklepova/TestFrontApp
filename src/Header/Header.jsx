import * as React from "react";
import cn from "./Header.less";

type HeaderProps = {
    text: string,
}

export default class Header extends React.Component<HeaderProps> {
    render() {
        return <div className={cn("root")}>{this.props.text}</div>;
    }
}
