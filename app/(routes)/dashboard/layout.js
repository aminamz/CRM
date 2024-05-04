import NavigationBar from "@/components/navigationbar/NavigationBar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex flex-col h-svh relative">
      {children}
      <NavigationBar />
    </section>
  );
}
