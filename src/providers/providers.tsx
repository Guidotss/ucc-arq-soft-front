import { AuthProvider, CoursesProvider, UiProvider, AdminProvider } from "@/context";

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <AdminProvider>
        <CoursesProvider>
          <UiProvider>{children}</UiProvider>
        </CoursesProvider>
      </AdminProvider>
    </AuthProvider>
  );
};
