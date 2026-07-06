import OperationalActions from './OperationalActions';

export default function AiManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <OperationalActions />
    </>
  );
}
