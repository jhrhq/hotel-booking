import Navbar from "@/components/navbar";

export default function StandardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar showSearch={false} />
      <main>{children}</main>
    </>
  );
}
