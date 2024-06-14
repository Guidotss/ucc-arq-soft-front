import { AuthProvider, CoursesProvider, UiProvider } from "@/context";

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <CoursesProvider>
        <UiProvider>{children}</UiProvider>
      </CoursesProvider>
    </AuthProvider>
  );
};
