export default async function MyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
