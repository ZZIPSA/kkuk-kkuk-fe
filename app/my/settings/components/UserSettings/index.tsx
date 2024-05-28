export function UserSettings() {
  return (
    <section className="pt-6 pb-[50vh] flex flex-col w-full h-full bg-grey-50 divide-y">
      {items.map((item, index) => (
        <button key={index} className="p-4 bg-background w-full text-left">
          {item.label}
        </button>
      ))}
    </section>
  );
}

const items = [
  {
    label: '로그아웃',
  },
  {
    label: '회원탈퇴',
  },
];
