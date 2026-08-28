
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ICONS } from '../constants';
import { ChatMessage } from '../types';
import { marked } from 'marked';
import LoadingSpinner from './LoadingSpinner';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            setMessages([{ role: 'model', text: 'The AI assistant is currently unavailable because Gemini is not configured.' }]);
            return;
        }

        const ai = new GoogleGenAI({ apiKey });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash-lite',
            config: {
                systemInstruction: 'You are a friendly and helpful car maintenance assistant chatbot. Your responses should be concise and formatted in markdown.',
            },
        });
        setMessages([{ role: 'model', text: 'Hello! How can I help you with your car today?' }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if(isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: currentInput });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '...' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const ChatWindow = () => (
        <div className="fixed bottom-24 right-5 w-80 h-[28rem] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 z-50">
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-t-lg">
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                    {ICONS.close}
                </button>
            </header>
            <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                         <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`rounded-lg px-4 py-2 max-w-xs ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) as string }}
                            />
                        </div>
                    ))}
                    {isLoading && messages[messages.length-1].role === 'user' && (
                         <div className="flex justify-start">
                             <div className="rounded-lg px-4 py-2 max-w-xs bg-gray-200 text-gray-800">
                                <LoadingSpinner />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>
            <footer className="p-2 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                    />
                    <button type="submit" className="ml-2 p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-primary/50" disabled={isLoading}>
                       {ICONS.send}
                    </button>
                </form>
            </footer>
        </div>
    );


    return (
        <>
            {isOpen && <ChatWindow />}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-110"
              aria-label="Toggle chat"
            >
              {isOpen ? ICONS.close : ICONS.chat}
            </button>
        </>
    );
};

export default Chatbot;
