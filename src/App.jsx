import PollCard from './components/PollCard';
import ResultsChart from './components/ResultsChart';

export default function App() {
  return (
    <div className="container container-narrow py-4">
      <h1 className="mb-3">Online Poll</h1>
      <p className="text-muted">Click an option to vote. Double votes will show a flash-like warning.</p>
      <PollCard onVoted={() => {}} />
      <ResultsChart />
      <div className="mt-4">
        <small className="text-secondary">Backend provides a Jinja2 SSR page at <code>/ssr</code> (on Render) to satisfy the requirement.</small>
      </div>
    </div>
  );
}