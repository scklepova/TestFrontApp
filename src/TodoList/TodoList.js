// @flow
import * as React from "react";
import { ColumnStack, RowStack, Fit, Fill } from "../layout";
import Item from "../Item/Item";
import Button from "retail-ui/components/Button";
import Input from "retail-ui/components/Input/Input";
import cn from "./TodoList.less";

type ListProps = {};

const all = "all";
const checked = "checked";
const unchecked = "unchecked";

type FilterType = typeof all | typeof checked | typeof unchecked;

type ListState = {
    items: Array<ItemState>,
    inputValue: string,
    filter: FilterType,
};

type ItemState = {
    note: string,
    checked: boolean,
    editing: boolean,
    id: string,
};

export default class TodoList extends React.Component<ListProps, ListState> {
    props: ListProps;
    state: ListState = {
        items: [],
        inputValue: "",
        filter: all,
    };

    changeItem(id: string, changeFunc: (item: ItemState) => ItemState) {
        const index = this.state.items.findIndex(elem => elem.id === id);
        this.setState({
            items: [
                ...this.state.items.slice(0, index),
                changeFunc(this.state.items[index]),
                ...this.state.items.slice(index + 1),
            ],
        });
    }

    handleAddButtonClick() {
        if (!this.state.inputValue) return;
        this.setState({
            items: [
                ...this.state.items,
                { note: this.state.inputValue, checked: false, editing: false, id: Date.now().toString() },
            ],
            inputValue: "",
        });
    }

    handleItemRemoved(id: string) {
        const index = this.state.items.findIndex(elem => elem.id === id);
        this.setState({
            items: [...this.state.items.slice(0, index), ...this.state.items.slice(index + 1)],
        });
    }

    handleItemChecked(id: string, checked: boolean) {
        this.changeItem(id, item => {
            return { ...item, checked: checked };
        });
    }

    handleItemChanged(id: string, newNote: string) {
        this.changeItem(id, item => {
            return { ...item, note: newNote, editing: false };
        });
    }

    handleEditItem(id: string) {
        if (this.state.items.some(item => item.editing)) return;
        this.changeItem(id, item => {
            return { ...item, editing: true };
        });
    }

    handleCancelEdit(id: string) {
        this.changeItem(id, item => {
            return { ...item, editing: false };
        });
    }

    handleClearCompleted() {
        const notCompletedItems = [...this.state.items].filter(item => !item.checked);
        this.setState({ items: notCompletedItems });
    }

    render(): React.Node {
        const items = [...this.state.items];
        const currentItems =
            this.state.filter !== all
                ? items.filter(value => value.checked === (this.state.filter === checked))
                : items;
        const list = currentItems.map(value => (
            <Fit>
                <Item
                    key={value.id}
                    note={value.note}
                    checked={value.checked}
                    editing={value.editing}
                    onRemoved={() => this.handleItemRemoved(value.id)}
                    onClick={() => this.handleItemChecked(value.id, !value.checked)}
                    onValueChanged={newNote => this.handleItemChanged(value.id, newNote)}
                    onEdit={() => this.handleEditItem(value.id)}
                    onCancelEdit={() => this.handleCancelEdit(value.id)}
                />
            </Fit>
        ));

        return (
            <div>
                <div className={cn("first-row")}>
                    <ColumnStack stretch>
                        <Fit>
                            <h1>Things to do</h1>
                        </Fit>
                        <Fit>
                            <RowStack baseline block gap={0}>
                                <Fit>
                                    <Input
                                        value={this.state.inputValue}
                                        placeholder="What to do"
                                        onKeyUp={(e: SyntheticKeyboardEvent<>) => {
                                            if (e.keyCode === 13) this.handleAddButtonClick();
                                        }}
                                        onChange={(e: SyntheticInputEvent<>) =>
                                            this.setState({ inputValue: e.target.value })
                                        }
                                    />
                                </Fit>
                                <Fit>
                                    <Button
                                        disabled={!this.state.inputValue}
                                        onClick={() => this.handleAddButtonClick()}>
                                        + Add
                                    </Button>
                                </Fit>
                            </RowStack>
                        </Fit>
                        {list}
                        <Fit>
                            <div className={cn("buttons-row")}>
                                <div
                                    className={cn("buttons-item", { "chosen-filter": this.state.filter === all })}
                                    disabled={this.state.filter === all}
                                    onClick={() => {
                                        this.setState({ filter: all });
                                    }}>
                                    All
                                </div>
                                <div
                                    className={cn("buttons-item", { "chosen-filter": this.state.filter === unchecked })}
                                    disabled={this.state.filter === unchecked}
                                    onClick={() => {
                                        this.setState({ filter: unchecked });
                                    }}>
                                    Active
                                </div>

                                <div
                                    className={cn("buttons-item", { "chosen-filter": this.state.filter === checked })}
                                    disabled={this.state.filter === checked}
                                    onClick={() => {
                                        this.setState({ filter: checked });
                                    }}>
                                    Completed
                                </div>

                                <div
                                    hidden={this.state.filter !== checked}
                                    className={cn("buttons-item")}
                                    onClick={() => this.handleClearCompleted()}>
                                    Clear completed
                                </div>
                            </div>
                        </Fit>
                    </ColumnStack>
                </div>
            </div>
        );
    }
}
