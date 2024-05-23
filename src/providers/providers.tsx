import { AuthProvider } from "@/context";

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
