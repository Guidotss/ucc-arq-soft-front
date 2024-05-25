import { AuthProvider, CoursesProvider } from "@/context";

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <CoursesProvider>
        {children}
      </CoursesProvider>
    </AuthProvider>
  );
};
