export interface Condition {
  isMet(): boolean;
  fix(): void;
}
