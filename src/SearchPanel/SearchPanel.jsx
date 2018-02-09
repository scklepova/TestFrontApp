import * as React from "react";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
import { RowStack, Fit } from "../layout";

export default class SearchPanel extends React.Component<> {
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

    render() {
        return (
            <RowStack baseline block gap={2}>
                <Fit>
                    <span>List</span>
                </Fit>
                <Fit>
                    <Input
                        value={this.state.inputValue}
                        onChange={e => this.setState({ inputValue: e.target.value })}
                    />
                </Fit>
                <Fit>
                    <Button onClick={() => this.handleAddButtonClick()}>Add</Button>
                </Fit>
            </RowStack>
        );
    }
}
