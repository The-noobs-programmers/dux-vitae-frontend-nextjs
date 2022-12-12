type CanSeeProps = {
  roles: "admin" | "client" | "nutritionist";
  role: string;
  children: React.ReactNode;
};

export default function CanSee({ children, roles, role }: CanSeeProps) {
  if (roles.includes(role)) {
    return <>{children}</>;
  }

  return null;
}
