import * as React from "react";
import cn from "./KebabItem.less";
import Icon from "retail-ui/components/Icon";

type KebabItemProps = {
    text: string,
    disabled: boolean,
    onClick: void,
    hidden: boolean,
    iconName?: string,
};

export default class KebabItem extends React.Component<KebabItemProps> {
    render() {
        const { text, disabled, hidden, iconName, onClick } = this.props;
        const icon = iconName ? <Icon name={iconName} /> : "";
        return (
            <div
                className={cn("root")}
                disabled={disabled}
                hidden={hidden}
                onClick={e => {
                    onClick();
                    e.stopPropagation();
                }}>
                {icon}
                {text}
            </div>
        );
    }
}
