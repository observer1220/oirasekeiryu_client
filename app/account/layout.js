import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid h-full gap-12 grid-cols-1 md:grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
