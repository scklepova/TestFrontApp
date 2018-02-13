// @flow
import * as React from "react";
import { ColumnStack, RowStack, Fit } from "../layout";
import Item from "../Item/Item";
import Button from "retail-ui/components/Button";
import Input from "retail-ui/components/Input";
import Tabs from "retail-ui/components/Tabs";
import Loader from "retail-ui/components/Loader";
import cn from "./TodoList.less";
import { TodoApi, ITodoApi } from "../Api/TodoApi";

type ListProps = {};

const all = "all";
const checked = "checked";
const unchecked = "unchecked";

type FilterType = typeof all | typeof checked | typeof unchecked;

type ListState = {
    items: Array<ItemState>,
    inputValue: string,
    filter: FilterType,
    api: ITodoApi,
    loading: boolean,
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
        api: new TodoApi(),
        loading: false,
    };

    changeItem(id: string, changeFunc: (item: ItemState) => ItemState) {
        const index = this.state.items.findIndex(elem => elem.id === id);
        const updatedItem = changeFunc(this.state.items[index]);
        this.state.api.addOrUpdateItem(updatedItem);
        this.setState({
            items: [...this.state.items.slice(0, index), updatedItem, ...this.state.items.slice(index + 1)],
        });
    }

    handleAddButtonClick() {
        if (!this.state.inputValue) return;
        const newItem = {
            note: this.state.inputValue,
            checked: false,
            editing: false,
            id: Date.now().toString(),
        };
        this.state.api.addOrUpdateItem(newItem);
        this.setState({ items: [...this.state.items, newItem], inputValue: "" });
    }

    handleItemRemoved(id: string) {
        const index = this.state.items.findIndex(elem => elem.id === id);
        this.state.api.removeItem(id);
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
        this.state.api.setItems(notCompletedItems);
        this.setState({ items: notCompletedItems });
    }

    updateItems() {
        this.setState({ loading: true });
        this.state.api.getItems().then(items => this.setState({ items: items, loading: false }));
    }

    componentWillMount() {
        this.updateItems();

        setInterval(_ => {
            this.updateItems();
        }, 20000);
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
                onClick={() => this.handleItemChecked(value.id, !value.checked)}
                onValueChanged={newNote => this.handleItemChanged(value.id, newNote)}
                onEdit={() => this.handleEditItem(value.id)}
                onCancelEdit={() => this.handleCancelEdit(value.id)}
            />
        ));

        return (
            <div>
                <div>
                    <h1 className={cn("header")}>Things to do</h1>
                    <Loader type="big" active={this.state.loading}>
                        <ColumnStack horizontalAlign="center" className={cn("body")}>
                            <Fit>
                                <div>
                                    <RowStack baseline block gap={0}>
                                        <Fit className={cn("new-item")}>
                                            <Input
                                                value={this.state.inputValue || ""}
                                                placeholder="What to do"
                                                onKeyUp={e => {
                                                    if (e.keyCode === 13) this.handleAddButtonClick();
                                                }}
                                                onChange={(e, value) =>
                                                    this.setState({
                                                        inputValue: value,
                                                    })
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
                                </div>
                            </Fit>
                            <Fit>
                                <div
                                    className={cn("buttons-row", {
                                        hidden: this.state.items.length === 0,
                                    })}>
                                    <Tabs
                                        value={this.state.filter}
                                        onChange={(_, value: FilterType) => this.setState({ filter: value })}>
                                        <Tabs.Tab id={all}>
                                            <label className={cn("tab-label")}>All</label>
                                        </Tabs.Tab>
                                        <Tabs.Tab id={unchecked}>
                                            <label className={cn("tab-label")}>Active</label>
                                        </Tabs.Tab>
                                        <Tabs.Tab id={checked}>
                                            <label className={cn("tab-label")}>Completed</label>
                                        </Tabs.Tab>
                                    </Tabs>
                                </div>
                            </Fit>
                            <Fit>
                                <div className={cn("list")}>{list}</div>
                            </Fit>
                            <Fit>
                                <div
                                    className={cn("clear-completed", {
                                        hidden: !this.state.items.some(x => x.checked),
                                    })}
                                    onClick={() => this.handleClearCompleted()}>
                                    Clear completed
                                </div>
                            </Fit>
                        </ColumnStack>
                    </Loader>
                </div>
            </div>
        );
    }
}
