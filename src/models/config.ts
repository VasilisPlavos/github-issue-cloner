export interface Configuration {
  fromRepo: string;
  toRepo: string;
  githubToken?: string;
  deleteAfterClone?: boolean;
}
