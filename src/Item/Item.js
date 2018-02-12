// @flow
import * as React from "react";
import Input from "retail-ui/components/Input";
import Kebab from "retail-ui/components/Kebab";
import MenuItem from "retail-ui/components/MenuItem";
import { RowStack, Fit } from "../layout";
import cn from "./Item.less";

type ItemProps = {
    note: string,
    checked: boolean,
    editing: boolean,
    onClick: () => void,
    onRemoved: (e: Event) => void,
    onValueChanged: (value: string) => void,
    onEdit: () => void,
    onCancelEdit: () => void,
};

type ItemState = {
    currentNote: string,
};

export default class Item extends React.Component<ItemProps, ItemState> {
    props: ItemProps;
    state: ItemState = {
        currentNote: this.props.note,
    };

    renderReadonlyItem(): React.Node {
        const { checked, onClick, note, onRemoved, onEdit } = this.props;
        return (
            <div onDoubleClick={() => onEdit()} onClick={() => onClick()}>
                <RowStack className={cn("item")}>
                    <Fit>
                        <label className={cn("note", { toggled: checked })}>{note}</label>
                    </Fit>
                    <Fit>
                        <div onClick={(e: SyntheticEvent<>) => e.stopPropagation()}>
                            <Kebab className={cn("kebab")}>
                                <MenuItem icon="ok" onClick={onClick}>
                                    Toggle
                                </MenuItem>
                                <MenuItem
                                    icon="edit"
                                    onClick={() => {
                                        onEdit();
                                        this.setState({ currentNote: note });
                                    }}>
                                    Edit
                                </MenuItem>
                                <MenuItem icon="trash" onClick={onRemoved}>
                                    Delete
                                </MenuItem>
                            </Kebab>
                        </div>
                    </Fit>
                </RowStack>
            </div>
        );
    }

    renderEditingItem(): React.Node {
        const { editing, note, onCancelEdit, onValueChanged } = this.props;
        return (
            <div>
                <Input
                    value={editing ? this.state.currentNote : note}
                    disabled={editing === false}
                    autoFocus
                    onBlur={() => onValueChanged(this.state.currentNote)}
                    onKeyUp={(e: SyntheticKeyboardEvent<>) => {
                        if (e.keyCode === 27) {
                            onCancelEdit();
                            this.setState({ currentNote: note });
                        }
                        if (e.keyCode === 13) {
                            onValueChanged(this.state.currentNote);
                        }
                    }}
                    onChange={(e: SyntheticInputEvent<>) => {
                        this.setState({ currentNote: e.target.value });
                    }}
                />
            </div>
        );
    }

    render(): React.Node {
        const { editing } = this.props;
        let item;
        if (editing === true) {
            item = this.renderEditingItem();
        } else item = this.renderReadonlyItem();
        return <div className={cn("root")}>{item}</div>;
    }
}
