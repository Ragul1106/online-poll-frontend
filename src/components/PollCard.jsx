import { useEffect, useState } from 'react';
import { fetchPoll, submitVote } from '../api';

export default function PollCard({ onVoted }) {
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        let mounted = true;
        fetchPoll()
            .then((data) => { if (mounted) { setPoll(data); } })
            .catch(() => setAlert({ type: 'danger', msg: 'Failed to load poll.' }))
            .finally(() => setLoading(false));
        return () => { mounted = false; };
    }, []);

    const handleVote = async (option_id) => {
        const result = await submitVote(option_id);
        if (result.ok) {
            setAlert({ type: 'success', msg: result.data?.message || 'Vote recorded' });
            onVoted?.();
        } else if (result.status === 409) {
            setAlert({ type: 'warning', msg: result.data?.message || 'You have already voted.' });
        } else {
            setAlert({ type: 'danger', msg: result.data?.message || 'Vote failed.' });
        }
        setTimeout(() => setAlert(null), 3000);
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (!poll) return <div className="alert alert-warning">No poll found.</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{poll.question}</h5>
                {alert && <div className={`alert alert-${alert.type} mt-2`}>{alert.msg}</div>}
                <div className="list-group mt-3">
                    {poll.options.map(o => (
                        <button key={o.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onClick={() => handleVote(o.id)}>
                            <span>{o.text}</span>
                            <span className="badge bg-primary rounded-pill">Vote</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}