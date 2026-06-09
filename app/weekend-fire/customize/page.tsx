import type { Metadata } from 'next';
import EditableWeekendFlyer from './EditableWeekendFlyer';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <EditableWeekendFlyer />;
}
