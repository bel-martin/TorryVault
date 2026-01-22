import { useState, useEffect } from "react";
import { VaultLayout } from "@/components/layout";
import { Lock, Unlock, Image as ImageIcon, MessageSquare, Plus, ShieldCheck, Check, Search, Menu, Send, FolderPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MOCK_IMAGES, MOCK_CHATS, VaultChat } from "@/data/mock-data";
import { cn } from "@/lib/utils";

// --- Components ---

const VaultLocked = ({ onUnlock }: { onUnlock: () => void }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock password check - accept anything for prototype
        if (password.length > 0) {
            onUnlock();
        } else {
            setError(true);
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-black">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
             >
                <Card className="bg-[#121212] border-border/50 p-8 shadow-2xl shadow-purple-900/10">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 ring-1 ring-primary/30">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Unlock Vault</h2>
                            <p className="text-muted-foreground text-sm">Enter your private key or password to view encrypted content</p>
                        </div>

                        <form onSubmit={handleUnlock} className="w-full space-y-4">
                            <div className="space-y-2">
                                <Input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="bg-black/50 border-border focus:border-primary/50 text-center h-12 text-lg tracking-widest"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(false);
                                    }}
                                />
                                {error && <p className="text-red-500 text-xs">Password required</p>}
                            </div>
                            <Button type="submit" className="w-full h-12 text-base font-medium shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]">
                                Unlock Access
                            </Button>
                        </form>

                        <div className="text-xs text-muted-foreground/50 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" />
                            Private Access • End-to-End Encrypted
                        </div>
                    </div>
                </Card>
             </motion.div>
        </div>
    );
};

const VaultGallery = () => {
    return (
        <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {MOCK_IMAGES.length > 0 ? (
                    MOCK_IMAGES.map((img) => (
                        <motion.div 
                            key={img.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer border border-border/50 hover:border-primary/50 transition-colors"
                        >
                            <img src={img.src} alt="Vault item" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <p className="text-xs text-white/90 line-clamp-2">{img.prompt}</p>
                                <p className="text-[10px] text-white/50 mt-1">{img.date}</p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <Lock className="w-12 h-12 mb-4 opacity-20" />
                        <p>No encrypted images found</p>
                    </div>
                )}
                 {/* Placeholder for "New" */}
                 <div className="aspect-square rounded-xl border-2 border-dashed border-muted hover:border-primary/50 flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer bg-black/20">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">Add Image</span>
                </div>

                 {/* Placeholder for "New Folder" */}
                 <div className="aspect-square rounded-xl border-2 border-dashed border-muted hover:border-primary/50 flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer bg-black/20 opacity-50 hover:opacity-100">
                    <FolderPlus className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">New Folder</span>
                    <span className="text-[9px] mt-1">(Coming Soon)</span>
                </div>
            </div>
        </div>
    );
};

const VaultChats = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const selectedChat = MOCK_CHATS.find(c => c.id === selectedChatId) || MOCK_CHATS[0];

    return (
        <div className="flex h-[calc(100vh-140px)] md:h-[calc(100vh-140px)] overflow-hidden border-t border-border/50">
            {/* Chat List */}
            <div className={cn(
                "w-full md:w-80 border-r border-border/50 flex flex-col bg-black/20",
                selectedChatId ? "hidden md:flex" : "flex"
            )}>
                <div className="p-4 border-b border-border/50">
                     <h3 className="font-semibold text-lg mb-4 pl-1">Chats</h3>
                     <div className="space-y-2">
                        {MOCK_CHATS.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChatId(chat.id)}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-lg text-sm transition-all border border-transparent",
                                    selectedChat?.id === chat.id 
                                        ? "bg-primary/10 text-primary border-primary/20 shadow-sm" 
                                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <div className="font-medium truncate">{chat.title}</div>
                                <div className="text-[10px] opacity-60 mt-1">{chat.date}</div>
                            </button>
                        ))}
                     </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className={cn(
                "flex-1 flex flex-col bg-background/50",
                !selectedChatId && "hidden md:flex"
            )}>
                {/* Header */}
                <div className="h-14 border-b border-border/50 flex items-center px-6 justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        {selectedChatId && (
                            <Button variant="ghost" size="icon" className="md:hidden mr-2 -ml-2" onClick={() => setSelectedChatId(null)}>
                                <Menu className="w-4 h-4" />
                            </Button>
                        )}
                        <span className="font-mono text-sm text-muted-foreground">Active Chat:</span>
                        <span className="font-medium text-sm truncate max-w-[200px] md:max-w-md">{selectedChat.title}</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {selectedChat.messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm",
                                msg.role === "user" 
                                    ? "bg-[#1a1a1a] text-white border border-white/5 rounded-tr-sm" 
                                    : "bg-[#0a0a0a] text-gray-300 border border-white/5 rounded-tl-sm"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/50 bg-black/20 shrink-0">
                    <div className="relative max-w-4xl mx-auto">
                        <Input 
                            placeholder="Type a message..." 
                            className="bg-[#121212] border-white/10 pr-12 h-12 rounded-full focus:ring-1 focus:ring-primary/50" 
                        />
                        <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-10 w-10 rounded-full hover:bg-primary/20 hover:text-primary">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Page ---

export default function VaultPage() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [activeTab, setActiveTab] = useState<"images" | "chats">("images");

    return (
        <VaultLayout>
            <div className="flex flex-col h-screen bg-black text-foreground">
                
                {/* Header Bar */}
                <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-black/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold tracking-tight flex items-center gap-2">
                            <span className="text-primary">Tor</span> Vault
                        </span>
                        {isUnlocked && (
                             <div className="h-5 w-[1px] bg-border mx-2" />
                        )}
                    </div>

                    <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                        <span className="hover:text-primary cursor-pointer transition-colors">[features]</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">[docs]</span>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {!isUnlocked ? (
                            <motion.div 
                                key="locked"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20"
                            >
                                <VaultLocked onUnlock={() => setIsUnlocked(true)} />
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="unlocked"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col"
                            >
                                <div className="flex justify-center py-6">
                                    <div className="bg-[#121212] p-1 rounded-lg border border-white/5 inline-flex shadow-lg shadow-black/50">
                                        <button 
                                            onClick={() => setActiveTab("images")}
                                            className={cn(
                                                "flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                                activeTab === "images" ? "bg-[#222] text-white shadow-sm" : "text-muted-foreground hover:text-white"
                                            )}
                                        >
                                            <ImageIcon className="w-4 h-4" />
                                            Images
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab("chats")}
                                            className={cn(
                                                "flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                                activeTab === "chats" ? "bg-[#222] text-white shadow-sm" : "text-muted-foreground hover:text-white"
                                            )}
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Chats
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto bg-black/20">
                                    <AnimatePresence mode="wait">
                                        {activeTab === "images" ? (
                                            <motion.div 
                                                key="images"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <VaultGallery />
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="chats"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <VaultChats />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </VaultLayout>
    );
}
