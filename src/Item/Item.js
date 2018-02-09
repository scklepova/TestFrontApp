// @flow
import * as React from "react";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
import Checkbox from "retail-ui/components/Checkbox";
import Kebab from "retail-ui/components/Kebab";
import KebabItem from "../KebabItem/KebabItem";
import { RowStack, Fit, Fill, Fixed } from "../layout";
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
        const { checked, onClick, note, editing, onValueChanged, onRemoved, onEdit, onCancelEdit } = this.props;
        return (
            <div>
                <RowStack className={cn("item")}>
                    <Fit>
                        <label onClick={() => onClick()} className={cn("note", { toggled: checked })}>
                            {note}
                        </label>
                    </Fit>
                    <Fit>
                        <Kebab className={cn("kebab")}>
                            <KebabItem
                                hidden={editing === true}
                                iconName="ok"
                                text="Toggle"
                                onClick={() => {
                                    onClick();
                                }}
                            />
                            <KebabItem
                                hidden={editing === true}
                                iconName="edit"
                                text="Edit"
                                onClick={() => {
                                    onEdit();
                                    this.setState({ currentNote: note });
                                }}
                            />
                            <KebabItem
                                hidden={editing === false}
                                text="Save"
                                onClick={() => onValueChanged(this.state.currentNote)}
                            />
                            <KebabItem
                                hidden={editing === false}
                                text="Cancel"
                                iconName=""
                                onClick={() => {
                                    onCancelEdit();
                                    this.setState({ currentNote: note });
                                }}
                            />
                            <KebabItem hidden={editing === true} iconName="trash" text="Delete" onClick={onRemoved} />
                        </Kebab>
                    </Fit>
                </RowStack>
            </div>
        );
    }

    renderEditingItem(): React.Node {
        const { editing, note, onClick, onEdit, onCancelEdit, onValueChanged, onRemoved } = this.props;
        return (
            <div>
                <Input
                    value={editing ? this.state.currentNote : note}
                    disabled={editing === false}
                    onChange={(e: SyntheticInputEvent<>) => {
                        this.setState({ currentNote: e.target.value });
                    }}
                />
                <Kebab>
                    <KebabItem
                        hidden={editing === true}
                        iconName="ok"
                        text="Toggle"
                        onClick={() => {
                            onClick();
                        }}
                    />
                    <KebabItem
                        hidden={editing === true}
                        iconName="edit"
                        text="Edit"
                        onClick={() => {
                            onEdit();
                            this.setState({ currentNote: note });
                        }}
                    />
                    <KebabItem
                        hidden={editing === false}
                        text="Save"
                        onClick={() => onValueChanged(this.state.currentNote)}
                    />
                    <KebabItem
                        hidden={editing === false}
                        text="Cancel"
                        iconName=""
                        onClick={() => {
                            onCancelEdit();
                            this.setState({ currentNote: note });
                        }}
                    />
                    <KebabItem hidden={editing === true} iconName="trash" text="Delete" onClick={onRemoved} />
                </Kebab>
            </div>
        );
    }

    render(): React.Node {
        const { checked, onClick, note, editing, onValueChanged, onRemoved, onEdit, onCancelEdit } = this.props;
        let item;
        if (editing === true) {
            item = this.renderEditingItem();
        } else item = this.renderReadonlyItem();
        return <div className={cn("root")}>{item}</div>;
    }
}
