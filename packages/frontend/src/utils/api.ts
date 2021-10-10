export const Actions = {
  LOGIN: "login",
  GUARD: "guard",
  STOP: "stop",
  STATUS: "status",
};

export type ResponseType = {
  running?: boolean;
  statusMsg?: string;
  steamGuardRequired?: boolean;
  error?: string;
};

export type ActionType = {
  action: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type SteamGuardType = LoginType & {
  steamGuard?: string;
};

export type ErrorType = {
  error: string;
};

const url = process.env.REACT_APP_URL || "";

export type RequestType = ActionType & (LoginType | SteamGuardType);

export function makeApiCall(data: RequestType | ActionType) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  return new Promise((resolve: (value: ResponseType) => void, reject) => {
    fetch(url, {
      mode: "cors",
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status === 200) return response.json();
        reject(await response.text());
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
