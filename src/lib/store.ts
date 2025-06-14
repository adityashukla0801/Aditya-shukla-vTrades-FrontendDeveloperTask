import { writeFileSync, readFileSync, existsSync } from "fs";

const file = "data.json";

// Define a User interface
export interface User {
  email: string;
  password: string;
  name?: string;
  extra?: Record<string, unknown>;
}

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  writeFileSync(file, JSON.stringify(users, null, 2));
};

export const getUsers = (): User[] => {
  if (!existsSync(file)) return [];
  const content = readFileSync(file, "utf-8");
  return JSON.parse(content) as User[];
};

export const getUser = (email: string): User | undefined => {
  return getUsers().find((u) => u.email === email);
};
