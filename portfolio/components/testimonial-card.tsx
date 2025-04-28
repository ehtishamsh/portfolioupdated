"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  position: string;
  image: string;
  quote: string;
}

export default function TestimonialCard({
  name,
  position,
  image,
  quote,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 p-6 rounded-xl border border-white/10 relative"
    >
      <Quote className="absolute top-6 right-6 h-8 w-8 text-red-500/20" />
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border border-white/20">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-xs text-white/60">{position}</p>
        </div>
      </div>
      <p className="text-white/70 text-sm italic">
        {`"`}
        {quote}
        {`"`}
      </p>
    </motion.div>
  );
}
