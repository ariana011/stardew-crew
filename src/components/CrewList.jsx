import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function CrewList() {
    const [crew, setCrew] = useState([]);

    useEffect(() => {
        fetchCrew();
    }, []);

    async function fetchCrew() {
        const { data, error } = await supabase
            .from("crewmates")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) console.error(error);
        else setCrew(data);
    }

    return (
        <div className="crew-list">
            <h2>Crewmates 🧑‍🌾</h2>


            <ul>
                {crew.length > 0 ? (
                    crew.map((c) => (
                        <li key={c.id}>
                            <Link to={`/crew/${c.id}`}>{c.name}</Link> — {c.role}
                        </li>
                    ))
                ) : (
                    <p>No crewmates yet! Add your first one 🌻</p>
                )}
            </ul>
        </div>
    );
}

