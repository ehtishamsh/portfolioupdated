"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        transition: { duration: 0.2 },
      }}
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-400/10 text-violet-400 border border-violet-400/20"
    >
      {name}
    </motion.span>
  )
}
