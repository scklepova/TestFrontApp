// @flow
import * as React from 'react'

type ItemProps = {
    note: string,
    checked: bool,
    editing: bool,
    onChecked: (checked: bool) => void,
    onRemoved: (e: Event) => void,
    onValueChanged: (value: string) => void,
    onEdit: () => void,
    onCancelEdit: () => void,
}

type ItemState = {
    currentNote: string,
}

export default class Item extends React.Component<ItemProps, ItemState> {
    props: ItemProps;
    state: ItemState = {
        currentNote: this.props.note,
    }

    render() {
        const { checked, onChecked, note, editing, onValueChanged, onRemoved, onEdit, onCancelEdit } = this.props;
        return <div>
            <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                    onChecked(!checked);
                }} 
            />
            <input
                value={editing ? this.state.currentNote : note}
                disabled={editing == false}
                onChange={(e: SyntheticInputEvent<>) => { this.setState({currentNote: e.target.value}) }}
            />
            <button 
                hidden={editing == true} 
                    onClick={() => {
                        onEdit();
                        this.setState({currentNote: note})
                    }}>Edit
            </button>
            <button 
                hidden={editing == false} 
                onClick={() => onValueChanged(this.state.currentNote)}>Save</button>
            <button 
                hidden={editing == false} 
                onClick={() => {
                    onCancelEdit();
                    this.setState({currentNote: note});
                }}>Cancel 
            </button>
            <button hidden={editing == true} onClick={onRemoved}>x</button>
        </div>;
    }
}