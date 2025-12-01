"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { Plus, Calendar, Image as ImageIcon, Video, MapPin, ArrowLeft } from "lucide-react";

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  media: { type: "image" | "video"; url: string }[];
}

export default function TimelinePage() {
  const { emotionalIndex, increaseEmotionalIndex } = useEmotionalIndex();
  const [memories, setMemories] = useLocalStorage<Memory[]>("memories", []);
  const [newMemory, setNewMemory] = useState<Omit<Memory, "id" | "media">>({
    date: "",
    title: "",
    description: "",
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Sorting memories
  const sortedMemories = [...memories].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddMemory = () => {
    if (!newMemory.date || !newMemory.title || !newMemory.description) {
      alert("Please fill in all fields / 请填写所有信息");
      return;
    }

    const newId = memories.length > 0 ? Math.max(...memories.map(m => m.id)) + 1 : 1;
    const mediaPlaceholders = mediaFiles.map(file => ({
      type: (file.type.startsWith("image") ? "image" : "video") as "image" | "video",
      url: URL.createObjectURL(file)
    }));

    setMemories([
      ...memories,
      { ...newMemory, id: newId, media: mediaPlaceholders },
    ]);
    setNewMemory({ date: "", title: "", description: "" });
    setMediaFiles([]);
    setIsFormOpen(false);
    increaseEmotionalIndex(5);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-rose-500/30">
      {/* Background Ambient */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] rounded-full bg-rose-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
        >
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={16} /> Back to Space
            </Link>
            <h1 className="text-4xl md:text-6xl font-thin tracking-tight mb-4">
                <span className="text-rose-400">Love</span> Timeline
            </h1>
            <p className="text-white/40 font-light tracking-widest uppercase text-sm">
                Our Journey Together / 我们的点点滴滴
            </p>
        </motion.div>

        {/* Floating Action Button for Adding Memory */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-rose-500 shadow-lg shadow-rose-500/30 text-white hover:bg-rose-600 transition-colors"
        >
            <Plus size={24} className={`transition-transform duration-300 ${isFormOpen ? 'rotate-45' : ''}`} />
        </motion.button>

        {/* Add Memory Form (Modal/Expandable) */}
        <motion.div 
            initial={false}
            animate={{ height: isFormOpen ? 'auto' : 0, opacity: isFormOpen ? 1 : 0 }}
            className="overflow-hidden mb-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
        >
            <div className="p-8 grid gap-6">
                <h2 className="text-2xl font-light text-rose-200">New Memory</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-white/40">Date</label>
                        <input 
                            type="date" 
                            value={newMemory.date}
                            onChange={e => setNewMemory({...newMemory, date: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-white/40">Title</label>
                        <input 
                            type="text" 
                            value={newMemory.title}
                            onChange={e => setNewMemory({...newMemory, title: e.target.value})}
                            placeholder="Our special day..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500/50 transition-colors"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-white/40">Story</label>
                    <textarea 
                        value={newMemory.description}
                        onChange={e => setNewMemory({...newMemory, description: e.target.value})}
                        rows={4}
                        placeholder="Write about this moment..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500/50 transition-colors resize-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-white/40">Media</label>
                    <div className="relative">
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-2 w-full bg-black/20 border border-dashed border-white/20 rounded-xl py-8 text-white/40 hover:bg-white/5 transition-colors">
                            <ImageIcon size={20} />
                            <span>{mediaFiles.length > 0 ? `${mediaFiles.length} files selected` : "Click to upload photos/videos"}</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleAddMemory}
                    className="w-full bg-rose-500/80 hover:bg-rose-500 text-white py-4 rounded-xl font-medium tracking-wide transition-all mt-4"
                >
                    Capture Moment
                </button>
            </div>
        </motion.div>

        {/* Timeline Visualization */}
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-500/50 to-transparent md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-24">
                {sortedMemories.map((memory, index) => (
                    <TimelineItem key={memory.id} memory={memory} index={index} />
                ))}
            </div>
            
            {sortedMemories.length === 0 && (
                <div className="text-center py-20 opacity-30 font-light">
                    <p>Time stands still... until you add a memory.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ memory, index }: { memory: Memory, index: number }) {
    const isEven = index % 2 === 0;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex flex-col md:flex-row gap-8 items-center md:items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Date Bubble */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-black border-2 border-rose-500 rounded-full md:-translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />

            {/* Content Card */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
                <div className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-rose-500/30 transition-colors group ${isEven ? 'md:mr-12 text-left' : 'md:ml-12 text-left'}`}>
                    
                    <div className="flex items-center gap-3 mb-4 text-rose-300/80 text-sm font-mono tracking-wider">
                        <Calendar size={14} />
                        <span>{memory.date}</span>
                    </div>

                    <h3 className="text-2xl font-light text-white mb-3 group-hover:text-rose-200 transition-colors">
                        {memory.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed font-light mb-6">
                        {memory.description}
                    </p>

                    {memory.media.length > 0 && (
                        <div className={`grid gap-2 ${memory.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {memory.media.map((item, i) => (
                                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-black/50">
                                    {item.type === 'image' ? (
                                        <img src={item.url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 hover:scale-110 transform" />
                                    ) : (
                                        <video src={item.url} controls className="w-full h-full object-cover" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Spacer for the other side */}
            <div className="hidden md:block md:w-1/2" />
        </motion.div>
    );
}

