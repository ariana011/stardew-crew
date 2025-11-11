import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams, Link } from "react-router-dom";

export default function CrewDetail() {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        fetchCrewmate();
    }, []);

    async function fetchCrewmate() {
        const { data, error } = await supabase
            .from("crewmates")
            .select("*")
            .eq("id", id)
            .single();
        if (error) console.error(error);
        else setCrewmate(data);
    }

    if (!crewmate) return <p>Loading...</p>;

    return (
        <div className="crew-detail">
            <Link to="/">← Back to Crew List</Link>

            <h2>{crewmate.name}</h2>
            <p><strong>Role:</strong> {crewmate.role}</p>
            <p><strong>Favorite Gift:</strong> {crewmate.favorite_gift}</p>
            <p><strong>Skill Level:</strong> {crewmate.skill_level}</p>
            <p><strong>Personality:</strong> {crewmate.personality}</p>

            <Link to={`/crew/${crewmate.id}/edit`}>
                <button>Edit Crewmate ✏️</button>
            </Link>
        </div>
    );
}

