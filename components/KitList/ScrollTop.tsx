import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

export default function ScrollTop() {
  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      id="scroll-to-top"
      variant="outline"
      className="rounded-full col-span-full mt-2 flex justify-center items-center"
    >
      <ArrowUp size={24} />
    </Button>
  );
}
