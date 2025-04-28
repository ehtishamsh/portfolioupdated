"use client"

import { motion } from "framer-motion"
import { Layers, Palette, Database, Smartphone } from "lucide-react"

interface SkillCardProps {
  icon: "web" | "design" | "database" | "mobile"
  title: string
  description: string
  skills: string[]
}

export default function SkillCard({ icon, title, description, skills }: SkillCardProps) {
  const icons = {
    web: <Layers className="h-6 w-6 text-red-500" />,
    design: <Palette className="h-6 w-6 text-red-500" />,
    database: <Database className="h-6 w-6 text-red-500" />,
    mobile: <Smartphone className="h-6 w-6 text-red-500" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.1)" }}
      className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        {icons[icon]}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-white/70 text-sm mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/10"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
