"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  repoUrl: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  repoUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      className="bg-white/5 rounded-xl overflow-hidden border border-white/10 group transition-all duration-300 hover:border-red-500/30"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={repoUrl} target="_blank">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-black/50 hover:bg-red-500/20 hover:text-red-500"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub Repository</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-white/70 text-sm mb-4 transition-all duration-300 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
