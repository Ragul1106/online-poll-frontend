import { useEffect, useState } from 'react';
import { fetchResults } from '../api';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function ResultsChart() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const load = async () => {
        try {
            const res = await fetchResults();
            setData(res);
        } catch (e) {
            setError('Failed to load results');
        }
    };

    useEffect(() => {
        load();
        const id = setInterval(load, 5000); // live refresh
        return () => clearInterval(id);
    }, []);

    if (error) return <div className="alert alert-danger mt-3">{error}</div>;
    if (!data) return <div className="text-center my-3">Loading results...</div>;

    const labels = data.options.map(o => o.text);
    const counts = data.options.map(o => o.count);
    const percents = data.options.map(o => o.percent);

    const barData = {
        labels,
        datasets: [
            {
                label: 'Votes',
                data: counts,
            },
        ],
    };

    const pieData = {
        labels,
        datasets: [
            {
                label: '%',
                data: percents,
            },
        ],
    };

    return (
        <div className="mt-3">
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Live Results (Bar)</h5>
                    <Bar data={barData} />
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Live Share (Pie)</h5>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
}