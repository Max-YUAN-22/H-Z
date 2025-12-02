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

import FallingPetals from "../../components/common/FallingPetals";

const INITIAL_MEMORIES: Memory[] = [
  { id: 1, date: "2024-08-24", title: "相遇", description: "因为面试的一把伞", media: [] },
  { id: 2, date: "2024-08-29", title: "第一次聊天", description: "", media: [] },
  { id: 3, date: "2024-08-31", title: "LCWC蹭饭偶遇失败", description: "", media: [] },
  { id: 4, date: "2024-09-01", title: "CKLC第一次吃饭", description: "陪hh面试+遇到小猫", media: [] },
  { id: 5, date: "2024-09-07", title: "hh帮我买水果", description: "", media: [] },
  { id: 6, date: "2024-09-08", title: "时光屋第二次吃饭", description: "小插曲", media: [] },
  { id: 7, date: "2024-09-12", title: "第二次演讲队训练后的散步", description: "深度聊天+看无人机", media: [] },
  { id: 8, date: "2024-09-16", title: "图书馆见面", description: "", media: [] },
  { id: 9, date: "2024-09-17", title: "中秋节拍月亮", description: "想和你吃饭😭", media: [] },
  { id: 10, date: "2024-09-21", title: "一起看烟花", description: "", media: [] },
  { id: 11, date: "2024-09-22", title: "公主包饺子嘻嘻", description: "", media: [] },
  { id: 12, date: "2024-12-01", title: "在一起", description: "❤️", media: [] },
];

export default function TimelinePage() {
  const { emotionalIndex, increaseEmotionalIndex } = useEmotionalIndex();
  const [memories, setMemories] = useLocalStorage<Memory[]>("memories_v2", INITIAL_MEMORIES);
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
    <div className="min-h-screen bg-[#fff0f5] text-gray-800 selection:bg-rose-200 relative overflow-hidden">
       <FallingPetals />
       
       {/* Background Ambient */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/60 blur-[120px]" />
        <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] rounded-full bg-rose-100/60 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
        >
            <Link href="/" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-600 mb-6 transition-colors font-medium">
                <ArrowLeft size={16} /> Back to Space
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4 text-gray-800">
                <span className="text-rose-500">Love</span> Timeline
            </h1>
            <p className="text-gray-500 font-light tracking-widest uppercase text-sm font-sans">
                Our Journey Together / 我们的点点滴滴
            </p>
        </motion.div>

        {/* Floating Action Button for Adding Memory */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-rose-500 shadow-lg shadow-rose-200 text-white hover:bg-rose-600 transition-colors"
        >
            <Plus size={24} className={`transition-transform duration-300 ${isFormOpen ? 'rotate-45' : ''}`} />
        </motion.button>

        {/* Add Memory Form (Modal/Expandable) */}
        <motion.div 
            initial={false}
            animate={{ height: isFormOpen ? 'auto' : 0, opacity: isFormOpen ? 1 : 0 }}
            className="overflow-hidden mb-12 glass-card rounded-3xl border border-white/60"
        >
            <div className="p-8 grid gap-6">
                <h2 className="text-2xl font-serif text-rose-500">New Memory</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-500">Date</label>
                        <input 
                            type="date" 
                            value={newMemory.date}
                            onChange={e => setNewMemory({...newMemory, date: e.target.value})}
                            className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 transition-colors text-gray-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-500">Title</label>
                        <input 
                            type="text" 
                            value={newMemory.title}
                            onChange={e => setNewMemory({...newMemory, title: e.target.value})}
                            placeholder="Our special day..."
                            className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 transition-colors text-gray-800 placeholder-gray-400"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500">Story</label>
                    <textarea 
                        value={newMemory.description}
                        onChange={e => setNewMemory({...newMemory, description: e.target.value})}
                        rows={4}
                        placeholder="Write about this moment..."
                        className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 transition-colors resize-none text-gray-800 placeholder-gray-400"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500">Media</label>
                    <div className="relative">
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-2 w-full bg-white/50 border border-dashed border-rose-300 rounded-xl py-8 text-rose-400 hover:bg-white/80 transition-colors">
                            <ImageIcon size={20} />
                            <span>{mediaFiles.length > 0 ? `${mediaFiles.length} files selected` : "Click to upload photos/videos"}</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleAddMemory}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-medium tracking-wide transition-all mt-4 shadow-md hover:shadow-lg"
                >
                    Capture Moment
                </button>
            </div>
        </motion.div>

        {/* Timeline Visualization */}
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-300 to-transparent md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-24">
                {sortedMemories.map((memory, index) => (
                    <TimelineItem key={memory.id} memory={memory} index={index} />
                ))}
            </div>
            
            {sortedMemories.length === 0 && (
                <div className="text-center py-20 opacity-40 font-light text-gray-600">
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
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-2 border-rose-500 rounded-full md:-translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_rgba(244,63,94,0.3)]" />

            {/* Content Card */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
                <div className={`relative glass-card rounded-2xl p-6 hover:border-rose-300 transition-colors group ${isEven ? 'md:mr-12 text-left' : 'md:ml-12 text-left'}`}>
                    
                    <div className="flex items-center gap-3 mb-4 text-rose-500 text-sm font-mono tracking-wider font-medium">
                        <Calendar size={14} />
                        <span>{memory.date}</span>
                    </div>

                    <h3 className="text-2xl font-serif text-gray-800 mb-3 group-hover:text-rose-600 transition-colors">
                        {memory.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed font-sans mb-6">
                        {memory.description}
                    </p>

                    {memory.media.length > 0 && (
                        <div className={`grid gap-2 ${memory.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {memory.media.map((item, i) => (
                                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-rose-50">
                                    {item.type === 'image' ? (
                                        <img src={item.url} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform" />
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

