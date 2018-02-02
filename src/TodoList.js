// @flow
import React from 'react'
import Item from './Item'

type ListProps = {};

type ListState = {
    items: Array<*>,
    inputValue: string,
    currentTypeOfItems: string,
};

export default class TodoList extends React.Component {
    props: ListProps;
    state: ListState = {
        items: [],
        inputValue: "",
        currentTypeOfItems: "all"
    };

    handleAddButtonClick() {
        if (this.state.inputValue !== "") {
            var key = Date.now();
            var newItems = {...this.state.items, [key]: { note: this.state.inputValue, checked: false, editing: false, globalNumber: key }};
            this.setState({ items: newItems, inputValue: "" });
        }
    }

    handleItemRemoved(globalNumber: number) {
        var newItems = {...this.state.items};
        delete newItems[globalNumber];
        this.setState({ items: newItems });
    }

    handleItemChecked(globalNumber, c: bool) {
        var states = {...this.state.items};
        states[globalNumber].checked = c;
        this.setState({ items: states });
    }

    handleItemChanged(globalNumber: number, newNote: string) {
        var states = {...this.state.items};
        states[globalNumber].note = newNote;
        states[globalNumber].editing = false;
        this.setState({ items: states });
    }

    handleEditItem(globalNumber: number) {
        var states = {...this.state.items};
        if(Object.keys(states).map(key => states[key]).some(item => item.editing))
            return;
        states[globalNumber].editing = true;
        this.setState({ items: states });
    }

    handleCancelEdit(globalNumber: number) {
        var states = {...this.state.items};
        states[globalNumber].editing = false;
        this.setState({ items: states });
    }

    handleClearCompleted() {
        var notCompletedItems = {...this.state.items};
        Object.keys(notCompletedItems).forEach(key => 
            {     
                if(notCompletedItems[key].checked)
                    delete notCompletedItems[key];
            });
        this.setState({ items: notCompletedItems });
    }

    render() {
        const all = "all", checked = "checked", unchecked = "unchecked";
        var items = Object.keys(this.state.items).map((key) => this.state.items[key]);
        var currentItems = this.state.currentTypeOfItems != all
            ? items.filter((value) => value.checked == (this.state.currentTypeOfItems == checked))
            : items;
        var list = currentItems.map((value) => 
            <Item
                key={value.globalNumber}
                note={value.note}
                checked={value.checked}
                editing = {value.editing}
                onRemoved={() => this.handleItemRemoved(value.globalNumber)}
                onChecked={c => this.handleItemChecked(value.globalNumber, c)}
                onValueChanged={newNote => this.handleItemChanged(value.globalNumber, newNote)}
                onEdit={() => this.handleEditItem(value.globalNumber)}
                onCancelEdit={() => this.handleCancelEdit(value.globalNumber)}
        />);

        return <div>List
            <input
                value={this.state.inputValue}
                onChange={(e) => this.setState({ inputValue: e.target.value })}
            />
            <button onClick={() => this.handleAddButtonClick()}>Add</button>
            {list}
            <div>
                <button disabled={this.state.currentTypeOfItems == all} onClick={() => { 
                    this.setState({ currentTypeOfItems: all })
                }}>All</button>

                <button disabled={this.state.currentTypeOfItems == unchecked} onClick={() => {
                    this.setState({ currentTypeOfItems: unchecked })
                }}>Active</button>

                <button disabled={this.state.currentTypeOfItems == checked} onClick={() => {
                    this.setState({ currentTypeOfItems: checked })
                }}>Completed</button>
            </div>
            <button onClick={() => this.handleClearCompleted()}>
                Clear all completed
            </button>
        </div>
    }
}