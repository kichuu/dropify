import { Dashboard } from '@/components/Dashboard';

export default function HomePage() {
  const estimatedReliefTime = '25 minutes';
  const currentLocation = '📍 Downtown Seattle, 5th Avenue';
  const carbonSaved = '45.2kg';

  return (
    <Dashboard
      estimatedReliefTime={estimatedReliefTime}
      currentLocation={currentLocation}
      carbonSaved={carbonSaved}
    />
  );
}