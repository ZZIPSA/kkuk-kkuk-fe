import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IDialog } from "@/src/domains/Dialog";

function Dialog(props: IDialog) {
  const {
    title,
    description,
    buttonVariant = "default",
    buttonSize,
    onAction,
    onCancel,
    label,
  } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize}>
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Dialog;
