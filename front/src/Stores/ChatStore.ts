import {writable} from "svelte/store";

export const chatVisibilityStore = writable(false);
export const chatInputFocusStore = writable(false);

export const newChatMessageStore = writable<string|null>(null);

export enum ChatMessageTypes {
    text=1,
    me,
    userIncoming,
    userOutcoming,
}

export interface ChatMessage {
    type: ChatMessageTypes;
    date: Date;
    author?: string;
    visitCardUrl?: string;
    text?: string;
}

function createChatMessagesStore() {
    const { subscribe, update} = writable<ChatMessage[]>([]);

    return {
        subscribe,
        addIncomingUser(author: string) {
            update(list => {
                list.push({
                    type: ChatMessageTypes.userIncoming,
                    author: author,
                    date: new Date(),
                })
                return list;
            });
        },
        addOutcomingUser(author: string) {
            update(list => {
                list.push({
                    type: ChatMessageTypes.userOutcoming,
                    author: author,
                    date: new Date(),
                })
                return list;
            });
        },
        addPersonnalMessage(text:string) {
            newChatMessageStore.set(text);
            update(list => {
                list.push({
                    type: ChatMessageTypes.me,
                    text: text,
                    date: new Date(),
                })
                return list;
            });
        },
        addExternalMessage(author: string, text: string) {
            update(list => {
                list.push({
                    type: ChatMessageTypes.text,
                    text: text,
                    author: author,
                    date: new Date(),
                })
                return list;
            });
        },
    };
}
export const chatMessagesStore = createChatMessagesStore();