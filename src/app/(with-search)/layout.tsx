import Navbar from "@/components/navbar";

export default function SearchableLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar showSearch={true} />
      <main>{children}</main>
    </>
  );
}
