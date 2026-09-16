import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { messageFor } from "../services/api";
import Layout from "../components/Layout";
export default function MedicineList() {
    const [items, setItems] = useState([]),
        [search, setSearch] = useState(""),
        [loading, setLoading] = useState(true),
        [error, setError] = useState("");
    const load = async (q) => {
        setLoading(true);
        setError("");
        try {
            setItems(
                (
                    await api.get("/medicines", {
                        params: q ? { search: q } : {},
                    })
                ).data.data,
            );
        } catch (e) {
            setError(messageFor(e));
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load();
    }, []);
    return (
        <Layout>
            <section className="title">
                <div>
                    <p className="eyebrow">INVENTORY</p>
                    <h1>Medicine Inventory</h1>
                    <p className="muted">
                        Search, review, and maintain your pharmacy catalogue.
                    </p>
                </div>
                <Link className="button" to="/medicines/new">
                    + Add Medicine
                </Link>
            </section>
            <form
                className="search"
                onSubmit={(e) => {
                    e.preventDefault();
                    load(search);
                }}
            >
                <input
                    aria-label="Search medicines"
                    placeholder="Search brand or category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button>Search</button>
                {search && (
                    <button
                        type="button"
                        className="ghost"
                        onClick={() => {
                            setSearch("");
                            load();
                        }}
                    >
                        Clear
                    </button>
                )}
            </form>
            {error && <p className="notice error">{error}</p>}
            {loading ? (
                <p className="loading">Loading medicines…</p>
            ) : items.length === 0 ? (
                <div className="empty">No medicines found.</div>
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Brand Name</th>
                                <th>Category</th>
                                <th>Dosage / Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.brand_name}</td>
                                    <td>{m.category}</td>
                                    <td>{Number(m.dosage_quantity)}</td>
                                    <td>
                                        <Link
                                            className="text-link"
                                            to={`/medicines/${m.id}`}
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Layout>
    );
}
