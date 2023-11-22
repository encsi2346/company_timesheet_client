import TOKEN_STORE from "./token-store.ts";

export const tokenBroadcastChannel = new BroadcastChannel('auth_token_channel');

tokenBroadcastChannel.onmessage = (event: MessageEvent<string>) => {
    TOKEN_STORE.ACCESS_TOKEN = event.data;
};

export const sendAuthToken = (token: string) => {
    tokenBroadcastChannel.postMessage(token);
};
