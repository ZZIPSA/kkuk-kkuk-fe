import { TeamLogo } from '@/lib/icons';

export default function TeamInfo() {
  return (
    <section className={styles.container}>
      <p>
        만든이 <TeamLogo className={styles.logo} />
      </p>
      <p>Copyright ©ㅈIPSA. All rights reserved.</p>
    </section>
  );
}

const styles = {
  container: 'px-4 text-xs text-grey-300 mb-full',
  logo: 'h-15 w-auto inline-block fill-grey-300',
};
