import { NextResponse } from "next/server";
import { EQUIVALENCE_FACTORS } from "@/src/data/carbone/equivalences";

export async function GET() {
    return NextResponse.json({ equivalences: EQUIVALENCE_FACTORS });
}
