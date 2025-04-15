export interface LogEntryType {
  logId: string;
  userId: string;
  firstName: string;
  lastName: string;
  description: string;
  date: string;
  location?: string;
}

export interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}
