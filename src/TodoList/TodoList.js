// @flow
import * as React from "react";
import { ColumnStack, RowStack, Fit, Fill, Fixed } from "../layout";
import Item from "../Item";
import Button from "retail-ui/components/Button";
import { Button as MyButton } from "../Button/Button";
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
        if (this.state.inputValue !== "") {
            this.setState({
                items: [
                    ...this.state.items,
                    { note: this.state.inputValue, checked: false, editing: false, id: Date.now().toString() },
                ],
                inputValue: "",
            });
        }
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
            <Item
                key={value.id}
                note={value.note}
                checked={value.checked}
                editing={value.editing}
                onRemoved={() => this.handleItemRemoved(value.id)}
                onChecked={x => this.handleItemChecked(value.id, x)}
                onValueChanged={newNote => this.handleItemChanged(value.id, newNote)}
                onEdit={() => this.handleEditItem(value.id)}
                onCancelEdit={() => this.handleCancelEdit(value.id)}
            />
        ));

        return (
            <div>
                <div className={cn("first-row")}>
                    <ColumnStack stretch>
                        <Fit>
                            <RowStack baseline block gap={2}>
                                <Fit>
                                    <span>List</span>
                                </Fit>
                                <Fit>
                                    <input
                                        value={this.state.inputValue}
                                        onChange={(e: SyntheticInputEvent<>) =>
                                            this.setState({ inputValue: e.target.value })
                                        }
                                    />
                                </Fit>
                                <Fit>
                                    <button onClick={() => this.handleAddButtonClick()}>Add</button>
                                </Fit>
                            </RowStack>
                        </Fit>
                        <Fit>{list}</Fit>
                        <Fit>
                            <MyButton
                                disabled={this.state.filter === all}
                                onClick={() => {
                                    this.setState({ filter: all });
                                }}>
                                All
                            </MyButton>

                            <MyButton
                                disabled={this.state.filter === unchecked}
                                onClick={() => {
                                    this.setState({ filter: unchecked });
                                }}>
                                Active
                            </MyButton>

                            <Button
                                disabled={this.state.filter === checked}
                                onClick={() => {
                                    this.setState({ filter: checked });
                                }}>
                                Completed
                            </Button>
                        </Fit>
                    </ColumnStack>
                </div>

                <button onClick={() => this.handleClearCompleted()}>Clear all completed</button>
            </div>
        );
    }
}
