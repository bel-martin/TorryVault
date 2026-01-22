// Mock Data for the Vault

export interface VaultImage {
  id: string;
  src: string;
  prompt: string;
  date: string;
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
}

export interface VaultChat {
    id: string;
    title: string;
    messages: ChatMessage[];
    date: string;
}

export const MOCK_IMAGES: VaultImage[] = [
    {
        id: "1",
        src: "/assets/vault-lock.png",
        prompt: "Dark abstract cybersecurity concept, glowing purple digital lock",
        date: "2024-05-12"
    },
    {
        id: "2",
        src: "/assets/cat-avatar.png",
        prompt: "Cyberpunk cat avatar, neon purple outlines",
        date: "2024-05-11"
    },
    {
        id: "3",
        src: "/assets/encrypted-landscape.png",
        prompt: "Digital landscape, wireframe mountains, purple grid lines",
        date: "2024-05-10"
    },
];

export const MOCK_CHATS: VaultChat[] = [
    {
        id: "c1",
        title: "how to do a keto diet",
        date: "2024-05-12",
        messages: [
            { id: "m1", role: "user", content: "how to do a keto diet" },
            { id: "m2", role: "assistant", content: "To start a ketogenic (keto) diet, follow these steps: 1. Understand the Basics: The keto diet is a high-fat, low-carbohydrate eating plan designed to force your body into a state of ketosis..." },
            { id: "m3", role: "user", content: "hi" },
            { id: "m4", role: "assistant", content: "Hello! How can I assist you today?" }
        ]
    },
    {
        id: "c2",
        title: "whats the best way to ask a girl out",
        date: "2024-05-11",
        messages: [
            { id: "m1", role: "user", content: "whats the best way to ask a girl out" },
            { id: "m2", role: "assistant", content: "Be confident, respectful, and direct. Find a moment when she's relaxed..." }
        ]
    },
    {
        id: "c3",
        title: "hi",
        date: "2024-05-10",
        messages: [
            { id: "m1", role: "user", content: "hi" },
            { id: "m2", role: "assistant", content: "Hello! I am Torry AI. I am here to help you with your privacy focused queries." }
        ]
    }
];
