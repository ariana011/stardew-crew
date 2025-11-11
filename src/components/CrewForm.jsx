import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CrewForm() {
    const [form, setForm] = useState({
        name: "",
        role: "",
        favorite_gift: "",
        skill_level: 1,
        personality: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const { error } = await supabase.from("crewmates").insert([form]);
        if (error) alert(error.message);
        else window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Role" onChange={e => setForm({ ...form, role: e.target.value })} />
            <input placeholder="Favorite Gift" onChange={e => setForm({ ...form, favorite_gift: e.target.value })} />
            <input type="number" min="1" max="10" onChange={e => setForm({ ...form, skill_level: e.target.value })} />
            <input placeholder="Personality" onChange={e => setForm({ ...form, personality: e.target.value })} />
            <button type="submit">Add Crewmate</button>
        </form>
    );
}
