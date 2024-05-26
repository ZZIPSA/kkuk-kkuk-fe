import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/src/domains/UserProfile';

function UserProfile(props: User) {
  const { id, name, nickName, image } = props;
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{nickName}</AvatarFallback>
    </Avatar>
  );
}
