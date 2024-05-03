type IDialog = {
  title: string;
  description: string;
  onCancel: () => void;
  onAction: () => void;
  buttonVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonSize: "default" | "sm" | "lg" | "icon";
  label: string;
};

export type { IDialog };
