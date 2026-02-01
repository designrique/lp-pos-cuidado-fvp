import React, { useState, useEffect } from 'react';
import './InfinityPayAppointments.scss';

// Interface for Transaction Data
interface Transaction {
    id: string;
    date: string;
    clientName: string;
    serviceName: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
}

const InfinityPayAppointments: React.FC = () => {
    // State for transactions
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);

    // Effect to fetch data from CMS Collection
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                // Fetch confirmed/paid appointments
                const res = await fetch('/api/appointments?limit=50&sort=-date');
                if (!res.ok) throw new Error('Failed to fetch appointments');

                const data = await res.json();

                if (data.docs) {
                    const mapped = data.docs.map((doc: any) => ({
                        id: doc.id,
                        date: doc.date,
                        clientName: doc.clientName,
                        serviceName: doc.serviceName,
                        amount: doc.amount,
                        status: doc.status
                    }));
                    setTransactions(mapped);
                }
            } catch (error) {
                console.error("Error loading appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="infinity-pay-appointments">
            <h2 className="dashboard-title">Agendamentos Confirmados (Infinity Pay)</h2>

            <div className="appointments-container">
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Cliente</th>
                            <th>Serviço</th>
                            <th>Valor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="loading-cell">Carregando...</td>
                            </tr>
                        ) : transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                                    <td>{tx.clientName}</td>
                                    <td>{tx.serviceName}</td>
                                    <td>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${tx.status}`}>
                                            {tx.status === 'paid' ? 'Pago' : tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="empty-cell">
                                    <div className="empty-state">
                                        <p>Nenhum agendamento confirmado via Infinity Pay.</p>
                                        <small>Os registros aparecerão aqui quando houver transações reais.</small>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfinityPayAppointments;
