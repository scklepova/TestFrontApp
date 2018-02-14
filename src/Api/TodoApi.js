type TodoItem = {
    id: string,
    note: string,
    checked: boolean,
    editing: boolean,
};

export interface ITodoApi {
    getItems(): Promise<TodoItem[]>;
    addOrUpdateItem(item: TodoItem): Promise<void>;
    removeItem(id: string): Promise<void>;
    setItems(TodoItem[]): Promise<void>;
}

const itemsKey = "items";

export class TodoApi implements ITodoApi {
    async getItems(): Promise<TodoItem[]> {
        await this.delay(1000);
        if (Math.random() < 0.5) throw Error("oops");
        const items = JSON.parse(localStorage.getItem(itemsKey));
        return items ? items : [];
    }

    async addOrUpdateItem(item: TodoItem): Promise<void> {
        const readFromStorage = JSON.parse(localStorage.getItem(itemsKey));
        const items = readFromStorage ? readFromStorage : [];
        const index = items.findIndex(x => x.id === item.id);
        localStorage.setItem(
            itemsKey,
            JSON.stringify(
                index < 0 ? items.concat({ ...item }) : [...items.slice(0, index), item, ...items.slice(index + 1)]
            )
        );
    }

    async removeItem(id: string): Promise<void> {
        const items = JSON.parse(localStorage.getItem(itemsKey));
        const index = items.findIndex(x => x.id === id);
        if (index < 0) return;
        localStorage.setItem(
            this.item,
            JSON.stringify([...this.items.slice(0, index), ...this.items.slice(index + 1)])
        );
    }

    async setItems(newItems: TodoItem[]) {
        localStorage.setItem(itemsKey, JSON.stringify(newItems));
    }

    async delay(timeout: number): Promise<void> {
        return new Promise(f => setTimeout(f, timeout));
    }
}
