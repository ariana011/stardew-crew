import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function CrewEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        role: "",
        favorite_gift: "",
        skill_level: 1,
        personality: "",
    });

    useEffect(() => {
        fetchCrewmate();
    }, []);

    async function fetchCrewmate() {
        const { data } = await supabase
            .from("crewmates")
            .select("*")
            .eq("id", id)
            .single();
        if (data) setForm(data);
    }

    async function handleUpdate(e) {
        e.preventDefault();
        const { error } = await supabase.from("crewmates").update(form).eq("id", id);
        if (error) alert(error.message);
        else navigate("/");
    }

    async function handleDelete() {
        const confirmDelete = confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        const { error } = await supabase.from("crewmates").delete().eq("id", id);
        if (error) alert(error.message);
        else navigate("/");
    }

    return (
        <div className="crew-edit">
            <Link to={`/crew/${id}`}>← Back to Details</Link>

            <h2>Edit Crewmate</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    Name:
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </label>

                <label>
                    Role:
                    <input
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                </label>

                <label>
                    Favorite Gift:
                    <input
                        value={form.favorite_gift}
                        onChange={(e) => setForm({ ...form, favorite_gift: e.target.value })}
                    />
                </label>

                <label>
                    Skill Level:
                    <input
                        type="number"
                        value={form.skill_level}
                        onChange={(e) => setForm({ ...form, skill_level: e.target.value })}
                    />
                </label>

                <label>
                    Personality:
                    <input
                        value={form.personality}
                        onChange={(e) => setForm({ ...form, personality: e.target.value })}
                    />
                </label>

                <button type="submit">💾 Save Changes</button>
                <button type="button" onClick={handleDelete}>
                    🗑️ Delete
                </button>
            </form>
        </div>
    );
}


