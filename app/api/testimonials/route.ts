import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // If table does not exist yet or there's a connection issue, log and return empty
      console.error("Supabase select error:", error);
      return NextResponse.json({ ok: false, data: [], error: error.message });
    }

    // Map database fields to frontend structure if necessary
    const formatted = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      company: item.company,
      quote: item.quote,
      rating: item.rating,
      createdAt: new Date(item.created_at).getTime(),
    }));

    return NextResponse.json({ ok: true, data: formatted });
  } catch (error: any) {
    console.error("Testimonials GET handler error:", error);
    return NextResponse.json({ ok: false, error: error.message || "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, company, quote, rating } = body;

    if (!name || !name.trim() || !quote || !quote.trim()) {
      return NextResponse.json({ ok: false, error: "Name and Quote are required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("testimonials")
      .insert([
        {
          name: name.trim(),
          role: role?.trim() || "Customer",
          company: company?.trim() || "—",
          quote: quote.trim(),
          rating: Number(rating) || 5,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    const created = data[0];
    const formatted = {
      id: created.id,
      name: created.name,
      role: created.role,
      company: created.company,
      quote: created.quote,
      rating: created.rating,
      createdAt: new Date(created.created_at).getTime(),
    };

    return NextResponse.json({ ok: true, data: formatted });
  } catch (error: any) {
    console.error("Testimonials POST handler error:", error);
    return NextResponse.json({ ok: false, error: error.message || "Failed to submit testimonial" }, { status: 500 });
  }
}
