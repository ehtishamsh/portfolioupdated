"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface ExperienceCardProps {
  company: string
  position: string
  period: string
  description: string
  technologies: string[]
}

export default function ExperienceCard({ company, position, period, description, technologies }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-red-500/30"
    >
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-red-500 -translate-x-[7px]"></div>
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">{company}</h3>
            <p className="text-white/70">{position}</p>
          </div>
          <Badge className="bg-red-500 mt-2 md:mt-0 w-fit">{period}</Badge>
        </div>
        <p className="text-white/70 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
