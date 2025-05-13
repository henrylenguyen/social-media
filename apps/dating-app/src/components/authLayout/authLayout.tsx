interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="grid justify-center items-center w-full h-screen grid-cols-2">
      <div className=""></div>
      <div>{children}</div>
    </div>
  );
};
export default AuthLayout;

