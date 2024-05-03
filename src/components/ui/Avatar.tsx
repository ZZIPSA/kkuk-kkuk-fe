import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/src/domains/UserProfile";

function UserProfile(props: User) {
  const { id, name, nickName, profileImage } = props;
  return (
    <Avatar>
      <AvatarImage src={profileImage} />
      <AvatarFallback>{nickName}</AvatarFallback>
    </Avatar>
  );
}
