import type { Metadata } from "next";
import DostClient from "./DostClient";

export const metadata: Metadata = {
  title: "Mentora Dost",
  description: "Mentora Dost iframe login wrapper",
};

export default function DostPage() {
  return <DostClient />;
}